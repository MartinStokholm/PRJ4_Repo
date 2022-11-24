using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;
using System.Collections;
using WebAPI.Dto.Exercise;
using WebAPI.Dto.Workout;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WorkoutController : ControllerBase
    {
        private readonly DataContext _context;
        public WorkoutController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("{workoutId}/AddExercise/list")]
        public async Task<ActionResult<List<WorkoutWithExerciseFullDto>>> AddExercisesToWorkout(long workoutId, List<long> exerciseIds)
        {
            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null) { return NotFound($"Could not find workout with id {workoutId}"); }
            var dbExercises = _context.Exercises.ToList().FindAll(e => exerciseIds.Contains(e.Id));
            if (dbExercises.Count != exerciseIds.Count) { return NotFound($"Could not find all exercises"); }

            _context.Entry(dbWorkout)
               .Collection(w => w.Exercises)
               .Load();

            foreach (var exercise in dbExercises)
            {
                if (dbWorkout.Exercises.Contains(exercise)) { return Conflict("Exercise already exists in workout"); }

                dbWorkout.Exercises.Add(exercise);
            }

            await _context.SaveChangesAsync();
            return Accepted(dbWorkout.Adapt<WorkoutWithExerciseFullDto>());

        }
        [HttpPost("{workoutId}/RemoveExercise/list")]
        public async Task<ActionResult<List<WorkoutWithExerciseFullDto>>> RemoveExercisesFromWorkout(long workoutId, List<long> exerciseIds)
        {
            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null) { return NotFound($"Could not find workout with id {workoutId}"); }
            var dbExercises = _context.Exercises.ToList().FindAll(e => exerciseIds.Contains(e.Id));
            if (dbExercises.Count != exerciseIds.Count) { return NotFound($"Could not find all exercises"); }

            _context.Entry(dbWorkout)
               .Collection(w => w.Exercises)
               .Load();

            foreach (var exercise in dbExercises)
            {
                if (!dbWorkout.Exercises.Contains(exercise)) { return Conflict("Exercise does not exist in workout"); }

                dbWorkout.Exercises.Remove(exercise);
            }

            await _context.SaveChangesAsync();
            return Accepted(dbWorkout.Adapt<WorkoutWithExerciseFullDto>());

        }

        [HttpPost("list/WithExercisesIds")]
        public async Task<ActionResult<List<WorkoutWithExerciseFullDto>>> PostWorkoutsWithExercisesIds(List<WorkoutCreateWithExercisesIdsDto> newWorkouts)
        {
            var workoutsToAdd = newWorkouts.Adapt<List<Workout>>();

            foreach (var workout in newWorkouts)
            {
                foreach (var exercise in workout.ExercisesIds)
                {
                    var dbExercise = await _context.Exercises.FindAsync(exercise);
                    if (dbExercise == null) { return NotFound($"Could not find exercise with id {exercise}"); }
                    workoutsToAdd.Find(w => w.Name == workout.Name).Exercises.Add(dbExercise);
                }

            }

            await _context.Workouts.AddRangeAsync(workoutsToAdd);
            await _context.SaveChangesAsync();
            return Ok(workoutsToAdd.Adapt<List<WorkoutWithExerciseFullDto>>());
        }

        [HttpPost("list")]
        public async Task<ActionResult<List<WorkoutWithExerciseFullDto>>> PostWorkouts(List<WorkoutCreateNoIdDto> newWorkouts)
        {
            var workoutsToAdd = newWorkouts.Adapt<List<Workout>>();
            await _context.Workouts.AddRangeAsync(workoutsToAdd);
            await _context.SaveChangesAsync();
            return workoutsToAdd.Adapt<List<WorkoutWithExerciseFullDto>>();
        }

        [HttpPost("{email}")]
        public async Task<ActionResult<WorkoutCreateNoIdDto>> PostWorkout(WorkoutCreateNoIdDto workoutCreate, string email)
        {
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == email);

            if (dbAccount == null) { return NotFound($"Account with email {email} was not found"); }

            var newWorkout = workoutCreate.Adapt<Workout>();
            newWorkout.AccountId = dbAccount.Id;
            _context.Workouts.Add(newWorkout);
            _context.SaveChanges();

            return Accepted(newWorkout.Adapt<WorkoutCreateNoIdDto>());
        }

        [HttpPut("{workoutId}/AddExercise/{exerciseId}")]
        public async Task<ActionResult<WorkoutWithExerciseFullDto>> AddExerciseToWorkout(long workoutId, long exerciseId)
        {
            var dbExercise = await _context.Exercises.FindAsync(exerciseId);
            if (dbExercise == null) { return NotFound("Could not find exercise"); }

            var dbWorkout = await _context.Workouts.Include(w => w.Exercises).FirstOrDefaultAsync(w => w.Id == workoutId);
            if (dbWorkout == null) { return NotFound("Could not find workout"); }

            if (dbWorkout.Exercises.Contains(dbExercise)) { return Conflict("Exercise already exists in workout"); }

            dbWorkout.Exercises.Add(dbExercise);
            await _context.SaveChangesAsync();

            return Accepted(dbWorkout.Adapt<WorkoutWithExerciseFullDto>());
        }

        [HttpPut("{workoutId}/RemoveExercise/{exerciseId}")]
        public async Task<ActionResult<WorkoutWithExerciseFullDto>> RemoveExerciseFromWorkout(long workoutId, long exerciseId)
        {
            var dbExercise = await _context.Exercises.FindAsync(exerciseId);
            if (dbExercise == null) { return NotFound("Could not find exercise"); }

            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null) { return NotFound("Could not find workout"); }

            _context.Entry(dbWorkout)
                .Collection(w => w.Exercises)
                .Load();

            if (!dbWorkout.Exercises.Contains(dbExercise)) { return Conflict("Exercise does not exist in workout"); }


            dbWorkout.Exercises.Remove(dbExercise);
            await _context.SaveChangesAsync();

            return Accepted(dbWorkout.Adapt<WorkoutWithExerciseFullDto>());
        }

        [HttpPut("{workoutId}/AddToCalender/{day}/Account/{email}")]
        public async Task<ActionResult<Calender>> AddWorkoutToCalender(long workoutId, string day, string email)
        {
            var dbAccount = await _context.Accounts.Include(x => x.Calender).FirstOrDefaultAsync(a => a.Email == email);
            if (dbAccount == null) { return NotFound($"Could not find account with email {email}"); }

            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null) { return NotFound($"Could not find workout with id {workoutId}"); }

            dbAccount.Calender.WorkoutDays.Add(new WorkoutOnDay { WorkoutId = workoutId, Day = day });

            await _context.SaveChangesAsync();
            return Accepted(dbAccount.Calender);
        }
        
        [HttpPut("{workoutId}/account/{email}")]
        public async Task<ActionResult<WorkoutWithExerciseFullDto>> AddWorkoutToAccount(string email, long workoutId)
        {
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.Email == email);

            if (dbAccount == null) { return NotFound($"Account with email {email} was not found"); }

            var dbWorkout = await _context.Workouts.FirstOrDefaultAsync(w => w.Id == workoutId);

            if (dbWorkout == null) { return NotFound($"Workout with id {workoutId} was not found"); }

            dbAccount.Workouts.Add(dbWorkout);

            await _context.SaveChangesAsync();

            return Ok(dbWorkout.Adapt<WorkoutWithExerciseFullDto>());
        }

        [HttpPut("{workoutId}/account/{email}")]
        public async Task<ActionResult<WorkoutWithExerciseFullDto>> AddWorkoutToAccount(string email, long workoutId)
        {
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.Email == email);

            if (dbAccount == null) { return NotFound($"Account with email {email} was not found"); }

            var dbWorkout = await _context.Workouts.FirstOrDefaultAsync(w => w.Id == workoutId);

            if (dbWorkout == null) { return NotFound($"Workout with id {workoutId} was not found"); }

            dbAccount.Workouts.Add(dbWorkout);

            await _context.SaveChangesAsync();

            return Ok(dbWorkout.Adapt<WorkoutWithExerciseFullDto>());
        }

        [HttpGet("WithExerciseFull")]
        public async Task<ActionResult<List<WorkoutWithExerciseFullDto>>> GetWorkoutsWithExercisesFull()
        {
            var dbWorkouts = await _context.Workouts.Include(w => w.Exercises).ToListAsync();

            if (dbWorkouts == null) { return NotFound("No Workout found"); }

            return Ok(dbWorkouts.Adapt<List<WorkoutWithExerciseFullDto>>());
        }

        [HttpGet("noId")]
        public async Task<ActionResult<List<WorkoutCreateWithExercisesIdsDto>>> GetWorkoutsWithExercisesId()
        {
            var dbWorkouts = await _context.Workouts.Include(w => w.Exercises).ToListAsync();


            if (dbWorkouts == null) { return NotFound("No Workout found"); }

            var workouts = dbWorkouts.Adapt<List<WorkoutCreateWithExercisesIdsDto>>();

            foreach (var workout in dbWorkouts)
            {
                workouts.Find(w => w.Name == workout.Name).ExercisesIds = workout.Exercises.Select(e => e.Id).ToList();
            }

            return Ok(workouts);
        }

        [HttpGet]
        public async Task<ActionResult<List<WorkoutWithIdsWithExercisesIdsDto>>> GetWorkoutsWithIdExercisesId()
        {
            var dbWorkouts = await _context.Workouts.Include(w => w.Exercises).ToListAsync();

            var workouts = dbWorkouts.Adapt<List<WorkoutWithIdsWithExercisesIdsDto>>();

            foreach (var workout in dbWorkouts)
            {
                workouts.Find(w => w.Name == workout.Name).ExercisesIds = workout.Exercises.Select(e => e.Id).ToList();
            }


            return Ok(workouts);
        }


        [HttpGet("{workoutId}")]
        public async Task<ActionResult<WorkoutCreateWithExercisesIdsDto>> GetWorkoutById(long workoutId)
        {
            var dbWorkout = await _context.Workouts.Include(w => w.Exercises).FirstOrDefaultAsync(w => w.Id == workoutId);
            if (dbWorkout == null)
            {
                return NotFound($"Workout with id {workoutId} was not found");
            }

            var workout = dbWorkout.Adapt<WorkoutCreateWithExercisesIdsDto>();

            workout.ExercisesIds = dbWorkout.Exercises.Select(e => e.Id).ToList();

            return Ok(workout);
        }



        [HttpGet("account/{email}")]
        public async Task<ActionResult<List<WorkoutWithExerciseFullDto>>> GetWorkoutsByAccountEmail(string email)
        {
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == email);

            if (dbAccount == null) { return NotFound($"Account with email {email} was not found"); }

            var dbWorkout = await _context.Workouts.Where(w => w.AccountId == dbAccount.Id).Include(x => x.Exercises).ToListAsync();


            return Ok(dbWorkout.Adapt<List<WorkoutWithExerciseFullDto>>());
        }

        [HttpDelete("{workoutId}")]
        public async Task<ActionResult<WorkoutCreateNoIdDto>> DeleteWorkout(long workoutId)
        {
            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null) { return NotFound($"Workout with id {workoutId} was not found"); }

            _context.Workouts.Remove(dbWorkout);
            await _context.SaveChangesAsync();

            return Ok(dbWorkout.Adapt<WorkoutCreateNoIdDto>());
        }
    }
}

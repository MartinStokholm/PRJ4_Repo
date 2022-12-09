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

        /// <summary>
        /// When a user is logged in they can create a workout which gets added to their list of workouts
        /// </summary>
        /// <param name="workoutCreate"></param>
        /// <param name="email"></param>
        /// <returns></returns>
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

        /// <summary>
        /// When a user is logged in they can add an exercise to their workout given the workout id and exercise id
        /// </summary>
        /// <param name="workoutId"></param>
        /// <param name="exerciseId"></param>
        /// <returns></returns>
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
        
        /// <summary>
        /// When a user is logged in they can remove an exercise from their workout given the workout id and exercise id
        /// </summary>
        /// <param name="workoutId"></param>
        /// <param name="exerciseId"></param>
        /// <returns></returns>
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

        /// <summary>
        /// When a user is logged in they can add a workout to their calendar given the workout id, day and their email
        /// </summary>
        /// <param name="workoutId"></param>
        /// <param name="day"></param>
        /// <param name="email"></param>
        /// <returns></returns>
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

        /// <summary>
        /// When logged in a user can get a list of their workouts with all exercises related
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpGet("Account/{email}")]
        public async Task<ActionResult<List<WorkoutWithExerciseFullDto>>> GetWorkoutsByAccountEmail(string email)
        {
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == email);

            if (dbAccount == null) { return NotFound($"Account with email {email} was not found"); }

            var dbWorkouts = await _context.Workouts.Include(x => x.Exercises).Where(w => w.AccountId == dbAccount.Id).ToListAsync();

            var workouts = dbWorkouts.Adapt<List<WorkoutWithIdsWithExercisesIdsDto>>();

            foreach (var workout in dbWorkouts)
            {
                workouts.Find(w => w.Name == workout.Name).ExercisesIds = workout.Exercises.Select(e => e.Id).ToList();

            }

            return Ok(workouts);
        }
        /// <summary>
        /// Delete a workout
        /// </summary>
        /// <param name="workoutId"></param>
        /// <returns></returns>
        [HttpDelete("{workoutId}")]
        public async Task<ActionResult<WorkoutCreateNoIdDto>> DeleteWorkout(long workoutId)
        {
            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null) { return NotFound($"Workout with id {workoutId} was not found"); }

            _context.Workouts.Remove(dbWorkout);
            await _context.SaveChangesAsync();

            return Ok(dbWorkout.Adapt<WorkoutCreateNoIdDto>());
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

    }
}

using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<ActionResult<List<Workout>>> PostWorkouts(List<WorkoutCreateNoIdDto> newWorkouts)
        {
            var workoutsToAdd = newWorkouts.Adapt<List<Workout>>();
            await _context.Workouts.AddRangeAsync(workoutsToAdd);
            await _context.SaveChangesAsync();
            return workoutsToAdd.Adapt<List<Workout>>();
        }

        [HttpPost]
        public async Task<ActionResult<Workout>> PostWorkout(WorkoutCreateNoIdDto workoutCreate)
        {
            // no more unique workout names since accounts now take ownership of a workout
            //var dbWorkout = _context.Workouts.ToList().Find(w => w.Name == workoutCreate.Name);
            //if (dbWorkout != null) { return Conflict($"Workout with name {workoutCreate.Name} already exists"); }

            var newWorkout = workoutCreate.Adapt<Workout>();
            _context.Workouts.Add(newWorkout);
            _context.SaveChanges();

            return Accepted(await _context.Workouts.FindAsync(newWorkout.Id));
        }

        // PUT {exerciseid} on Workout list of exercises
        [HttpPut("{workoutId}/AddExercise/{exerciseId}")]
        public async Task<ActionResult<WorkoutWithExerciseFullDto>> AddExerciseToWorkout(long workoutId, long exerciseId)
        {
            var dbExercise = await _context.Exercises.FindAsync(exerciseId);
            if (dbExercise == null) { return NotFound("Could not find exercise"); }

            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null) { return NotFound("Could not find workout"); }

            _context.Entry(dbWorkout)
                .Collection(w => w.Exercises)
                .Load();

            if (dbWorkout.Exercises.Contains(dbExercise)) { return Conflict("Exercise already exists in workout"); }

            dbWorkout.Exercises.Add(dbExercise);
            await _context.SaveChangesAsync();

            return Accepted(dbWorkout.Adapt<WorkoutWithExerciseFullDto>());
        }

        // PUT {exerciseid} from Workout list of exercises
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

        [HttpGet("WithExerciseFull")]
        public ActionResult<List<WorkoutWithExerciseFullDto>> GetWorkoutsWithExercisesFull()
        {
            var dbWorkouts = _context.Workouts.ToList();

            foreach (var workout in dbWorkouts)
            {
                _context.Entry(workout)
                    .Collection(w => w.Exercises)
                    .Load();
            }

            return Ok(dbWorkouts.Adapt<List<WorkoutWithExerciseFullDto>>());
        }

        [HttpGet("noId")]
        public ActionResult<List<WorkoutCreateWithExercisesIdsDto>> GetWorkoutsWithExercisesId()
        {
            var dbWorkouts = _context.Workouts.ToList();
            var result = dbWorkouts.Adapt<List<WorkoutCreateWithExercisesIdsDto>>();

            foreach (var workout in dbWorkouts)
            {
                _context.Entry(workout)
                    .Collection(w => w.Exercises)
                    .Load();
                result.Find(w => w.Name == workout.Name).ExercisesIds = workout.Exercises.Select(e => e.Id).ToList();
            }

            return Ok(result);
        }

        [HttpGet]
        public ActionResult<List<WorkoutWithIdsWithExercisesIdsDto>> GetWorkoutsWithIdExercisesId()
        {
            var dbWorkouts = _context.Workouts.ToList();
            var result = dbWorkouts.Adapt<List<WorkoutWithIdsWithExercisesIdsDto>>();
            
            foreach (var workout in dbWorkouts)
            {
                _context.Entry(workout)
                    .Collection(w => w.Exercises)
                    .Load();
                result.Find(w => w.Id == workout.Id).ExercisesIds = workout.Exercises.Select(e => e.Id).ToList();
            }

            return Ok(result);
        }


        [HttpGet("{workoutId}")]
        public async Task<ActionResult<WorkoutCreateWithExercisesIdsDto>> GetWorkoutById(long workoutId)
        {
            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null)
            {
                return NotFound($"Workout with id {workoutId} was not found");
            }

            _context.Entry(dbWorkout)
                .Collection(w => w.Exercises)
                .Load();

            var result = dbWorkout.Adapt<WorkoutCreateWithExercisesIdsDto>();

            foreach (var item in dbWorkout.Exercises)
            {
                result.ExercisesIds.Add(item.Id);
            }

            return Ok(result);
        }

        [HttpGet("Simple")]
        public ActionResult<List<WorkoutSimpleDto>> GetWorkoutsSimple()
        {
            var dbWorkouts = _context.Workouts;
            if (dbWorkouts == null) { return NotFound("No workouts found"); }

            return Ok(dbWorkouts.Adapt<List<WorkoutSimpleDto>>());
        }

        [HttpDelete("{workoutId}")]
        public async Task<ActionResult<WorkoutSimpleDto>> DeleteWorkout(long workoutId)
        {
            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null) { return NotFound($"Workout with id {workoutId} was not found"); }

            _context.Workouts.Remove(dbWorkout);
            await _context.SaveChangesAsync();

            return Ok(dbWorkout.Adapt<WorkoutSimpleDto>());
        }
    }
}

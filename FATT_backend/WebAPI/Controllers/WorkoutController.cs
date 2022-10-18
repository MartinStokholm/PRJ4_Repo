using Mapster;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dto.Exercise;
using WebAPI.Dto.Workout;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly DataContext _context;
        public WorkoutController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Workout>> PostWorkout(WorkoutCreate workoutCreate)
        {
            var dbWorkout = _context.Workouts.ToList().Find(w => w.Name == workoutCreate.Name);
            if (dbWorkout != null) { return Conflict($"Workout with name {workoutCreate.Name} already exists"); }
            
            var newWorkout = workoutCreate.Adapt<Workout>();
            _context.Workouts.Add(newWorkout);
            _context.SaveChanges();

            return Ok(await _context.Workouts.FindAsync(newWorkout.Id));
        }

        // PUT {exerciseid} on Workout list of exercises
        [HttpPut("{workoutId}/AddExercise/{exerciseId}")]
        public async Task<ActionResult<List<ExerciseSimple>>> AddExerciseToWorkout(long workoutId, long exerciseId)
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

            return Accepted(dbWorkout);
        }

        // PUT {exerciseid} from Workout list of exercises
        [HttpPut("{workoutId}/RemoveExercise/{exerciseId}")]
        public async Task<ActionResult<List<ExerciseSimple>>> RemoveExerciseFromWorkout(long workoutId, long exerciseId)
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

            return Accepted(dbWorkout);
        }

        [HttpGet("{workoutId}")]
        public async Task<ActionResult<Workout>> GetWorkoutById(long workoutId)
        {
            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null)
            {
                return NotFound($"Workout with id {workoutId} was not found");
            }

            _context.Entry(dbWorkout)
                .Collection(w => w.Exercises)
                .Load();

            return Ok(dbWorkout);
        }

        [HttpGet("Simple")]
        public ActionResult<List<WorkoutSimple>> GetWorkoutsSimple()
        {
            var dbWorkouts = _context.Workouts;
            if (dbWorkouts == null) { return NotFound("No workouts found"); }

            return Ok(dbWorkouts.Adapt<List<WorkoutSimple>>());
        }
    }
}

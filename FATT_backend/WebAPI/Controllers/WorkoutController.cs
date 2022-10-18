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
        public ActionResult<List<Workout>> PostWorkout(WorkoutCreate workoutCreate)
        {
            var newWorkout = workoutCreate.Adapt<Workout>();
            _context.Workouts.Add(newWorkout);
            _context.SaveChanges();
            
            return Ok(newWorkout);
        }

        // PUT {exerciseid} on Workout list of exercises
        [HttpPut("{workoutId}/AddExercise/{exerciseId}")]
        public async Task<ActionResult<List<ExerciseWithName>>> AddExerciseToWorkout(long workoutId, long exerciseId)
        {
            var dbExercise = await _context.Exercises.FindAsync(exerciseId);
            if (dbExercise == null) { return NotFound("Could not find exercise"); }

            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null) { return NotFound("Could not find workout"); }

            _context.Entry(dbWorkout)
                .Collection(w => w.Exercises)
                .Load();

            dbWorkout.Exercises.Add(dbExercise);
            await _context.SaveChangesAsync();

            return Accepted(dbExercise);
        }
        
    }
}

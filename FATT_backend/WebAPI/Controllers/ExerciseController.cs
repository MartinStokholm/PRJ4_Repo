using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Dto.Exercise;
using WebAPI.Models;
using Mapster;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExerciseController : ControllerBase
    {
        private readonly DataContext _context;

        public ExerciseController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("list")]
        public async Task<ActionResult<List<ExerciseCreateNoIdDto>>> PostExercises(List<ExerciseCreateNoIdDto> exercises)
        {
            var exercisesToAdd = exercises.Adapt<List<Exercise>>();
            await _context.Exercises.AddRangeAsync(exercisesToAdd);
            await _context.SaveChangesAsync();
            return Accepted(exercisesToAdd.Adapt<List<ExerciseCreateNoIdDto>>());
        }

        [HttpPost]
        public async Task<ActionResult<ExerciseCreateNoIdDto>> PostExercise(ExerciseNoIdNoWorkoutsDto exerciseCreate)
        {
            var dbExercise = _context.Exercises.ToList().Find(e => e.Name == exerciseCreate.Name);
            if (dbExercise != null) { return Conflict($"Exercise with name {exerciseCreate.Name} already exists"); }

            var exerciseToAdd = exerciseCreate.Adapt<Exercise>();
            _context.Exercises.Add(exerciseToAdd);

            await _context.SaveChangesAsync();

            return Accepted(exerciseToAdd.Adapt<ExerciseCreateNoIdDto>());
        }

        [HttpPut("{exerciseId}")]
        public async Task<ActionResult<Exercise>> PutExercise(long exerciseId, ExerciseUpdateDto exerciseUpdate)
        {
            var dbExercise = await _context.Exercises.FindAsync(exerciseId);

            if (dbExercise == null) { return NotFound($"Could not find exercise with id {exerciseId}"); }

            _context.Entry(dbExercise)
                .CurrentValues
                .SetValues(exerciseUpdate);

            await _context.SaveChangesAsync();

            return Accepted(await _context.Exercises.FindAsync(exerciseId));
        }

      
        [HttpGet]
        public async Task<ActionResult<List<ExerciseNoWorkoutsDto>>> GetExerciseFull()
        {
            var dbExercise = await _context.Exercises.ToListAsync();

            return Ok(dbExercise.Adapt<List<ExerciseNoWorkoutsDto>>());
        }

        [HttpGet("{exerciseId}")]
        public async Task<ActionResult<ExerciseNoWorkoutsDto>> GetExerciseById(long exerciseId)
        {
            var dbExercise = await _context.Exercises.FindAsync(exerciseId);
            if (dbExercise == null)
            {
                return NotFound($"Exercise with id {exerciseId} was not found");
            }

            return Ok(dbExercise.Adapt<ExerciseNoWorkoutsDto>());
        }

        [HttpDelete("{exerciseId}")]
        public async Task<ActionResult<ExerciseCreateNoIdDto>> DeleteExercise(long exerciseId)
        {

            var dbExercise = await _context.Exercises.FindAsync(exerciseId);
            if (dbExercise == null)
            {
                return NotFound($"Exercise with id {exerciseId} was not found");
            }

            _context.Exercises.Remove(dbExercise);
            await _context.SaveChangesAsync();

            return Ok(dbExercise.Adapt<ExerciseCreateNoIdDto>());
        }

    }
}

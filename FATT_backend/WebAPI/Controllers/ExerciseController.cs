using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Dto.Exercise;
using WebAPI.Models;
using Mapster;

namespace WebAPI.Controllers
{ 
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly DataContext _context;

        public ExerciseController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("list")]
        public async Task<ActionResult<List<ExerciseSimple>>> PostExercises(List<ExerciseCreateNoId> exercises)
        {
            var exercisesToAdd = exercises.Adapt<List<Exercise>>();
            await _context.Exercises.AddRangeAsync(exercisesToAdd);
            await _context.SaveChangesAsync();
            return exercisesToAdd.Adapt<List<ExerciseSimple>>();
        }

        [HttpPost]
        public async Task<ActionResult<ExerciseSimple>> PostExercise(ExerciseFull exerciseCreate)
        {
            var dbExercise = _context.Exercises.ToList().Find(e => e.Name == exerciseCreate.Name);
            if (dbExercise != null) { return Conflict($"Exercise with name {exerciseCreate.Name} already exists"); }
            
            var exerciseToAdd = exerciseCreate.Adapt<Exercise>();
            _context.Exercises.Add(exerciseToAdd);

            await _context.SaveChangesAsync();
            
            return Ok(exerciseToAdd.Adapt<ExerciseSimple>());
        }

        [HttpPut("{exerciseId}")]
        public async Task<ActionResult<Exercise>> PutExercise(long exerciseId, ExerciseUpdate exerciseUpdate)
        {
            var dbExercise = await _context.Exercises.FindAsync(exerciseId);
                
            if (dbExercise == null) { return NotFound($"Could not find exercise with id {exerciseId}"); }

            _context.Entry(dbExercise)
                .CurrentValues
                .SetValues(exerciseUpdate);
            
            await _context.SaveChangesAsync();

            return Ok(await _context.Exercises.FindAsync(exerciseId));
        }

        [HttpGet("Thumbnail")]
        public async Task<ActionResult<List<ExerciseThumbnail>>> GetExerciseThumbnail()
        {
            var dbExercise = await _context.Exercises.ToListAsync();
            
            return Ok(dbExercise.Adapt<List<ExerciseThumbnail>>());
        }

        [HttpGet("Simple")]
        public async Task<ActionResult<List<ExerciseSimple>>> GetExerciseSimple()
        {
            var dbExercise = await _context.Exercises.ToListAsync();

            return Ok(dbExercise.Adapt<List<ExerciseSimple>>());
        }

        [HttpGet("Full")]
        public async Task<ActionResult<List<ExerciseFull>>> GetExerciseFull()
        {
            var dbExercise = await _context.Exercises.ToListAsync();

            return Ok(dbExercise.Adapt<List<ExerciseFull>>());
        }

        [HttpGet("{exerciseId}")]
        public async Task<ActionResult<ExerciseFull>> GetExerciseById(long exerciseId) 
        {
            var dbExercise = await _context.Exercises.FindAsync(exerciseId);
            if (dbExercise == null)
            {
                return NotFound($"Exercise with id {exerciseId} was not found");
            }
  
            return Ok(dbExercise.Adapt<ExerciseFull>());
        }

    }
}

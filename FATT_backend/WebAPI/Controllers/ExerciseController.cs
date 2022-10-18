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

        [HttpPost]
        public async Task<ActionResult<ExerciseWithName>> PostExercise(ExerciseCreate exerciseCreate)
        {
            var exerciseToAdd = exerciseCreate.Adapt<Exercise>();
            _context.Exercises.Add(exerciseToAdd);

            await _context.SaveChangesAsync();
            
            return Ok(exerciseToAdd.Adapt<ExerciseWithName>());
        }

        [HttpGet("WithNames")]
        public async Task<ActionResult<List<ExerciseWithName>>> GetExercisesWithNames()
        {
            var dbExerciseWithName = await _context.Exercises.ToListAsync();
            
            return Ok(dbExerciseWithName.Adapt<List<ExerciseWithName>>());
        }

        [HttpGet("{exerciseId}")]
        public async Task<ActionResult<ExerciseCreate>> GetExerciseById(long exerciseId) 
        {
            var dbExercise = await _context.Exercises.FindAsync(exerciseId);
            if (dbExercise == null)
            {
                return NotFound($"Exercise with id {exerciseId} was not found");
            }
            return Ok(dbExercise.Adapt<ExerciseCreate>());
        }

    }
}

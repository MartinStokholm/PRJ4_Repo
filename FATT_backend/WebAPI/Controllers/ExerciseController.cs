using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Dto;
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
            var exerciseToAdd = exerciseCreate.Adapt<ExerciseModel>();
            _context.ExerciseModels.Add(exerciseToAdd);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExercise", new { id = exerciseToAdd.Id }, exercise);
        }
        
        /// <summary>
        /// Get all exercises with their name
        /// </summary>
        /// <returns></returns>
        [HttpGet("WithNames")]
        public async Task<ActionResult<ExerciseWithName>> GetExercisesWithNames()
        {
            var dbExerciseWithName = await _context.ExerciseModels
                .Include(e => e.Name)
                .ToListAsync();
            
            return Ok(dbExerciseWithName);
        }
    }
}

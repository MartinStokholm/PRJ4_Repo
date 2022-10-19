using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Dto.Meal;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController : ControllerBase
    {
        private readonly DataContext _context;

        public MealController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Meal
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MealModel>>> GetMeals()
        {
            return await _context.MealModels.ToListAsync();
        }

        // GET: api/Meal/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MealModel>> GetMealModel(int id)
        {
            var meal = await _context.MealModels.FindAsync(id);

            if (meal == null)
            {
                return NotFound();
            }

            return meal;
        }

        // PUT: api/MealModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMealModel(int id, MealDtoNoId meal)
        {
            var found = await _context.MealModels.FindAsync(id);
            if (found == null)
            {
                return BadRequest("Couldn't find Meal with specified id");
            }

            found.Adapt(meal);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MealModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MealModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MealModel>> PostMealModel(MealDtoNoId meal)
        {

            _context.MealModels.Add(meal.Adapt<MealModel>());
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMealModel", meal.Adapt<MealModel>());
        }

        // DELETE: api/Meal/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeal(int id)
        {
            var mealModel = await _context.MealModels.FindAsync(id);
            if (mealModel == null)
            {
                return NotFound();
            }

            _context.MealModels.Remove(mealModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MealModelExists(int id)
        {
            return _context.MealModels.Any(e => e.Id == id);
        }
    }
}

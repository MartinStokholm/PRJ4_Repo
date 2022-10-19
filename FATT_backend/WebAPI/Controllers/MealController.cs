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


        // Get full information about the meal including the dishes
        // GET: api/Meal/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MealModel>> GetMeal(long id)
        {
            var meal = await _context.MealModels.FindAsync(id);

            _context.Entry(meal)
                .Collection(m => m.Dishes)
                .Load();

            if (meal == null)
            {
                return NotFound();
            }

            return meal;
        }

        // PUT: api/MealModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeal(long id, MealDtoNoId meal)
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
                if (!MealModelExists((int)id))
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

        // PUT: api/Meal/1/AddDish/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{mealId}/AddDish/{dishId}")]
        public async Task<IActionResult> PutAddDish(long mealId, long dishId)
        {
            var meal = await _context.MealModels.FindAsync(mealId);
            var dish = await _context.DishModels.FindAsync(dishId);
            if (meal == null || dish == null)
            {
                if(meal == null)
                    return BadRequest("Couldn't find Meal with specified id");
                return BadRequest("Couldn't find Dish with specified id");
            }

            _context.Entry(meal)
                .Collection(m => m.Dishes)
                .Load();
            _context.Entry(dish)
                .Collection(d => d.Meals)
                .Load();

            if(!meal.Dishes.Contains(dish))
                meal.Dishes.Add(dish);
            dish.Meals.Add(meal);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MealModelExists((int)mealId))
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

        // POST: api/Meal
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MealModel>> PostMeal(MealDtoNoId meal)
        {

            _context.MealModels.Add(meal.Adapt<MealModel>());
            await _context.SaveChangesAsync();

            return Accepted( meal.Adapt<MealModel>());
        }

        // POST: api/Meal/Simple
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Simple")]
        public async Task<ActionResult<MealModel>> PostMealSimple(MealSimple meal)
        {

            _context.MealModels.Add(meal.Adapt<MealModel>());
            await _context.SaveChangesAsync();

            return Accepted(meal.Adapt<MealModel>());
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

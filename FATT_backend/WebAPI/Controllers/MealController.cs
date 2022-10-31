using System.Collections;
using System.Collections.Generic;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Dto.Dish;
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


        /* GET requests */

        // GET: api/Meal
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MealModel>>> GetMeals()
        {
            return await _context.MealModels.ToListAsync();
        }


        // Get information about the meal including dish names
        // GET: api/Meal/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MealNameWDishes>> GetMeal(long id)
        {
            var meal = await _context.MealModels.FindAsync(id);

            if (meal == null)
            {
                return NotFound();
            }

            _context.Entry(meal)
                .Collection(m => m.Dishes)
                .Load();


            MealNameWDishes ret = meal.Adapt<MealNameWDishes>();
          
            return ret;
        }

        // Get all the dishes of a particular meal
        // GET: api/Meal/5
        [HttpGet("{id}/Dishes")]
        public async Task<ActionResult<IEnumerable<DishWThumbnail>>> GetDishes(long id)
        {
            var meal = await _context.MealModels.FindAsync(id);

            if (meal == null)
            {
                return NotFound();
            }

            _context.Entry(meal)
                .Collection(m => m.Dishes)
                .Load();

            List<DishWThumbnail> dishes = new List<DishWThumbnail>();
            foreach (var d in meal.Dishes)
            {
                dishes.Add(d.Adapt<DishWThumbnail>());
            }
            return dishes;
        }


        /* PUT requests */

        // PUT: api/MealModels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeal(long id, MealNameWDishes meal)
        {
            var found = await _context.MealModels.FindAsync(id);
            if (found == null)
            {
                return BadRequest("Couldn't find Meal with specified id");
            }
            _context.Entry(found).
                Collection(m => m.Dishes)
                .Load();
            found.Name = meal.Name;
            found.Dishes.Clear();
            foreach (var d in meal.Dishes)
            {
                found.Dishes.Add(meal.Dishes.Adapt<DishModel>());
            }
            

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


        /* POST requests */

        // POST: api/Meal
        [HttpPost]
        public async Task<ActionResult<MealModel>> PostMeal(MealNameWDishes meal)
        {

            _context.MealModels.Add(meal.Adapt<MealModel>());
            await _context.SaveChangesAsync();
            var created = _context.MealModels.FirstOrDefault(m => m.Id == _context.MealModels.Max(i => meal.Id));
            return Accepted(created);
        }

        // POST: api/Meal/Simple
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Simple")]
        public async Task<ActionResult<MealModel>> PostMealSimple(MealSimple meal)
        {

            _context.MealModels.Add(meal.Adapt<MealModel>());
            await _context.SaveChangesAsync();
            var created = _context.MealModels.FirstOrDefault(m => m.Id == _context.MealModels.Max(i => i.Id));
            return Accepted(created);
        }



        /* DELETE */

        // DELETE: api/Meal/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeal(long id)
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

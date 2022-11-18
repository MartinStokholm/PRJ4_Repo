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
        public async Task<ActionResult<List<MealWithDishIdDto>>> GetMeals()
        {
            var dbMeals = await _context.Meals.ToListAsync();
            var result = dbMeals.Adapt<List<MealWithDishIdDto>>();
            foreach (var meal in dbMeals)
            {
                _context.Entry(meal)
                    .Collection(m => m.Dishes)
                    .Load();

                result.Find(m => m.Id == meal.Id).DishIds = meal.Dishes.Select(e => e.Id).ToList();
            }
            return Ok(result);
        }


        // Get information about the meal including dish names
        // GET: api/Meal/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MealNameWDishes>> GetMeal(long id)
        {
            var meal = await _context.Meals.FindAsync(id);

            if (meal == null)
            {
                return NotFound();
            }

            _context.Entry(meal)
                .Collection(m => m.Dishes)
                .Load();


            MealNameWDishes ret = meal.Adapt<MealNameWDishes>();
          
            return Ok(ret);
        }

        // Get all the dishes of a particular meal
        // Should deprecate and use .Include andre steder
        // GET: api/Meal/5
        [HttpGet("{id}/Dishes")]
        public async Task<ActionResult<IEnumerable<DishNoMealsDto>>> GetDishes(long id)
        {
            var meal = await _context.Meals.FindAsync(id);

            if (meal == null)
            {
                return NotFound();
            }

            _context.Entry(meal)
                .Collection(m => m.Dishes)
                .Load();

            List<DishNoMealsDto> dishes = new List<DishNoMealsDto>();
            foreach (var d in meal.Dishes)
            {
                dishes.Add(d.Adapt<DishNoMealsDto>());
            }
            return Ok(dishes);
        }


        /* PUT requests */

        // Change Name, Category or Description
        // PUT: api/MealModels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeal(long id, MealSimple meal)
        {
            var found = await _context.Meals.FindAsync(id);
            if (found == null)
            {
                return BadRequest("Couldn't find Meal with specified id");
            }

            _context.Entry(found)
                .CurrentValues
                .SetValues(meal);

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

            return Accepted(found.Adapt<MealNameWDishes>());
        }

        // PUT: api/Meal/1/AddDish/5
        [HttpPut("{mealId}/AddDish/{dishId}")]
        public async Task<IActionResult> PutAddDish(long mealId, long dishId)
        {
            var meal = (from m in _context.Meals
                where m.Id == mealId
                select m).Include(m => m.Dishes)
                .FirstOrDefault();

            if (meal == null)
                return BadRequest("Couldn't find Meal with specified id");

            var dishInMeal = meal.Dishes.FirstOrDefault(d => d.Id == dishId);
            if (dishInMeal != null)
            {
                return BadRequest("Meal already contains specified Dish");
            }

            var dish = _context.Dishes.FirstOrDefault(d => d.Id == dishId);

            if (dish == null)
            {
                return BadRequest("Dish does not exist in database");
            }

            try
            {
                meal.Dishes.Add(dish);
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

            return Accepted(meal.Adapt<MealNameWDishes>());
        }

        // PUT: api/Meal/1/RemoveDish/5
        [HttpPut("{mealId}/RemoveDish/{dishId}")]
        public async Task<IActionResult> PutRemoveDish(long mealId, long dishId)
        {
            var meal = (from m in _context.Meals select m)
                .Include(m => m.Dishes)
                .FirstOrDefault(meal => meal.Id == mealId);

            if (meal == null)
                return BadRequest("Couldn't find Meal with specified id");

            var dish = meal.Dishes.FirstOrDefault(d => d.Id == dishId);
            if (dish == null)
            {
                return BadRequest("Meal does not contain specified Dish");
            }

            try
            {
                meal.Dishes.Remove(dish);
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

            return Accepted(meal.Adapt<MealNameWDishes>());
        }


        /* POST requests */

        // POST: api/Meal
        [HttpPost]
        public async Task<ActionResult<MealNameWDishes>> PostMeal(MealSimple meal)
        {
            var adapted = meal.Adapt<Meal>();
            _context.Meals.Add(adapted);
            await _context.SaveChangesAsync();
            return Accepted(adapted.Adapt<MealNameWDishes>());
        }

        /* DELETE */

        // DELETE: api/Meal/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeal(long id)
        {
            var mealModel = await _context.Meals.FindAsync(id);
            if (mealModel == null)
            {
                return NotFound();
            }

            _context.Meals.Remove(mealModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MealModelExists(long id)
        {
            return _context.Meals.Any(e => e.Id == id);
        }
    }
}

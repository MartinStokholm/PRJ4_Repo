using System.Collections;
using System.Collections.Generic;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Dto.Dish;
using WebAPI.Dto.Meal;
using WebAPI.Dto.Workout;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MealController : ControllerBase
    {
        private readonly DataContext _context;

        public MealController(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// When a user is logged in they can create a meal which gets added to their list of meals
        /// </summary>
        /// <param name="mealCreate"></param>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpPost("{email}")]
        public async Task<ActionResult<MealCreateNoIdDto>> PostWorkout(MealCreateNoIdDto mealCreate, string email)
        {
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == email);

            if (dbAccount == null) { return NotFound($"Account with email {email} was not found"); }

            var newMeal = mealCreate.Adapt<Meal>();
            newMeal.AccountId = dbAccount.Id;
            _context.Meals.Add(newMeal);
            _context.SaveChanges();

            return Accepted(newMeal.Adapt<MealCreateNoIdDto>());
        }

        /// <summary>
        /// When a user is logged in they can add a dish to their meal given the meal id and the dish id
        /// </summary>
        /// <param name="mealId"></param>
        /// <param name="dishId"></param>
        /// <returns></returns>
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

            return Accepted(meal.Adapt<MealWithDishesFullDto>());
        }

        /// <summary>
        /// When a user is logged in they can remove a dish from their meal given the meal is and the dish id
        /// </summary>
        /// <param name="mealId"></param>
        /// <param name="dishId"></param>
        /// <returns></returns>
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

            return Accepted(meal.Adapt<MealWithDishesFullDto>());
        }

        /// <summary>
        /// When a user is logged in they can add a meal to their calendar given the meal id, day and their email
        /// </summary>
        /// <param name="mealId"></param>
        /// <param name="day"></param>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpPut("{mealId}/AddToCalender/{day}/Account/{email}")]
        public async Task<ActionResult<Calender>> AddMealToCalender(long mealId, string day, string email)
        {
            var dbAccount = await _context.Accounts.Include(x => x.Calender).FirstOrDefaultAsync(a => a.Email == email);
            if (dbAccount == null) { return NotFound($"Could not find account with email {email}"); }

            var dbMeal = await _context.Meals.FindAsync(mealId);
            if (dbMeal == null) { return NotFound($"Could not find meal with id {mealId}"); }

            dbAccount.Calender.MealDays.Add(new MealOnDay { MealId = mealId, Day = day });

            await _context.SaveChangesAsync();
            return Accepted(dbAccount.Calender);
        }

        /// <summary>
        /// When logged in a user can get a list of their meals with all dishes related
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpGet("Account/{email}")]
        public async Task<ActionResult<List<MealWithDishesFullDto>>> GetMealsByAccountEmail(string email)
        {
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == email);

            if (dbAccount == null) { return NotFound($"Account with email {email} was not found"); }

            var dbMeals = await _context.Meals.Where(w => w.AccountId == dbAccount.Id).Include(x => x.Dishes).ToListAsync();

            return Ok(dbMeals.Adapt<List<MealWithDishesFullDto>>());
        }

        /// <summary>
        /// Delete a meal
        /// </summary>
        /// <param name="mealId"></param>
        /// <returns></returns>
        [HttpDelete("{mealId}")]
        public async Task<IActionResult> DeleteMeal(long mealId)
        {
            var mealModel = await _context.Meals.FindAsync(mealId);
            if (mealModel == null)
            {
                return NotFound();
            }

            _context.Meals.Remove(mealModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{mealId}")]
        public async Task<ActionResult<MealCreateWithDishesIdsDto>> GetMeal(long mealId)
        {
            var dbMeal = await _context.Meals.Include(w => w.Dishes).FirstOrDefaultAsync(w => w.Id == mealId);
            if (dbMeal == null)
            {
                return NotFound($"Meal with id {mealId} was not found");
            }

            var meal = dbMeal.Adapt<MealCreateWithDishesIdsDto>();

            meal.DishesIds = dbMeal.Dishes.Select(e => e.Id).ToList();

            return Ok(meal);
        }

        private bool MealModelExists(long id)
        {
            return _context.Meals.Any(e => e.Id == id);
        }
    
    }
}

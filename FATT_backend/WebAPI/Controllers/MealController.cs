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
     
        [HttpPost("WithDishNames")]
        public async Task<ActionResult<MealWithDishNameDto>> PostMealWithDishes(MealWithDishNameDto newMeal)
        {
            var adapted = newMeal.Adapt<Meal>();
            adapted.Dishes = new List<Dish>();
            foreach (var dishName in newMeal.DishNames)
            {
                var dish = _context.Dishes.FirstOrDefault(d => d.Name == dishName);
                if (dish == null)
                {
                    return BadRequest("Dish does not exist in database");
                }

                adapted.Dishes.Add(dish);
            }
            _context.Meals.Add(adapted);
            await _context.SaveChangesAsync();
            return Accepted(adapted.Adapt<MealWithDishNameDto>());
        }

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
        
        [HttpPut("{mealId}/account/{email}")]
        public async Task<ActionResult<MealWithDishesFullDto>> AddMealToAccount(string email, long mealId)
        {
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.Email == email);

            if (dbAccount == null) { return NotFound($"Account with email {email} was not found"); }

            var dbMeal = await _context.Meals.FirstOrDefaultAsync(w => w.Id == mealId);

            if (dbMeal == null) { return NotFound($"Meal with id {mealId} was not found"); }

            dbAccount.Meals.Add(dbMeal);

            await _context.SaveChangesAsync();

            return Ok(dbMeal.Adapt<MealWithDishesFullDto>());
        }


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

        [HttpGet]
        public async Task<ActionResult<List<MealWithDishIdDto>>> GetMeals()
        {
            var dbMeals = await _context.Meals.Include(m => m.Dishes).ToListAsync();
            var result = dbMeals.Adapt<List<MealWithDishIdDto>>();
            foreach (var meal in dbMeals)
            {
                result.Find(m => m.Id == meal.Id).DishIds = meal.Dishes.Select(e => e.Id).ToList();
            }
            return Ok(result);
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

        [HttpGet("{mealId}/Dishes")]
        public async Task<ActionResult<IEnumerable<DishNoMealsDto>>> GetDishes(long mealId)
        {
            var dbMeal = await _context.Meals.FindAsync(mealId);

            if (dbMeal == null)
            {
                return NotFound();
            }

            _context.Entry(dbMeal)
                .Collection(m => m.Dishes)
                .Load();

            List<DishNoMealsDto> dishes = new List<DishNoMealsDto>();
            foreach (var d in dbMeal.Dishes)
            {
                dishes.Add(d.Adapt<DishNoMealsDto>());
            }
            return Ok(dishes);
        }
        
        [HttpGet("Account/{email}")]
        public async Task<ActionResult<List<MealWithDishesFullDto>>> GetMealsByAccountEmail(string email)
        {
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == email);

            if (dbAccount == null) { return NotFound($"Account with email {email} was not found"); }

            var dbMeals = await _context.Meals.Where(w => w.AccountId == dbAccount.Id).Include(x => x.Dishes).ToListAsync();

            return Ok(dbMeals.Adapt<List<MealWithDishesFullDto>>());
        }


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

        private bool MealModelExists(long id)
        {
            return _context.Meals.Any(e => e.Id == id);
        }

    
    }
}

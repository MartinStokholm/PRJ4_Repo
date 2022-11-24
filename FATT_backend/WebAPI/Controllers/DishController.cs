using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using Mapster;
using WebAPI.Dto.Dish;
using WebAPI.Dto.Meal;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Dto.Exercise;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DishController : ControllerBase
    {
        private readonly DataContext _context;

        public DishController(DataContext context)
        {
            _context = context;
        }
        
        [HttpPost]
        public async Task<ActionResult<DishNoMealsDto>> PostDishModel(DishNoIdDto newDish)
        {
            var d = newDish.Adapt<Dish>();
            _context.Dishes.Add(d);
            await _context.SaveChangesAsync();

            return Accepted(d.Adapt<DishNoMealsDto>());
        }

        [HttpPost("list")]
        public async Task<ActionResult<List<DishNoMealsDto>>> PostDishModel(List<DishNoIdDto> newDishes)
        {
            var dishes = newDishes.Adapt<List<Dish>>();
            _context.Dishes.AddRange(dishes);
            await _context.SaveChangesAsync();

            return Accepted(dishes.Adapt<List<DishNoMealsDto>>());
        }

        [HttpPut("{dishId}")]
        public async Task<IActionResult> PutDishModel(long dishId, DishNoIdDto dish)
        {
            var dbDish = await _context.Dishes.FindAsync(dishId);
            if (dbDish == null) { return NotFound($"Could not find dish with id {dishId}"); }

            _context.Entry(dbDish)
                .CurrentValues
                .SetValues(dish);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DishModelExists((int)dishId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Accepted(dbDish.Adapt<DishNoMealsDto>());
        }

        [HttpGet]
        public async Task<ActionResult<List<DishNoMealsDto>>> GetDishes()
        {
            var dbDishes = await _context.Dishes.ToListAsync();
            return dbDishes.Adapt<List<DishNoMealsDto>>();
        }

        [HttpGet("{dishId}")]
        public async Task<ActionResult<DishNoMealsDto>> GetDish(long dishId)
        {
            var dbDish = await _context.Dishes.FindAsync(dishId);

            if (dbDish == null) { return NotFound($"Could not find dish with id {dishId}"); }

            _context.Entry(dbDish)
                .Collection(d => d.Meals)
                .Load();

            var ret = dbDish.Adapt<DishNoMealsDto>();

            return Ok(ret);
        }

        [HttpDelete("{dishId}")]
        public async Task<IActionResult> DeleteDish(long dishId)
        {

            var dbDish = await _context.Dishes.FindAsync(dishId);

            if (dbDish == null) { return NotFound($"Could not find dish with id {dishId}"); }

            _context.Dishes.Remove(dbDish);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DishModelExists(long dishId)
        {
            return _context.Dishes.Any(e => e.Id == dishId);
        }
    }
}

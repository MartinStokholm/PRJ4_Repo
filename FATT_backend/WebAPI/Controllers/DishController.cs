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

        // GET: api/DishModels
        [HttpGet]
        public async Task<ActionResult<List<DishNoMealsDto>>> GetDishModel()
        {
            var dbDishes = await _context.Dishes.ToListAsync();
            return dbDishes.Adapt<List<DishNoMealsDto>>();
        }

        // GET: api/DishModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DishNoMealsDto>> GetDish(long id)
        {
            var dish = await _context.Dishes.FindAsync(id);


            if (dish == null)
            {
                return NotFound();
            }

            _context.Entry(dish)
                .Collection(d => d.Meals)
                .Load();

            var ret = dish.Adapt<DishNoMealsDto>();

            return Ok(ret);
        }

        // PUT: api/DishModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDishModel(long id, DishNoIdDto dish)
        {
            var found = await _context.Dishes.FindAsync(id);
            if (found == null)
            {
                return NotFound("Couldn't find Dish with specified id");
            }

            _context.Entry(found)
                .CurrentValues
                .SetValues(dish);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DishModelExists((int)id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Accepted(found.Adapt<DishNoMealsDto>());
        }

        /* POST requests*/

        // POST: api/DishModels
        [HttpPost]
        public async Task<ActionResult<DishNoMealsDto>> PostDishModel(DishNoIdDto dishModel)
        {
            Dish d = dishModel.Adapt<Dish>();
            _context.Dishes.Add(d);
            await _context.SaveChangesAsync();

            return Accepted(d.Adapt<DishNoMealsDto>());
        }

        /* DELETE requests */

        // DELETE: api/DishModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDishModel(long id)
        {

            var dishModel = await _context.Dishes.FindAsync(id);

            if (dishModel == null)
            {
                return NotFound();
            }

            _context.Dishes.Remove(dishModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DishModelExists(long id)
        {
            return _context.Dishes.Any(e => e.Id == id);
        }
    }
}

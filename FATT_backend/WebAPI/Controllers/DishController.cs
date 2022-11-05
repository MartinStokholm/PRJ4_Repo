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

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishController : ControllerBase
    {
        private readonly DataContext _context;

        public DishController(DataContext context)
        {
            _context = context;
        }

        // GET: api/DishModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dish>>> GetDishModel()
        {
            return await _context.Dishes.ToListAsync();
        }

        // GET: api/DishModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DishMealNames>> GetDish(long id)
        {
            var dish = await _context.Dishes.FindAsync(id);


            if (dish == null)
            {
                return NotFound();
            }

            _context.Entry(dish)
                .Collection(d => d.Meals)
                .Load();

            DishMealNames ret = dish.Adapt<DishMealNames>();

            return Ok(ret);
        }

        // PUT: api/DishModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDishModel(long id, DishDtoNoId dish)
        {
            var found = await _context.Dishes.FindAsync(id);
            if (found == null)
            {
                return BadRequest("Couldn't find Dish with specified id");
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

            return NoContent();
        }

        /* POST requests*/

        // POST: api/DishModels
        [HttpPost]
        public async Task<ActionResult<Dish>> PostDishModel(DishDtoNoId dishModel)
        {

            _context.Dishes.Add(dishModel.Adapt<Dish>());
            await _context.SaveChangesAsync();

            var created = _context.Dishes.FirstOrDefault(d =>
                d.Id == _context.Dishes.Max(i => i.Id));
            return Accepted(created);
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

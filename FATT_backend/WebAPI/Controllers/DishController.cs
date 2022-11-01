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
        public async Task<ActionResult<IEnumerable<DishModel>>> GetDishModel()
        {
            return await _context.DishModels.ToListAsync();
        }

        // GET: api/DishModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DishMealNames>> GetDish(long id)
        {
            var dish = await _context.DishModels.FindAsync(id);

            if (dish == null)
            {
                return NotFound();
            }

            _context.Entry(dish)
                .Collection(d => d.Meals)
                .Load();

            DishMealNames ret = dish.Adapt<DishMealNames>();

            return ret;
        }

        // PUT: api/DishModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDishModel(long id, DishDtoNoId dish)
        {
            var found = await _context.DishModels.FindAsync(id);
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
        public async Task<ActionResult<DishModel>> PostDishModel(DishDtoNoId dishModel)
        {

            _context.DishModels.Add(dishModel.Adapt<DishModel>());
            await _context.SaveChangesAsync();
            var created = _context.DishModels.FirstOrDefault(d =>
                d.Id == _context.DishModels.Max(i => i.Id));
            return Accepted(created);
        }

        /* DELETE requests */

        // DELETE: api/DishModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDishModel(int id)
        {
            var dishModel = await _context.DishModels.FindAsync((long)id);
            if (dishModel == null)
            {
                return NotFound();
            }

            _context.DishModels.Remove(dishModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DishModelExists(int id)
        {
            return _context.DishModels.Any(e => e.Id == id);
        }
    }
}

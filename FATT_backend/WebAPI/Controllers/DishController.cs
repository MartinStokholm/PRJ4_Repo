using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

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
            return await _context.DishModel.ToListAsync();
        }

        // GET: api/DishModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DishModel>> GetDishModel(int id)
        {
            var dishModel = await _context.DishModel.FindAsync(id);

            if (dishModel == null)
            {
                return NotFound();
            }

            return dishModel;
        }

        // PUT: api/DishModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDishModel(int id, DishDtoPost dish)
        {
            var found = await _context.DishModel.FindAsync(id);
            if (found == null)
            {
                return BadRequest("Couldn't find Dish with specified id");
            }

            found.Adapt(dish);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DishModelExists(id))
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

        // POST: api/DishModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DishModel>> PostDishModel(DishDtoPost dishModel)
        {

            _context.DishModel.Add(dishModel.Adapt<DishModel>());
            await _context.SaveChangesAsync();

            return CreatedAtAction(dishModel.Adapt<DishModel>());
        }

        // DELETE: api/DishModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDishModel(int id)
        {
            var dishModel = await _context.DishModel.FindAsync(id);
            if (dishModel == null)
            {
                return NotFound();
            }

            _context.DishModel.Remove(dishModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DishModelExists(int id)
        {
            return _context.DishModel.Any(e => e.Id == id);
        }
    }
}

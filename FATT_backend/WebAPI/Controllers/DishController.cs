using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using Mapster;
using WebAPI.Dto.Dish;
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
        
        /// <summary>
        /// Create a dish
        /// </summary>
        /// <param name="newDish"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<DishNoMealsDto>> PostDishModel(DishNoIdDto newDish)
        {
            var dbDishe = _context.Dishes.ToList().Find(d => d.Name == newDish.Name);
            if (dbDishe != null) { return Conflict($"Dishes with name {newDish.Name} already exists"); }

            var dishToAdd = newDish.Adapt<Dish>();
            _context.Dishes.Add(dishToAdd);

            await _context.SaveChangesAsync();

            return Accepted(dishToAdd.Adapt<DishNoMealsDto>());
        }

        /// <summary>
        /// Get all dishes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<List<DishNoMealsDto>>> GetDishes()
        {
            var dbDishes = await _context.Dishes.ToListAsync();
            return dbDishes.Adapt<List<DishNoMealsDto>>();
        }

        /// <summary>
        /// Get a dish by id
        /// </summary>
        /// <param name="dishId"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Delete dish by id
        /// </summary>
        /// <param name="dishId"></param>
        /// <returns></returns>
        [HttpDelete("{dishId}")]
        public async Task<IActionResult> DeleteDish(long dishId)
        {

            var dbDish = await _context.Dishes.FindAsync(dishId);

            if (dbDish == null) { return NotFound($"Could not find dish with id {dishId}"); }

            _context.Dishes.Remove(dbDish);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

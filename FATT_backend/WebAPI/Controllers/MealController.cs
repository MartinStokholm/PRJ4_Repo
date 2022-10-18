using Microsoft.AspNetCore.Mvc;

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

    }
}

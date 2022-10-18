using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly DataContext _context;
        public WorkoutController(DataContext context)
        {
            _context = context;
        }
    }
}

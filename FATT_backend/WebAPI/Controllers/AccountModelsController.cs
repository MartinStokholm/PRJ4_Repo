using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountModelsController : ControllerBase
    {
        private readonly DataContext _context;

        public AccountModelsController(DataContext context)
        {
            _context = context;
        }
        
    }
}

using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Dto.Account;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;

        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult Post(AccountCreateTestDto newAccount)
        {
            _context.Accounts.Add(newAccount.Adapt<Account>());
            _context.SaveChanges();
            return Ok(newAccount);
        }

    }
}

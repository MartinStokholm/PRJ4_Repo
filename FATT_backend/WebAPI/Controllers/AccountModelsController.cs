using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

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

        // GET: api/AccountModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountModel>>> GetAccountModel()
        {
            return await _context.AccountModel.ToListAsync();
        }

        // GET: api/AccountModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AccountModel>> GetAccountModel(int id)
        {
            var accountModel = await _context.AccountModel.FindAsync(id);

            if (accountModel == null)
            {
                return NotFound();
            }

            return accountModel;
        }

        // PUT: api/AccountModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccountModel(int id, AccountModel accountModel)
        {
            if (id != accountModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(accountModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountModelExists(id))
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

        // POST: api/AccountModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AccountModel>> PostAccountModel(AccountModel accountModel)
        {
            _context.AccountModel.Add(accountModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccountModel", new { id = accountModel.Id }, accountModel);
        }

        // DELETE: api/AccountModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccountModel(int id)
        {
            var accountModel = await _context.AccountModel.FindAsync(id);
            if (accountModel == null)
            {
                return NotFound();
            }

            _context.AccountModel.Remove(accountModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountModelExists(int id)
        {
            return _context.AccountModel.Any(e => e.Id == id);
        }
    }
}

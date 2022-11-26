using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Dto.Account;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Services;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly  AccountServices _accountServices;
        public AccountController(IConfiguration configuration, DataContext context)
        {
            
            _context = context;
            _accountServices = new AccountServices(configuration);
        }

        
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<AccountGetDto>> Register(AccountDto request)
        {
            if (!_accountServices.IsVaildEmail(request.Email))
            {
                return BadRequest("Email is not valid");
            }

            if (await _context.Accounts.AnyAsync(x => x.Email == request.Email))
                return BadRequest("Email is already taken");
            _accountServices.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var account = new Account
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
            };
            //_context.Calender.Add(Calender);
            _context.Accounts.Add(account);

            await _context.SaveChangesAsync();

            return Accepted(request.Email);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<AccountGetLoginDto>> Login(AccountLoginDto request)
        {
           
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == request.Email);
            if (dbAccount == null)
            {
                return NotFound(request.Email);
            }

            if (!_accountServices.TryVerifyPasswordHash(request.Password, dbAccount.PasswordHash, dbAccount.PasswordSalt))
            {
                return BadRequest("Not a valid Password");
            }

            var token = _accountServices.CreateToken(dbAccount);
            var account = dbAccount.Adapt<AccountGetLoginDto>();
            account.Token = token;
            return Ok(account);
            
        }


        [HttpPut("ChangeEmail")]
        public async Task<ActionResult<string>> ChangeEmail(AccountChangeEmailDto request)
        {
            var dbAccount = await _context.Accounts.Where(x => x.Email == request.Email).FirstOrDefaultAsync();

            if (dbAccount == null)
            {
                return NotFound(request);
            }
        
            if (!_accountServices.TryVerifyPasswordHash(request.Password, dbAccount.PasswordHash, dbAccount.PasswordSalt))
            {
                return BadRequest("Not a valid Password");
            }

            dbAccount.Email = request.NewEmail;

            await _context.SaveChangesAsync();
            return Accepted(dbAccount);
        
            
        }

        [HttpPut("ChangePassword")]
        public async Task<ActionResult<string>> ChangePassword(AccountChangePasswordDto request)
        {
            
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == request.Email);
            if (dbAccount == null)
            {
                return NotFound(request.Email);
            }

            if (!_accountServices.TryVerifyPasswordHash(request.Password, dbAccount.PasswordHash, dbAccount.PasswordSalt))
            {
                return BadRequest("Wrong password");
            }

            _accountServices.CreatePasswordHash(request.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);

            dbAccount.PasswordHash = passwordHash;
            dbAccount.PasswordSalt = passwordSalt;

            dbAccount.Adapt(dbAccount);
            await _context.SaveChangesAsync();

            //string token = CreateToken(dbAccount);
            return Ok(_accountServices.CreateToken(dbAccount));
            

        }

        [HttpPut("{email}/Name/{name}")]
        public async Task<ActionResult<AccountGetDto>> UpdateAccountName(string email, string name)
        {
            var dbAccount = await _context.Accounts.Where(x => x.Email == email).FirstOrDefaultAsync();
            if (dbAccount == null) { return NotFound(email); }

            dbAccount.Name = name;
            await _context.SaveChangesAsync();

            return Accepted(dbAccount.Adapt<AccountGetDto>());
        }

        
        
        [HttpPut("{email}/Age/{age}")]
        public async Task<ActionResult<AccountGetDto>> UpdateAccountAge(string email, int age)
        {
            var dbAccount = await _context.Accounts.Where(x => x.Email == email).FirstOrDefaultAsync();
            if (dbAccount == null) { return NotFound(email); }

            dbAccount.Age = age;
            await _context.SaveChangesAsync();

            return Accepted(dbAccount.Adapt<AccountGetDto>());
        }

        
        
        [HttpPut("{email}/Gender/{gender}")]
        public async Task<ActionResult<AccountGetDto>> UpdateAccountGender(string email, string gender)
        {
            var dbAccount = await _context.Accounts.Where(x => x.Email == email).FirstOrDefaultAsync();

            if (dbAccount == null)
            {
                return NotFound(email);
            }

            dbAccount.Gender = gender;
            await _context.SaveChangesAsync();

            return Accepted(dbAccount.Adapt<AccountGetDto>());
        }

        [HttpPut("{email}/Weight/{weight}")]
        public async Task<ActionResult<AccountGetDto>> UpdateAccountWeight(string email, int weight)
        {
            var dbAccount = await _context.Accounts.Where(x => x.Email == email).FirstOrDefaultAsync();
            if (dbAccount == null)
            {
                return NotFound(email);
            }

            dbAccount.Weigth = weight;
            await _context.SaveChangesAsync();

            return Accepted(dbAccount.Adapt<AccountGetDto>());
        }

        [HttpDelete()]
        public async Task<ActionResult<string>> DeleteAccount(AccountDeleteDto request)
        {
            var dbAccount = await _context.Accounts.Where(x => x.Email == request.Email).FirstOrDefaultAsync();

            if (dbAccount == null)
            {
                return NotFound(request);
            }
            
            if (!_accountServices.TryVerifyPasswordHash(request.Password, dbAccount.PasswordHash, dbAccount.PasswordSalt))
            {
                return BadRequest("Can't delete account");
            }

            _context.Accounts.Remove(dbAccount);
            await _context.SaveChangesAsync();
            return Ok();
            
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<AccountGetDto>> GetAccountEmail(string email)
        {
           
            var dbAccount = await _context.Accounts.Where(x => x.Email == email).FirstOrDefaultAsync();
            if (dbAccount == null)
            {
                return NotFound();
            }
            return Ok(dbAccount.Adapt<AccountGetDto>());

            
        }


        [HttpGet("getAccount/{email}")]
        public async Task<ActionResult<AccountGetDto>> GetAccount(string email)
        {
            
                var dbAccount = await _context.Accounts.Where(x => x.Email == email).FirstOrDefaultAsync();
                if (dbAccount == null)
                {
                    return NotFound();
                }

                return Ok(dbAccount);


        }


        [HttpGet("{email}/calender")]
        public async Task<ActionResult<Calender>> GetAccountCalender(string email)
        {
            var dbAccount = await _context.Accounts
                .Include(a => a.Calender)
                    .ThenInclude(c => c.WorkoutDays)
                .Include(a => a.Calender)
                    .ThenInclude(c => c.MealDays)
                .FirstOrDefaultAsync(x => x.Email == email);

            if (dbAccount == null)
            {
                return NotFound($"could not find account with email {email}");
            }
            return Ok(dbAccount.Calender);

        }

    }

}

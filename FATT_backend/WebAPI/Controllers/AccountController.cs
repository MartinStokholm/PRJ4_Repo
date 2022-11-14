using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Dto.Account;
using System.Security.Cryptography;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private static Account _account = new Account();
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public AccountController(IConfiguration configuration, DataContext context)
        {
            _configuration = configuration;
            _context = context;
        }
         
        [HttpPost("register")]
        public async Task<ActionResult> Register(AccountDto request)
        {

            if (await _context.Accounts.AnyAsync(x => x.Email == request.Email))
                return BadRequest("Email is already taken");
            
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            if (!VerifyEmail(request.Email))
            {
                return BadRequest("Email is not valid");
            }
            
            _account.Email = request.Email;
            _account.PasswordHash = passwordHash;
            _account.PasswordSalt = passwordSalt;
            _account.Name = request.Name;
            _account.Age = request.Age;
            _account.Weigth = request.Weigth;
            
            _context.Accounts.Add(_account.Adapt<Account>());

            await _context.SaveChangesAsync();

            return Ok(_account);
        }


        [HttpPost("login")]
        public async Task<ActionResult<Account>> Login(AccountLoginDto request)
        {
            try
            {
                var found =  await _context.Accounts.Where(x => x.Email == request.Email).ToListAsync();

                if(!VerifyPasswordHash(request.Password, found[0].PasswordHash, found[0].PasswordSalt))
                {
                    return BadRequest("Not a valid Password");
                }
   
            
                string token = CreateToken(found[0]);
                return Ok(token);
            }
            catch (Exception e)
            {
                return BadRequest("Not a valid login");
            }
           

        }

        
        [HttpPut("ChangeEmail")]
        public async Task<ActionResult<string>> ChangeEmail(AccountChangeEmailDto request)
        {
            try 
            {
                var found =  await _context.Accounts.Where(x => x.Email == request.Email).ToListAsync();
            
            
            
                if(!VerifyPasswordHash(request.Password, found[0].PasswordHash, found[0].PasswordSalt))
                {
                    return BadRequest("Not a valid Password");
                }

                found[0].Email = request.NewEmail;

                found.Adapt(found[0]);
                await _context.SaveChangesAsync();
                return Ok(found);
            }
            catch (Exception e)
            {
                return BadRequest("Not a valid login");
            }
            
        }

        [HttpPut("ChangePassword")]
        public async Task<ActionResult<string>> ChangePassword(AccountChangePasswordDto request)
        {
            try
            {
                var found =  await _context.Accounts.Where(x => x.Email == request.Email).ToListAsync();
            
      
            
                if (!VerifyPasswordHash(request.Password, found[0].PasswordHash, found[0].PasswordSalt))
                {
                    return BadRequest("Wrong password");
                }
            
                CreatePasswordHash(request.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);

                found[0].PasswordHash = passwordHash;
                found[0].PasswordSalt = passwordSalt;

                found.Adapt(found[0]);
                await _context.SaveChangesAsync();
            
                string token = CreateToken(_account);
                return Ok(token); 
            }
            catch (Exception e)
            {
                return BadRequest("Not a valid login");
            }
           
        }


        
        [HttpDelete("DeleteAccount/")]
        public async Task<ActionResult<string>> DeleteAccount(AccountDeleteDto request)
        {
            try
            {
                var found = await _context.Accounts.Where(x => x.Email == request.Email).ToListAsync();
            
            
                if (!VerifyPasswordHash(request.Password, found[0].PasswordHash, found[0].PasswordSalt))
                {
                    return BadRequest("Not a valid login");
                }
            
                _context.Accounts.Remove(found[0]);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest("Not a valid login");
            }
            
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(string id)
        {
            try
            {
                var found =  await _context.Accounts.Where(x => x.Email == id).ToListAsync();
                
                return found[0];
            }
            catch (Exception e)
            {
                return BadRequest("Wrong Email");
            }

 
            
        }

        private string CreateToken(Account account)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, account.Name),
                new Claim(ClaimTypes.Role, "Admin")

            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);  
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            
            return jwt;
        }
        
        private static bool VerifyEmail(string email)
        {
            try
            {
                MailAddress m = new MailAddress(email);
                return true;
            }
            catch (FormatException)
            {
                return false;
            }
            
        }
        private static void CreatePasswordHash(string password, out byte [] passwordHash, out byte [] passwordSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        
        }

        private static bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
    
}

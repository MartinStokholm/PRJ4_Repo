using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Dto.Account;
using System.Security.Cryptography;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public static Account account = new Account();
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public AccountController(IConfiguration configuration, DataContext context)
        {
            _configuration = configuration;
            _context = context;
        }
         
        [HttpPost("register")]
        public async Task<ActionResult<Account>> Register(AccountDto request)
        {
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            
            account.Username = request.Username;
            account.PasswordHash = passwordHash;
            account.PasswordSalt = passwordSalt;

            return Ok(account);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(AccountDto request)
        {
            if(account.Username != request.Username)
            {
                return NotFound("User not found");
            }

            if(!VerifyPasswordHash(request.Password, account.PasswordHash, account.PasswordSalt))
            {
                return BadRequest("Wrong password");
            }
            
            string token = CreateToken(account);
            return Ok(token);

        }

        private string CreateToken(Account account)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, account.Username),
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
        private void CreatePasswordHash(string password, out byte [] passwordHash, out byte [] passwordSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(account.PasswordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }

    
    

   
}

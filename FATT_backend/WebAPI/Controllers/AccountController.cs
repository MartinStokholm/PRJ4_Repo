﻿using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Dto.Account;
using System.Security.Cryptography;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using Mapster;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public AccountController(IConfiguration configuration, DataContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<Account>> Register(AccountDto request)
        {
            if (!IsVaildEmail(request.Email))
            {
                return BadRequest("Email is not valid");
            }

            if (await _context.Accounts.AnyAsync(x => x.Email == request.Email))
                return BadRequest("Email is already taken");

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var account = new Account
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Age = 0,
                Weigth = 0,
                Gender = ""
            };
            //_context.Calender.Add(Calender);
            _context.Accounts.Add(account);

            var id = await _context.SaveChangesAsync();

            return Accepted(account);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(AccountLoginDto request)
        {
            try
            {
                var dbAcccount = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == request.Email);
                if (dbAcccount == null)
                {
                    return NotFound(request.Email);
                }

                if (!TryVerifyPasswordHash(request.Password, dbAcccount.PasswordHash, dbAcccount.PasswordSalt))
                {
                    return BadRequest("Not a valid Password");
                }

                return Ok(CreateToken(dbAcccount));
            }
            catch (Exception)
            {
                return BadRequest("Not a valid login");
            }
        }


        [HttpPut("ChangeEmail")]
        public async Task<ActionResult<string>> ChangeEmail(AccountChangeEmailDto request)
        {
            var dbAccount = await _context.Accounts.Where(x => x.Email == request.Email).FirstOrDefaultAsync();
            try
            {
                if (!TryVerifyPasswordHash(request.Password, dbAccount.PasswordHash, dbAccount.PasswordSalt))
                {
                    return BadRequest("Not a valid Password");
                }

                dbAccount.Email = request.NewEmail;

                await _context.SaveChangesAsync();
                return Accepted(dbAccount);
            }
            catch (Exception)
            {
                return BadRequest("Not a valid login");
            }
        }

        [HttpPut("ChangePassword")]
        public async Task<ActionResult<string>> ChangePassword(AccountChangePasswordDto request)
        {
            try
            {
                var dbAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == request.Email);
                if (dbAccount == null)
                    return NotFound(request.Email);

                if (!TryVerifyPasswordHash(request.Password, dbAccount.PasswordHash, dbAccount.PasswordSalt))
                {
                    return BadRequest("Wrong password");
                }

                CreatePasswordHash(request.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);

                dbAccount.PasswordHash = passwordHash;
                dbAccount.PasswordSalt = passwordSalt;

                dbAccount.Adapt(dbAccount);
                await _context.SaveChangesAsync();

                //string token = CreateToken(dbAccount);
                return Ok(CreateToken(dbAccount));
            }
            catch (Exception)
            {
                return BadRequest("Error in changing password");
            }

        }

        //WIP 
        [HttpDelete("DeleteAccount/{id}")]
        public async Task<ActionResult<string>> DeleteAccount(AccountDeleteDto request)
        {
            var dbAccount = await _context.Accounts.Where(x => x.Email == request.Email).FirstOrDefaultAsync();

            try
            {

                if (!TryVerifyPasswordHash(request.Password, dbAccount.PasswordHash, dbAccount.PasswordSalt))
                {
                    return BadRequest("Can't delete account");
                }

                _context.Accounts.Remove(dbAccount);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Not a valid login");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(string id)
        {
            try
            {
                var dbAccount = await _context.Accounts.Where(x => x.Email == id).FirstOrDefaultAsync();
                return Ok(dbAccount);
            }
            catch (Exception)
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

        private static bool IsVaildEmail(string email)
        {
            try
            {
                _ = new MailAddress(email);
                return true;
            }
            catch (FormatException)
            {
                return false;
            }

        }
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

        }
        private static bool TryVerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }
    }

}

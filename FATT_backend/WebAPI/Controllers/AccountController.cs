using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Dto.Account;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Dto.Workout;
using System.Collections.Generic;
using WebAPI.Dto.Calender;
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

        /// <summary>
        /// A user can create an Account
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
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
            var defaultWorkout = new Workout
            {
                Name = "My first Workout",
                Duration = "1 Hour",
                AccountId = account.Id,
                Account = account,
            };
            var defaultMeal = new Meal
            {
                Name = "My first Meal",
                AccountId = account.Id,
                Account = account,
            };
            
            _context.Accounts.Add(account);
            _context.Workouts.Add(defaultWorkout);
            _context.Meals.Add(defaultMeal);

            await _context.SaveChangesAsync();

            return Accepted(request.Email);
        }

        /// <summary>
        /// User can login to their account given their email and password
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
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

        /// <summary>
        /// A user can change their email given their current email and password
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
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

        /// <summary>
        /// A user can change their password given their current email and password
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
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

        /// <summary>
        /// A user can change their name given their current email, name and password
        /// </summary>
        /// <param name="email"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpPut("{email}/Name/{name}")]
        public async Task<ActionResult<AccountGetDto>> UpdateAccountName(string email, string name)
        {
            var dbAccount = await _context.Accounts.Where(x => x.Email == email).FirstOrDefaultAsync();
            if (dbAccount == null) { return NotFound(email); }

            dbAccount.Name = name;
            await _context.SaveChangesAsync();

            return Accepted(dbAccount.Adapt<AccountGetDto>());
        }

        /// <summary>
        /// A user can change their age given their current email, age and password
        /// </summary>
        /// <param name="email"></param>
        /// <param name="age"></param>
        /// <returns></returns>
        [HttpPut("{email}/Age/{age}")]
        public async Task<ActionResult<AccountGetDto>> UpdateAccountAge(string email, int age)
        {
            var dbAccount = await _context.Accounts.Where(x => x.Email == email).FirstOrDefaultAsync();
            if (dbAccount == null) { return NotFound(email); }

            dbAccount.Age = age;
            await _context.SaveChangesAsync();

            return Accepted(dbAccount.Adapt<AccountGetDto>());
        }

        /// <summary>
        ///  A user can change their gender given their current email, gender and password
        /// </summary>
        /// <param name="email"></param>
        /// <param name="gender"></param>
        /// <returns></returns>
        [HttpPut("{email}/Gender/{gender}")]
        public async Task<ActionResult<AccountGetDto>> UpdateAccountGender(string email, string gender)
        {
            var dbAccount = await _context.Accounts.Where(x => x.Email == email).FirstOrDefaultAsync();
            if (dbAccount == null) { return NotFound(email); }

            dbAccount.Gender = gender;
            await _context.SaveChangesAsync();

            return Accepted(dbAccount.Adapt<AccountGetDto>());
        }

        /// <summary>
        /// A user can change their weight given their current email, weight and password
        /// </summary>
        /// <param name="email"></param>
        /// <param name="weight"></param>
        /// <returns></returns>
        [HttpPut("{email}/Weight/{weight}")]
        public async Task<ActionResult<AccountGetDto>> UpdateAccountWeight(string email, int weight)
        {
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == email);
            if (dbAccount == null) { return NotFound(email); }

            dbAccount.Weigth = weight;
            await _context.SaveChangesAsync();

            return Accepted(dbAccount.Adapt<AccountGetDto>());
        }

        /// <summary>
        /// A user can delete their account given their email and password
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<ActionResult<string>> DeleteAccount(AccountDeleteDto account)
        {
            var dbAccount = await _context.Accounts.Include(a => a.Calender).FirstOrDefaultAsync(x => x.Email == account.Email);
            if (dbAccount == null) { return NotFound(account.Email); }
            
            if (!_accountServices.TryVerifyPasswordHash(account.Password, dbAccount.PasswordHash, dbAccount.PasswordSalt))
            {
                return BadRequest("Can't delete account");
            }

            _context.Accounts.Remove(dbAccount);
            await _context.SaveChangesAsync();
            return Ok();
            
        }

        /// <summary>
        /// A user can get their account information given their email 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpGet("{email}")]
        public async Task<ActionResult<AccountGetDto>> GetAccountEmail(string email)
        {
            var dbAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == email);
            if (dbAccount == null) { return NotFound($"Could not find account with email {email}"); }
               
            return Ok(dbAccount.Adapt<AccountGetDto>());      
        }
        
        /// <summary>
        /// A user can get their personal calendar given their email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpGet("{email}/calender")]
        public async Task<ActionResult<CalenderGetDto>> GetAccountCalender(string email)
        {
            var dbWorkouts = await _context.Workouts.Where(x => x.Account.Email == email).ToListAsync();


            var dbAccount = await _context.Accounts
                .Include(a => a.Calender)
                    .ThenInclude(c => c.WorkoutDays )
                .Include(a => a.Calender)
                    .ThenInclude(c => c.MealDays)
                .FirstOrDefaultAsync(x => x.Email == email);

            if (dbAccount == null) { return NotFound($"could not find account with email {email}"); }

            // check if workout exists in calender and delete if not
            foreach (var workout in dbWorkouts)
            {
                if (!dbAccount.Calender.WorkoutDays.Any(x => x.WorkoutId == workout.Id))
                {
                    dbAccount.Calender.WorkoutDays.Remove(dbAccount.Calender.WorkoutDays.FirstOrDefault(x => x.WorkoutId == workout.Id));
                }
            }

            var result = dbAccount.Calender.Adapt<CalenderGetDto>();

            foreach (var workoutDay in dbAccount.Calender.WorkoutDays)
            {
                switch (workoutDay.Day)
                {
                    case "Monday":
                        result.WorkoutDays.Monday.Add(workoutDay.WorkoutId);
                        break;
                    case "Tuesday":
                        result.WorkoutDays.Tuesday.Add(workoutDay.WorkoutId);
                        break;
                    case "Wednesday":
                        result.WorkoutDays.Wednesday.Add(workoutDay.WorkoutId);
                        break;
                    case "Thursday":
                        result.WorkoutDays.Thursday.Add(workoutDay.WorkoutId);
                        break;
                    case "Friday":
                        result.WorkoutDays.Friday.Add(workoutDay.WorkoutId);
                        break;
                    case "Saturday":
                        result.WorkoutDays.Saturday.Add(workoutDay.WorkoutId);
                        break;
                    case "Sunday":
                        result.WorkoutDays.Sunday.Add(workoutDay.WorkoutId);
                        break;
                    default:
                        break;
                }
            }

            foreach (var mealDay in dbAccount.Calender.MealDays)
            {
                switch (mealDay.Day)
                {
                    case "Monday":
                        result.MealDays.Monday.Add(mealDay.MealId);
                        break;
                    case "Tuesday":
                        result.MealDays.Tuesday.Add(mealDay.MealId);
                        break;
                    case "Wednesday":
                        result.MealDays.Wednesday.Add(mealDay.MealId);
                        break;
                    case "Thursday":
                        result.MealDays.Thursday.Add(mealDay.MealId);
                        break;
                    case "Friday":
                        result.MealDays.Friday.Add(mealDay.MealId);
                        break;
                    case "Saturday":
                        result.MealDays.Saturday.Add(mealDay.MealId);
                        break;
                    case "Sunday":
                        result.MealDays.Sunday.Add(mealDay.MealId);
                        break;
                    default:
                        break;
                }
            }

            return Ok(result);

        }

    }

}

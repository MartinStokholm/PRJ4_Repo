using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Dto.Account;
using WebAPI.Dto.Workout;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalenderController : ControllerBase
    {
        private readonly DataContext _context;

        public CalenderController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{accountId}")]
        public async Task<ActionResult<Calender>> GetCalender(long accountId)
        {
            var dbAccountCalender = await _context.Calender.FindAsync(accountId);
           
            if (dbAccountCalender == null)
            {
                return NotFound("Could not find calender for account");
            }
            
            _context.Entry(dbAccountCalender).Collection(c => c.WorkoutDates).Load();
            
            return dbAccountCalender;
        }

        [HttpPut("{accountId}/AddWorkout/{workoutId}/{day}")]
        public async Task<ActionResult<CalenderDto>> AddWorkoutToCalender(long accountId, long workoutId, string day)
        {
            var dbCalender = await _context.Calender.FindAsync(accountId);
            if (dbCalender == null) { return NotFound("Could not find calender"); }

            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null) { return NotFound("Could not find workout"); }

            _context.Entry(dbWorkout)
                .Collection(w => w.Exercises)
                .Load();


            dbCalender.WorkoutDates.Add(new WorkoutOnDay
            {
                WorkoutId = dbWorkout.Id,
                Day = day
            });
            
            await _context.SaveChangesAsync();

            return Accepted(dbCalender.Adapt<CalenderDto>());
        }
       
    }
}

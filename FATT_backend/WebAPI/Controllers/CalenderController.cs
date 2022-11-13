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

        [HttpPost]
        public async Task<ActionResult<CalenderDto>> CreateTestCalender()
        {
            var newCalender = new Calender();
            _context.Calender.Add(newCalender);
            await _context.SaveChangesAsync();
            return Ok(newCalender.Adapt<CalenderDto>());
            
        }
        
        [HttpGet("{calenderId}")]
        public async Task<ActionResult<Calender>> GetCalender(long calenderId)
        {
            var dbCalender = await _context.Calender.FindAsync(calenderId);
           
            if (dbCalender == null)
            {
                return NotFound("Could not find calender");
            }
            
            _context.Entry(dbCalender).Collection(c => c.WorkoutDates).Load();
            
            return dbCalender;
        }

        [HttpPut("{calenderId}/AddWorkout/{workoutId}/{day}")]
        public async Task<ActionResult<CalenderDto>> AddWorkoutToCalender(long calenderId, long workoutId, string day)
        {
            var dbCalender = await _context.Calender.FindAsync(calenderId);
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

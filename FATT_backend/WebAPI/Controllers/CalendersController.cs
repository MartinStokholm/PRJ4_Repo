using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Dto.Workout;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendersController : ControllerBase
    {
        private readonly DataContext _context;

        public CalendersController(DataContext context)
        {
            _context = context;
        }

        [HttpPut("{calenderId}/AddWorkout/{workoutId}")]
        public async Task<ActionResult<WorkoutWithCalenderDateDto>> AddWorkoutToCalender(long calenderId, long workoutId)
        {
            var dbCalender = await _context.Calender.FindAsync(calenderId);
            if (dbCalender == null) { return NotFound("Could not find calender"); }

            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null) { return NotFound("Could not find workout"); }

            _context.Entry(dbWorkout)
                .Collection(w => w.Exercises)
                .Load();


            dbCalender.WorkoutPlan.Add(new WorkoutWithCalenderDateDto
            {
                Id = dbWorkout.Id,
                Date = new DateTime().Date
                
            });
            await _context.SaveChangesAsync();

            return Accepted(dbCalender);
        }
       
    }
}

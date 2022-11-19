﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class CalenderController : ControllerBase
    {
        private readonly DataContext _context;

        public CalenderController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Calender>> CreateTestCalender()
        {
            var newCalender = new Calender();
            _context.Calender.Add(newCalender);
            await _context.SaveChangesAsync();
            return Ok(newCalender);

        }

        [HttpGet("{calenderId}")]
        public async Task<ActionResult<Calender>> GetCalender(long calenderId)
        {
            var dbCalender = await _context.Calender
                 .Include(c => c.WorkoutDays)
                 .Include(c => c.MealDays)
                 .FirstOrDefaultAsync(x => x.Id == calenderId);

            if (dbCalender == null)
            {
                return NotFound("Could not find calender");
            }

            return dbCalender;
        }

        [HttpPut("{calenderId}/AddWorkout/{workoutId}/{day}")]
        public async Task<ActionResult<Calender>> AddWorkoutToCalender(long calenderId, long workoutId, string day)
        {
            var dbCalender = await _context.Calender.FindAsync(calenderId);
            if (dbCalender == null) { return NotFound("Could not find calender"); }

            var dbWorkout = await _context.Workouts.FindAsync(workoutId);
            if (dbWorkout == null) { return NotFound("Could not find workout"); }

            _context.Entry(dbWorkout)
                .Collection(w => w.Exercises)
                .Load();


            dbCalender.WorkoutDays.Add(new WorkoutOnDay
            {
                WorkoutId = dbWorkout.Id,
                Day = day
            });

            await _context.SaveChangesAsync();

            return Accepted(dbCalender.Adapt<Calender>());
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<Account> Accounts { get; set; } = default!;
    public DbSet<Workout> Workouts { get; set; } = default!;
    public DbSet<Exercise> Exercises { get; set; } = default!;
    public DbSet<Meal> Meals { get; set; } = default!;
    public DbSet<Dish> Dishes { get; set; } = default!;
    public DbSet<Calender> Calender { get; set; } = default!;

}


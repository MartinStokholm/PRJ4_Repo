using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<AccountModel> AccountModels { get; set; } = default!;
    public DbSet<Workout> Workouts { get; set; } = default!;
    public DbSet<Exercise> Exercises { get; set; } = default!;
    public DbSet<MealModel> MealModels { get; set; } = default!;
    public DbSet<DishModel> DishModels { get; set; } = default!;

}


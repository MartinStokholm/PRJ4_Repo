using WebAPI.Dto.Dish;
using WebAPI.Models;

namespace WebAPI.Dto.Meal;

public class MealDishNames
{
    public long Id { get; set; }
    public string Name { get; set; } = "";
    public string? Category { get; set; }
    public string? Description { get; set; }
    public double? NutritionalValue { get; set;}
    public List<MealSimple> Dishes { get; set; } = new();
}
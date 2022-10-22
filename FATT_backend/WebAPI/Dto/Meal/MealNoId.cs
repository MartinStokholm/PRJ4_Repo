using WebAPI.Models;

namespace WebAPI.Dto.Meal;

// Default POST (create) action dto
public class MealNoId
{
    public string Name { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public double NutritionalValue { get; set; }
    public List<DishModel> Dishes { get; set; } = new List<DishModel>();
}
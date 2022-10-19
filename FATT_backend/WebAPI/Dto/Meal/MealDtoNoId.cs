using WebAPI.Models;

namespace WebAPI.Dto.Meal;

public class MealDtoNoId
{
    public string Category { get; set; }
    public string Description { get; set; }
    public double NutritunalValue { get; set; }
    public List<DishModel> Dishes { get; set; } = new List<DishModel>();
}
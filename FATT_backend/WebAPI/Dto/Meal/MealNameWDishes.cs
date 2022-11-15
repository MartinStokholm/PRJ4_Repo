using WebAPI.Dto.Dish;

namespace WebAPI.Dto.Meal;

public class MealNameWDishes
{
    public long Id { get; set; }
    public string Name { get; set; } = "";
    public List<DishNoMealsDto> Dishes { get; set; } = new ();
}
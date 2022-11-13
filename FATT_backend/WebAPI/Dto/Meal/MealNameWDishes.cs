using WebAPI.Dto.Dish;

namespace WebAPI.Dto.Meal;

public class MealNameWDishes
{
    public long Id { get; set; }
    public string Name { get; set; } = "";
    public List<DishThumbnailDto> Dishes { get; set; } = new List<DishThumbnailDto>();
}
using WebAPI.Dto.Dish;
using WebAPI.Models;

namespace WebAPI.Dto.Meal
{
    public class MealCreateWithDishesIdsDto
    {
        public string Name { get; set; } = "";
        public List<long> DishesIds { get; set; } = new List<long>();
    }
}

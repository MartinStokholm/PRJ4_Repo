namespace WebAPI.Dto.Meal
{
    public class MealWithDishNameDto
    {
        public string Name { get; set; } = "";

        public List<string> DishNames { get; set; } = new List<string>();
    }
}

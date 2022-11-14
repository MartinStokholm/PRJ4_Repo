namespace WebAPI.Dto.Meal
{
    public class MealWithDishIdDto
    {
        public long Id { get; set; }
        public string Name { get; set; } = "";
        public string? Category { get; set; } = "";
        public string? Description { get; set; } = "";

        public List<long> DishIds { get; set; } = new List<long>();
    }
}

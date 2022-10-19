namespace WebAPI.Models
{
    public class MealModel
    {
        public long Id { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public double NutritionalValue { get; set; }
        public List<DishModel> Dishes { get; set; } = new List<DishModel>();
    }
}

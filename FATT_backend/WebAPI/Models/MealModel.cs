namespace WebAPI.Models
{
    public class MealModel
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public double NutritunalValue { get; set; }
        public List<DishModel> Dishes { get; set; } = new List<DishModel>();
    }
}

namespace WebAPI.Models
{
    public class Meal
    {
        public long Id { get; set; }
        public string Category { get; set; } = "";
        public string Description { get; set; } = "";
        public double NutritunalValue { get; set; }
        public List<Dish> Dishes { get; set; } = new List<Dish>();
    }
}

namespace WebAPI.Models
{
    public class MealModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        // What is meal category???
        public string? Category { get; set; }
        public string? Description { get; set; }

        // No set, get value from dishes
        public double NutritionalValue
        {
            get
            {
                double total = 0;
                foreach (var d in Dishes)
                {
                    if (d.NutritionalValue != null)
                    {
                        total +=(double)d.NutritionalValue;
                    }
                }
                return total;
            }
        }

        public List<DishModel> Dishes { get; set; } = new List<DishModel>();
    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Meal
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string? Category { get; set; } = "";
        public string? Description { get; set; } = "";

        [NotMapped]
        public double? NutritionalValue
        {
            get
            {
                double totalVal = 0;
                foreach (var d in Dishes)
                {
                    if (d.NutritionalValue != null)
                    {
                        totalVal += (double)d.NutritionalValue;
                    }
                }
                return totalVal;
            }
        }

        public List<Dish> Dishes { get; set; } = new List<Dish>();
    }
}

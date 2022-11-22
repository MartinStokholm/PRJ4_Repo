using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Meal
    {
        public long Id { get; set; }
        public string? Name { get; set; }

        public List<Dish> Dishes { get; set; } = new List<Dish>();
        public long? AccountId { get; set; }
        public Account Account { get; set; }

    }
}

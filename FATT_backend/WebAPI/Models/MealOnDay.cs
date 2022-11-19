namespace WebAPI.Models
{
    public class MealOnDay
    {
        public long Id { get; set; }
        
        public long MealId { get; set; }

        public string Day { get; set; } = "";
        
    }
}

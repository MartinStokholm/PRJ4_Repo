namespace WebAPI.Models
{
    public class WorkoutOnDay
    {
        public long Id { get; set; }
        
        public long WorkoutId { get; set; }

        public long MealId { get; set; }

        public string? Day { get; set; }
        
    }
}

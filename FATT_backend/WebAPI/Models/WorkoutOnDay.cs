namespace WebAPI.Models
{
    public class WorkoutOnDay
    {
        public long Id { get; set; }
        
        public long WorkoutId { get; set; }

        public string Day { get; set; } = "";

    }
}

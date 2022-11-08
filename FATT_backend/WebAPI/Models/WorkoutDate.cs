namespace WebAPI.Models
{
    public class WorkoutDate
    {
        public long Id { get; set; }
        
        public long WorkoutId { get; set; }

        public DateTime Date { get; set; } = new DateTime();
        
    }
}

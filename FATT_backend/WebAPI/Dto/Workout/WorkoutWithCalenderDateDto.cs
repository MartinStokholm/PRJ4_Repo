namespace WebAPI.Dto.Workout
{
    public class WorkoutWithCalenderDateDto
    {
        public long Id { get; set; }

        public long WorkoutId { get; set; }

        public DateTime Date { get; set; } = new DateTime();
    }
}

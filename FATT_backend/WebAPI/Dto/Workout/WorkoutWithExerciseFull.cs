using WebAPI.Dto.Exercise;

namespace WebAPI.Dto.Workout
{
    public class WorkoutWithExerciseFull
    {
        public long Id { get; set; }
        public string Name { get; set; } = "";
        public double DurationInMin { get; set; } = 0;
        public string Intensity { get; set; } = "";
        public virtual ICollection<ExerciseFull> Exercises { get; set; } = new HashSet<ExerciseFull>();
    }
}

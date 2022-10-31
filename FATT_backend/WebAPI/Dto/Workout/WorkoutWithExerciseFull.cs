using WebAPI.Dto.Exercise;

namespace WebAPI.Dto.Workout
{
    public class WorkoutWithExerciseFull
    {
        public long Id { get; set; }
        public string Name { get; set; } = "";
        public string Duration { get; set; } = "";
        public virtual ICollection<ExerciseCreateNoId> Exercises { get; set; } = new HashSet<ExerciseCreateNoId>();
    }
}

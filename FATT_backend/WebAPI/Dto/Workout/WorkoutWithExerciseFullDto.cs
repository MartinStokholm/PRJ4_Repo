using WebAPI.Dto.Exercise;

namespace WebAPI.Dto.Workout
{
    public class WorkoutWithExerciseFullDto
    {
        public long Id { get; set; }
        public string Name { get; set; } = "";
        public string Duration { get; set; } = "";
        public virtual ICollection<ExerciseNoWorkoutsDto> Exercises { get; set; } = new HashSet<ExerciseNoWorkoutsDto>();
    }
}

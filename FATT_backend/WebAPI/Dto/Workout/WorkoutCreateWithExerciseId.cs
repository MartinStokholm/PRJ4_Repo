using WebAPI.Dto.Exercise;
using WebAPI.Models;

namespace WebAPI.Dto.Workout
{
    public class WorkoutCreateWithExerciseId
    {
        public string Name { get; set; } = "";
        public string Duration { get; set; } = "";
        public List<long> ExerciseIds { get; set; } = new List<long>();
    }
}

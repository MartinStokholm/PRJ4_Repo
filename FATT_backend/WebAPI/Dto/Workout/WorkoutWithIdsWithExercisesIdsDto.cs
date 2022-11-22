using WebAPI.Dto.Exercise;
using WebAPI.Models;

namespace WebAPI.Dto.Workout
{
    public class WorkoutWithIdsWithExercisesIdsDto
    {
        public long Id { get; set; }
        public string Name { get; set; } = "";
        public string Duration { get; set; } = "";
        public List<long> ExercisesIds { get; set; } = new List<long>();
    }
}

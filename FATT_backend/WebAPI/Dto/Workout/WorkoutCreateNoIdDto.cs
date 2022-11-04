using WebAPI.Dto.Exercise;

namespace WebAPI.Dto.Workout
{
    public class WorkoutCreateNoIdDto
    {
        public string Name { get; set; } = "";
        public string Duration { get; set; } = "";
    }
}

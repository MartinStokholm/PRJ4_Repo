using WebAPI.Dto.Workout;

namespace WebAPI.Dto.Account
{
    public class AccountGetWithWorkoutsDto
    {
        public string AccountEmail { get; set; }
        public List<WorkoutWithExerciseFullDto> Workouts { get; set; } = new List<WorkoutWithExerciseFullDto>();
    }
}

namespace WebAPI.Dto.Workout
{
    public class WorkoutCreateWithExercisesIdsDto
    {
        public string Name { get; set; } = "";
        public string Duration { get; set; } = "";
        public List<long> ExercisesIds { get; set; } = new List<long>();
    }
}

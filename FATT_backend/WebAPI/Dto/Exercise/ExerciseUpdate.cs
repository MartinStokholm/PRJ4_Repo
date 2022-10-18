namespace WebAPI.Dto.Exercise
{
    public class ExerciseUpdate
    {
        public string Intensity { get; set; } = "low";
        public int Repetitions { get; set; }
        public int Sets { get; set; }
    }
}

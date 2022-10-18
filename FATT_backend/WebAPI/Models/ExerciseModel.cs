namespace WebAPI.Models
{
    public class ExerciseModel
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public double Duration { get; set; }
        public int Intensity { get; set; }
        public int Repetitions { get; set; }
        public int Sets { get; set; }
        
        // no clue what data type
        public int Picture { get; set; }
        public int Video { get; set; }

    }
}

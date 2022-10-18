namespace WebAPI.Models
{
    public class ExerciseModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Category { get; set; } = "";
        public double Duration { get; set; }
        public int Intensity { get; set; }
        public int Repetitions { get; set; }
        public int Sets { get; set; }
        public string PicturePath { get; set; } = "";
        public string VideoPath { get; set; } = "";

    }
}

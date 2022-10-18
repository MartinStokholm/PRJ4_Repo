using System.Reflection.Metadata.Ecma335;

namespace WebAPI.Models
{
    public class WorkoutModel
    {
        public long Id { get; set; }
        public double Duration { get; set; }
        public int Intensity { get; set; }
        List<ExerciseModel> Exercises { get; set; } = new List<ExerciseModel>();
    }
}

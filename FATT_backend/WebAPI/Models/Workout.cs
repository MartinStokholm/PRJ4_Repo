using System.Reflection.Metadata.Ecma335;

namespace WebAPI.Models
{
    public class Workout
    {
        public long Id { get; set; }
        public string Name { get; set; } = "";
        public double Duration { get; set; } = 0;
        public string Intensity { get; set; } = "";
        public virtual List<Exercise> Exercises { get; set; } = new List<Exercise>();
    }
}

using System.Reflection.Metadata.Ecma335;
using WebAPI.Dto.Exercise;

namespace WebAPI.Models
{
    public class Workout
    {
        public Workout()
        {
            this.Exercises = new HashSet<Exercise>();
        }
        public long Id { get; set; }
        public string Name { get; set; } = "";
        public double Duration { get; set; } = 0;
        public string Intensity { get; set; } = "";
        public virtual ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
    }
}

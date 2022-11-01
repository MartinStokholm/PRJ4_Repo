namespace WebAPI.Models
{
    public class Exercise
    {
        public Exercise()
        {
            this.Workouts = new HashSet<Workout>();
        }
        public long Id { get; set; }
        public string Name { get; set; } = "";
        public string Category { get; set; } = "";
        public string Intensity { get; set; } = "";
        public string Equipment { get; set; } = "";
        public string Repetitions { get; set; } = "";
        public string Sets { get; set; } = "";
        public string PicturePath { get; set; } = "";
        public string VideoPath { get; set; } = "";
        
        public virtual ICollection<Workout> Workouts { get; set; } = new List<Workout>();
    }
}

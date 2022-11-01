namespace WebAPI.Models
{
    public class Milestone
    {
        public long Id { get; set; }
        public string Category { get; set; } = "";
        public string Goal { get; set; } = "";
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}

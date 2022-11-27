namespace WebAPI.Dto.Calender
{
    public class MealPlan
    {
        public List<long> Monday { get; set; } = new List<long>();
        public List<long> Tuesday { get; set; } = new List<long>();
        public List<long> Wednesday { get; set; } = new List<long>();
        public List<long> Thursday { get; set; } = new List<long>();
        public List<long> Friday { get; set; } = new List<long>();
        public List<long> Saturday { get; set; } = new List<long>();
        public List<long> Sunday { get; set; } = new List<long>();
    }
}

using WebAPI.Dto.Meal;
using WebAPI.Dto.Workout;

namespace WebAPI.Models
{
    public class Calender
    {
        public long Id { get; set; }
        public long AccountId { get; set; }

        public List<WorkoutDate> WorkoutDates { get; set; } = new List<WorkoutDate>();


    }
}

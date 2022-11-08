using WebAPI.Dto.Meal;
using WebAPI.Dto.Workout;

namespace WebAPI.Models
{
    public class Calender
    {
        public long Id { get; set; }
       
        public List<WorkoutWithCalenderDateDto> WorkoutPlan { get; set; } = new List<WorkoutWithCalenderDateDto>();


    }
}

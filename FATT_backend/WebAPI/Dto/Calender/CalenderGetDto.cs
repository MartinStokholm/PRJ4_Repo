namespace WebAPI.Dto.Calender
{
    public class CalenderGetDto
    {
        public WorkoutPlan WorkoutDays { get; set; } = new WorkoutPlan();

        public MealPlan MealDays { get; set; } = new MealPlan();
    }
}

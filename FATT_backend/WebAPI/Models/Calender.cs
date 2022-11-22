using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata.Ecma335;
using WebAPI.Dto.Meal;
using WebAPI.Dto.Workout;

namespace WebAPI.Models
{
    public class Calender
    {
        public long Id { get; set; }

        public virtual ICollection<WorkoutOnDay> WorkoutDays { get; set; } = new List<WorkoutOnDay>();
        public virtual ICollection<MealOnDay> MealDays { get; set; } = new List<MealOnDay>();


    }
}

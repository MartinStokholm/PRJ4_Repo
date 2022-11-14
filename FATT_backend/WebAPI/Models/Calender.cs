using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata.Ecma335;
using WebAPI.Dto.Meal;
using WebAPI.Dto.Workout;

namespace WebAPI.Models
{
    public class Calender
    {
        public long Id { get; set; }

        public virtual ICollection<WorkoutOnDay> WorkoutDates { get; set; } = new List<WorkoutOnDay>();
        
    }
}

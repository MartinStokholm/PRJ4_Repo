using WebAPI.Models;

namespace WebAPI.Dto.Account
{
    public class CalenderDto
    {
        public long Id { get; set; }

        public virtual ICollection<WorkoutOnDayNoIdDto> WorkoutDates { get; set; } = new List<WorkoutOnDayNoIdDto>();
    }
}

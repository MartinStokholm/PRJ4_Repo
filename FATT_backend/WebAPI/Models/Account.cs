using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Account
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public double Weigth { get; set; }
        public string? Gender { get; set; }
        public int Age { get; set; }
        public string Email { get; set; } 
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt {get; set; } = Array.Empty<byte>();
        public Calender Calender { get; set; } = new Calender();
        public long CalenderId { get; set; }

        public virtual ICollection<Workout> Workouts { get; set; } = new List<Workout>();
        public virtual ICollection<Meal> Meals { get; set; } = new List<Meal>();


    }
}

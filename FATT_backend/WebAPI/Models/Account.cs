using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Account
    {
        public Account()
        {
            Calender = new Calender{ Id = Id };
        }
        public long Id { get; set; }
        public string Name { get; set; } = "";
        public double Weigth { get; set; }
        public string Gender { get; set; } = "";
        public int Age { get; set; }
        public string PasswordHash { get; set; } = "";
        public string Email { get; set; } = "";
        
        [ForeignKey("Id")]
        public long CalenderId { get; set; }
        public Calender Calender { get; set; } 
    }
}

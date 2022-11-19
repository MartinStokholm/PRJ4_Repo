using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace WebAPI.Models
{
    public class Account
    {
        //public Account()
        //{
        //    CalenderId = Calender.Id;
        //}

        public long Id { get; set; }
        public string Name { get; set; }
        public double? Weigth { get; set; }
        public string? Gender { get; set; }
        public int? Age { get; set; }
        public string Email { get; set; } //init instead of set
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();

        public Calender Calender { get; set; } = new Calender();
        public long CalenderId { get; set; }

    }
}

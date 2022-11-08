namespace WebAPI.Models
{
    public class Account
    {
        public Account()
        {
            Calender = new Calender{ AccountId = this.Id };
        }
        public long Id { get; set; }
        public string Name { get; set; } = "";
        public double Weigth { get; set; }
        public string Gender { get; set; } = "";
        public int Age { get; set; }
        public string Email { get; set; } = "";
        public string PasswordHash { get; set; } = "";
        public string EmailAdress { get; set; } = "";
        public long CalenderId { get; set; }
        public Calender Calender { get; set; } 
    }
}

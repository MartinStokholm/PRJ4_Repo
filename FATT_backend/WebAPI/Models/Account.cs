namespace WebAPI.Models
{
    public class Account
    {
        public long Id { get; set; }
        public string Name { get; set; } = "";
        public double Weigth { get; set; }
        public string Gender { get; set; } = "";
        public int Age { get; set; }
        public string Email { get; set; } = "";
        public string PasswordHash { get; set; } = "";
        public string EmailAdress { get; set; } = "";
    }
}

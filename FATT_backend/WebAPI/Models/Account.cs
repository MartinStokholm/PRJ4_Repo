namespace WebAPI.Models
{
    public class Account
    {
        
        public long Id { get; set; }
        public double Weigth { get; set; }
        public string Gender { get; set; } = "";
        public int Age { get; set; }
        public string Email { get; set; } = "";
        public byte[] PasswordHash { get; set; } = new byte[0];
        public byte[] PasswordSalt {get; set; } = new byte[0];
        
        public string Name { get; set; } = "";
        
        
    }
}

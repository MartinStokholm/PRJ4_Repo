namespace WebAPI.Dto.Account
{
    public class AccountDto
    {
        public string Name { get; set; } = string.Empty;

        public double Weight { get; set; } = 0;
        
        public int Age { get; set; } = 0;
        public string Email { get; set; } = string.Empty;
        
        public string Password {get; set; } = string.Empty;
        
    }

}
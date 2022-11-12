namespace WebAPI.Dto.Account
{
    public class AccountDto
    {
        public string Name { get; set; } = string.Empty;
        
        public float Weigth { get; set; }
        public int Age { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Username {get; set; } = string.Empty;
        
        public string Password {get; set; } = string.Empty;
        
    }

}
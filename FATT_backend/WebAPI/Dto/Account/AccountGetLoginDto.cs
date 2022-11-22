namespace WebAPI.Dto.Account
{
    public class AccountGetLoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string? Name { get; set; }
        public string Token { get; set; }
    }
}

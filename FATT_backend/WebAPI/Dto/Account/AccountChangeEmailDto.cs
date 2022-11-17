namespace WebAPI.Dto.Account;

public class AccountChangeEmailDto
{
    public string Email { get; set; } = string.Empty;

    public string NewEmail { get; set; } = string.Empty;
    
    public string Password { get; set; } = string.Empty;

}
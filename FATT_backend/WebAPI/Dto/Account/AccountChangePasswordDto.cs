namespace WebAPI.Dto.Account;

public class AccountChangePasswordDto
{
    public string Email { get; set; } = string.Empty;
    public string Password {get; set; } = string.Empty;

    public string NewPassword { get; set; } = string.Empty;
}
namespace WebAPI.Dto.Account;

public class AccountChangePasswordDto
{
    public string Password {get; set; } = string.Empty;

    public string NewPassword { get; set; } = string.Empty;
}
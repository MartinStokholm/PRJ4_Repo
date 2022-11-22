namespace WebAPI.Dto.Account;

public class AccountGetDto
{
    public string Email {get; set; } = string.Empty;
    public string? Name { get; set; }
    public double Weigth { get; set; }
    public string? Gender { get; set; }
    public int Age { get; set; }

}
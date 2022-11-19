namespace WebAPI.Dto.Account
{
    public class AccountDto
    {
        //private AccountDto(string name, string email, string password, float? weigth = null, int? age = null)
        //{
        //    Name = name;
        //    Weigth = weigth;
        //    Age = age;
        //    Email = email;
        //    Password = password;
        //}

        //public static AccountDto CreateInstance(string name, string email, string password, float? weigth = null, int? age = null)
        //{
        //    return new AccountDto(name, email, password, weigth, age);
        //}

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

    }

}
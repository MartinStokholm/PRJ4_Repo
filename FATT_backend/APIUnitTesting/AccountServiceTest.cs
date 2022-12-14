using System.Configuration;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Models;
using WebAPI.Services;

namespace APIUnitTesting;

public class AccountServiceTest
{
    private AccountServices _service;

    [SetUp]
    public void Setup()
    {
        var myConfiguration = new Dictionary<string, string>
        {
            {"AppSettings:Token", "my top secret key"},
        };

        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(myConfiguration)
            .Build();
        _service = new AccountServices(configuration);
    }

    [Test]
    public void CreatePasswordHash_HashAndSalt_NotNull()
    {
        string Password = "test";
        _service.CreatePasswordHash(Password, out byte[] passwordHash, out byte[] passwordSalt);
        Assert.AreNotEqual(passwordHash, null);
        Assert.AreNotEqual(passwordSalt, null);
    }

    [Test]
    public void IsVaildEmail_InputHasAtSign_ReturnsTrue()
    {
        // Arrange
        string email = "a@d";
        // Act
        bool verify = _service.IsVaildEmail(email);
        // Assert
        Assert.IsTrue(verify);
    }

    [Test]
    public void IsVaildEmail_WrongEmail_ReturnsFalse()
    {
        // Arrange
        string email = "test";
        // Act
        bool result = _service.IsVaildEmail(email);
        // Assert
        Assert.IsFalse(result);
    }

    [Test]
    public void TryVerifyPass_SamePass_ReturnsTrue()
    {
        string pass = "test";
        _service.CreatePasswordHash(pass, out byte[] passwordHash, out byte[] passwordSalt);
        bool result = _service.TryVerifyPasswordHash(pass, passwordHash, passwordSalt);
        Assert.IsTrue(result);
    }

    [Test]
    public void TryVerifyPass_WrongPass_ReturnsFalse()
    {
        string pass = "test";
        _service.CreatePasswordHash(pass, out byte[] passwordHash, out byte[] passwordSalt);
        bool result = _service.TryVerifyPasswordHash("test2", passwordHash, passwordSalt);
        Assert.IsFalse(result);
    }

    [Test]
    public void CreateToken_ReturnsNonEmptyString()
    {
        string pass = "test";
        _service.CreatePasswordHash(pass, out byte[] passwordHash, out byte[] passwordSalt);
        var account = new Account
        {
            Name = "Frederick Douglass",
            Email = "mail@dk",
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
        };
        string token = _service.CreateToken(account);

        Assert.IsFalse(token.IsNullOrEmpty());
    }
}
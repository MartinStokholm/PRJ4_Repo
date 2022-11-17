using Microsoft.Build.Evaluation;
using Microsoft.Extensions.Configuration;
using WebAPI.Controllers;
using WebAPI.Dto.Account;
using WebAPI.Models;

namespace APIUnitTesting.ControllerTests;

using Tools = TestUtils.TestUtils;
/// <summary>
/// This class contains unit tests for the AccountController
/// I can't test database calls, so I'm testing the logic of the controller
/// Because you don't use the database
/// </summary>
public class AccountCtrlTests
{
    private DataContext _context;
    // uut
    private AccountController _controller;
    private List<long> _dataId = new();
    [SetUp]
    public void Setup()
    {
        IConfiguration config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();
        _context = Tools.TestContextSetup();
        _controller = new AccountController(config, _context);
    }

    [TearDown]
    public void TearDown()
    {

        foreach (var i in _dataId)
        {
            try
            {
                _context.Accounts.Remove(_context.Accounts.FirstOrDefault(e => e.Id == i));
                _context.SaveChanges();
            }
            catch
            {
                continue;
            }
        }
        _dataId.Clear();
    }
    
    [Test]
    public void Register_ReturnsStatus202()
    {
        //Arrange
        var a = new AccountDto() { Email = "Test@mail.com", Username = "TestName", Password = "TestPass" };
        //Act
        var result = new Tools.TestCallResult<Account>(_controller.Register(a));
        //_dataId.Add((long)result.Id);

        //Assert
        Assert.AreEqual(202, result.StatusCode);
    }

    [Test]
    public void Register_IncorrectEmail_ReturnsStatus400()
    {
        //Arrange
        var a = new AccountDto() { Email = "TestMail", Username = "TestName", Password = "TestPassword" };
        //Act
        var result = new Tools.TestCallResult<Account>(_controller.Register(a));
        if (result.Id != null)
            _dataId.Add((long)result.Id);

        //Assert
        Assert.AreEqual(400, result.StatusCode);
    }

    [Test]
    public void Register_ThenLogin_ReturnsStatus202()
    {
        var a = new AccountDto() { Email = "Test@mail.com", Username = "TestName", Password = "TestPass" };
        //Act
       _controller.Register(a);
        AccountLoginDto login = new AccountLoginDto() { Email = "Test@mail.com", Password = "TestPass" };
        var result = new Tools.TestCallResult<string>(_controller.Login(login));
        //Assert
        Assert.AreEqual(202, result.StatusCode);
    }

    [Test]
    public void Register_ThenLogin_ReturnsTokenstring()
    {
        var a = new AccountDto() { Email = "Test@mail.com", Username = "TestName", Password = "TestPass" };
        //Act
        _controller.Register(a);
        AccountLoginDto login = new AccountLoginDto() { Email = "Test@mail.com", Password = "TestPass" };
        var result = _controller.Login(login);
        //Assert
        Assert.IsTrue(result.Value != null);
        Assert.IsTrue(result.Value.GetType() == typeof(string));
    }
}
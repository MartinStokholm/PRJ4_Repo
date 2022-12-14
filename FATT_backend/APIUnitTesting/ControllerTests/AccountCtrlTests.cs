using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Evaluation;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Controllers;
using WebAPI.Dto.Account;
using WebAPI.Dto.Calender;
using WebAPI.Models;
using WebAPI.Services;

namespace APIUnitTesting.ControllerTests;

using Tools = TestUtils.TestUtils;

public class AccountCtrlTests
{
    private DataContext _context;

    // uut
    private AccountController _controller;
    private List<long> _dataId = new();

    [SetUp]
    public void Setup()
    {
        var myConfiguration = new Dictionary<string, string>
        {
            { "AppSettings:Token", "my top secret key" },
        };

        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(myConfiguration)
            .Build();
        _context = Tools.TestContextSetup();
        _controller = new AccountController(configuration, _context);
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
    public async Task Register_WithEmail_Status202()
    {
        AccountDto data = new AccountDto()
        {
            Email = "test@m.dk"
        };
        var result = new Tools.TestCallResult<AccountGetDto>(await _controller.Register(data));

        var id = _context.Accounts.FirstOrDefault(x => x.Email == data.Email).Id;
        _dataId.Add(id);
        Assert.AreEqual(202, result.StatusCode);
    }

    [Test]
    public async Task Register_WithoutEmail_Status400()
    {

        AccountDto data = new AccountDto()
        {
            Email = "test"
        };
        var result = new Tools.TestCallResult<AccountGetDto>(await _controller.Register(data));

        var acc = _context.Accounts.FirstOrDefault(x => x.Email == data.Email);
        if (acc != null)
        {
            _dataId.Add(acc.Id);
        }
        Assert.AreEqual(400, result.StatusCode);
    }

    
    [Test]
    public async Task Login_AccountExists_ResponseContainsToken()
    {

        AccountDto data = new AccountDto()
        {
            Email = "test@mail.dk",
            Password = "test"
        };
        var result = new Tools.TestCallResult<AccountGetDto>(await _controller.Register(data));

        var acc = _context.Accounts.FirstOrDefault(x => x.Email == data.Email);
        if (acc != null)
        {
            _dataId.Add(acc.Id);
        }

        AccountLoginDto loginData = new AccountLoginDto()
        {
            Email = data.Email,
            Password = data.Password,
        };

        var res2 = new Tools.TestCallResult<AccountGetLoginDto>(await _controller.Login(loginData));
        
        Assert.IsFalse(res2.Value.Token.IsNullOrEmpty());
    }

    [Test]
    public async Task GetCalender_ReturnsCalender()
    {
        AccountDto data = new AccountDto()
        {
            Email = "test@mail.dk",
            Password = "test"
        };
        var result = new Tools.TestCallResult<AccountGetDto>(await _controller.Register(data));

        var acc = _context.Accounts.FirstOrDefault(x => x.Email == data.Email);
        if (acc != null)
        {
            _dataId.Add(acc.Id);
        }

        var res = new Tools.TestCallResult<CalenderGetDto>(await _controller.GetAccountCalender(data.Email));
        Assert.AreEqual(typeof(CalenderGetDto), res.Value.GetType());
        Assert.IsFalse(res.Value == null);
    }
}
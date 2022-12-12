using Microsoft.Build.Evaluation;
using Microsoft.Extensions.Configuration;
using WebAPI.Controllers;
using WebAPI.Dto.Account;
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


}
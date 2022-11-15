using WebAPI.Controllers;

namespace APIUnitTesting.ControllerTests;

using Tools = TestUtils.TestUtils;
public class WorkoutCtrlUnitTests
{
    private DataContext _context;
    // uut
    private WorkoutController _controller;
    private List<long> _dataId = new();
    [SetUp]
    public void Setup()
    {
        _context = Tools.TestContextSetup();
        _controller = new WorkoutController(_context);
    }

    [TearDown]
    public void TearDown()
    {

        foreach (var i in _dataId)
        {
            _context.Workouts.Remove(_context.Workouts.FirstOrDefault(e => e.Id == i));
            _context.SaveChanges();
        }
        _dataId.Clear();
    }

    
}
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Evaluation;
using WebAPI.Controllers;
using WebAPI.Dto.Exercise;
using WebAPI.Models;

namespace APIUnitTesting.ControllerTests;

using Tools = TestUtils.TestUtils;
public class ExerciseCtrlUnitTests
{
    private DataContext _context;
    // uut
    private ExerciseController _controller;
    private List<long> _dataId = new();
    [SetUp]
    public void Setup()
    {
        _context = Tools.TestContextSetup();
        _controller = new ExerciseController(_context);
    }

    [TearDown]
    public void TearDown()
    {
      
        foreach (var i in _dataId)
        {
            _context.Exercises.Remove(_context.Exercises.FirstOrDefault(e => e.Id == i));
            _context.SaveChanges();
        }
        _dataId.Clear();
    }

    [Test]
    public async Task GetExById_ReturnsStatus200()
    {
        //Arrange
        var e = new Exercise { Name = "TestExercise" };
        _context.Exercises.Add(e);
        _context.SaveChanges();
        _dataId.Add(e.Id);
        //Act
        var result = await _controller.GetExerciseById(e.Id);
        //Assert
        Assert.AreEqual(200, (result.Result as ObjectResult).StatusCode);
    }

    [Test]
    public async Task PostExercise_ReturnsStatus202()
    {
        //Arrange
        var e = new ExerciseNoIdNoWorkoutsDto() { Name = "TestExercise" };
        //Act
        var result = new Tools.TestCallResult<ExerciseCreateNoIdDto>(await _controller.PostExercise(e));
        var exDb = _context.Exercises.FirstOrDefault(x => x.Name == e.Name);
        _dataId.Add((long)exDb.Id);
        
        //Assert
        Assert.AreEqual(202, result.StatusCode);
    }

    
    [Test]
    public async Task Post_AddsExerciseCorrectly()
    {
        var e = new ExerciseNoIdNoWorkoutsDto() { Name = "TestExercise" };
        var result = new Tools.TestCallResult<ExerciseCreateNoIdDto>(await _controller.PostExercise(e));
        var ex = _context.Exercises.First();
        _dataId.Add(ex.Id);
        var check = e.Adapt<Exercise>();
        Assert.IsTrue(Tools.CompareProperties(ex, check, "Workouts", "Id"));
    }

    [Test]
    public async Task Post_DuplicateReturns409()
    {
        // Arrange
        var e = new ExerciseNoIdNoWorkoutsDto() { Name = "TestExercise" };
        var result1 = new Tools.TestCallResult<ExerciseCreateNoIdDto>(await _controller.PostExercise(e));
        // For cleanup
        var exFromDb = _context.Exercises.First(x => x.Name == e.Name);
        _dataId.Add((long)exFromDb.Id);
        // Act
        var result2 = new Tools.TestCallResult<ExerciseCreateNoIdDto>(await _controller.PostExercise(e));
        if (result2.Id != null)
        {
            _dataId.Add((long)result2.Id);
        }
        // Assert
        Assert.AreEqual(result2.StatusCode, 409);
    }
}
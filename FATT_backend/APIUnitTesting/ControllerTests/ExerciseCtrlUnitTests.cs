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
        var e = new ExerciseFullDto() { Name = "TestExercise" };
        //Act
        var result = new Tools.TestCallResult<ExerciseSimpleDto>(await _controller.PostExercise(e));
        _dataId.Add((long)result.Id);
        
        //Assert
        Assert.AreEqual(202, result.StatusCode);
    }

    [Test]
    public async Task PutExercise_ReturnsStatus202()
    {
        //Arrange
        var e = new ExerciseFullDto() { Name = "TestExercise" };
        var result = new Tools.TestCallResult<ExerciseSimpleDto>(await _controller.PostExercise(e));
        _dataId.Add((long)result.Id);
        //Act
        var exUpdate = new ExerciseUpdateDto() { Intensity = "Intensee"};
        var result2 = new Tools.TestCallResult<Exercise>(await _controller.PutExercise((long)result.Id, exUpdate));
        var updatedEx = result2.Value;
        //Assert
        Assert.AreEqual(202, result2.StatusCode);
    }

    [Test]
    public async Task Post_AddsExerciseCorrectly()
    {
        var e = new ExerciseFullDto() { Name = "TestExercise" };
        var result = new Tools.TestCallResult<ExerciseSimpleDto>(await _controller.PostExercise(e));
        _dataId.Add((long)result.Id);
        var check = e.Adapt<Exercise>();
        check.Id = (long)result.Id;
        var exFromDb = _context.Exercises.FirstOrDefault(ex => ex.Id == check.Id);
        Assert.IsTrue(Tools.CompareProperties(exFromDb, check, "Workouts"));
    }

    [Test]
    public async Task Post_DuplicateReturns409()
    {
        var e = new ExerciseFullDto() { Name = "TestExercise" };
        var result1 = new Tools.TestCallResult<ExerciseSimpleDto>(await _controller.PostExercise(e));
        _dataId.Add((long)result1.Id);
        var result2 = new Tools.TestCallResult<ExerciseSimpleDto>(await _controller.PostExercise(e));
        if (result2.Id != null)
        {
            _dataId.Add((long)result2.Id);
        }
        Assert.AreEqual(result2.StatusCode, 409);
    }

    [Test]
    public async Task PutExercise_ChangesCorrectly()
    {
        //Arrange
        var e = new ExerciseFullDto() { Name = "TestExercise" };
        var result = new Tools.TestCallResult<ExerciseSimpleDto>(await _controller.PostExercise(e));
        _dataId.Add((long)result.Id);
        //Act
        var exUpdate = new ExerciseUpdateDto() { Intensity = "Intensee" };
        var result2 = new Tools.TestCallResult<Exercise>(await _controller.PutExercise((long)result.Id, exUpdate));
        var updatedEx = result2.Value;
        //Assert
        Assert.AreEqual(updatedEx.Intensity, exUpdate.Intensity);
    }
}
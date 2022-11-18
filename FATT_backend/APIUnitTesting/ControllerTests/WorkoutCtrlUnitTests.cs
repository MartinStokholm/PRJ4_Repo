using Microsoft.Build.Evaluation;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Controllers;
using WebAPI.Dto.Exercise;
using WebAPI.Dto.Workout;
using WebAPI.Models;

namespace APIUnitTesting.ControllerTests;

using Tools = TestUtils.TestUtils;
public class WorkoutCtrlUnitTests
{
    private DataContext _context;
    // uut
    private WorkoutController _controller;
    private Exercise _exercise;
    private Exercise _exercise2;
    private List<long> _dataId = new();
    private List<long> _exId = new();
    [SetUp]
    public void Setup()
    {
        _context = Tools.TestContextSetup();
        _controller = new WorkoutController(_context);
        _exercise = new Exercise()
        {
            Name = "TestExercise"
        };
        _exercise2 = new Exercise()
        {
            Name = "TestExercise2"
        };
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
        foreach (var i in _exId)
        {
            _context.Exercises.Remove(_context.Exercises.FirstOrDefault(e => e.Id == i));
            _context.SaveChanges();
        }
        _exId.Clear();
    }

    [Test]
    public async Task Get_ReturnsStatus200()
    {
        Workout w = new()
        {
            Name = "TestWorkout"
        };
        _context.Add(w);
        await _context.SaveChangesAsync();
        var res = new Tools.TestCallResult<WorkoutWithExerciseIdDto>(await _controller.GetWorkoutById(w.Id));
        _dataId.Add((long)res.Id);
        Assert.AreEqual(200, res.StatusCode);
    }
    [Test]
    public async Task Post_ReturnsStatus202()
    {
        WorkoutCreateNoIdDto w = new()
        {
            Name = "TestWorkout"
        };
        var res = new Tools.TestCallResult<Workout>(await _controller.PostWorkout(w));
        Assert.AreEqual(202, res.StatusCode);
    }

    [Test]
    public async Task Post_PopulatesDatabase()
    {
        WorkoutCreateNoIdDto w = new WorkoutCreateNoIdDto()
        {
            Name = "Test"
        };
        var res = new Tools.TestCallResult<Workout>(await _controller.PostWorkout(w));
        long id;
        if(res.Id != null)
        {
            id = (long)res.Id; 
            _dataId.Add(id);
            var workout = _context.Workouts.FirstOrDefault(work => work.Id == id);
            Assert.IsTrue(workout.Name == w.Name);
        }
        else
        {
            Assert.Fail("Failed to get posted Id");
        }
    }

    [Test]
    public async Task PutAddExercise_CorrectlyAdds()
    {
        _context.Exercises.Add(_exercise);
        _context.SaveChanges();
        _exId.Add(_exercise.Id);
        WorkoutCreateNoIdDto w = new() { Name = "Test" };
        var res = new Tools.TestCallResult<Workout>(await _controller.PostWorkout(w));
        if (res.Id != null)
        {
            long id = (long)res.Id;
            _dataId.Add(id);
            var addRes = new Tools.TestCallResult<WorkoutWithExerciseFullDto>(await _controller.AddExerciseToWorkout(id, _exercise.Id));
            Assert.AreNotEqual(null, addRes.Value);
            var newWorkout = addRes.Value as WorkoutWithExerciseFullDto;
            Assert.IsTrue(newWorkout.Exercises.Count > 0);
        }
        else
        {
            Assert.Fail("Post workout return value failed");
        }
    }

    [Test]
    public async Task PutRemoveExerciseSingle_ExerciseListEmpty()
    {
        _context.Exercises.Add(_exercise);
        _context.SaveChanges();
        _exId.Add(_exercise.Id);
        WorkoutCreateNoIdDto w = new() { Name = "Test" };
        var res = new Tools.TestCallResult<Workout>(await _controller.PostWorkout(w));
        Assert.AreNotEqual(null, res.Id);
        long id = (long)res.Id;
        _dataId.Add(id);
        var addRes = new Tools.TestCallResult<WorkoutWithExerciseFullDto>(
            await _controller.AddExerciseToWorkout(id, _exercise.Id));
        Assert.AreNotEqual(null, addRes.Value);
        var removeRes =
            new Tools.TestCallResult<WorkoutWithExerciseFullDto>(
                await _controller.RemoveExerciseFromWorkout(id, _exercise.Id));
        var workout = removeRes.Value as WorkoutWithExerciseFullDto;
        Assert.IsTrue(workout.Exercises.IsNullOrEmpty());

    }

    [Test]
    public async Task GetMultiple_ReturnsCorrectList()
    {
        _context.Exercises.Add(_exercise);
        _context.SaveChanges();
        _context.Exercises.Add(_exercise2);
        _context.SaveChanges();
        _exId.Add(_exercise.Id);
        _exId.Add(_exercise2.Id);
        
        WorkoutCreateNoIdDto w = new() { Name = "Test" };
        var res = new Tools.TestCallResult<Workout>(await _controller.PostWorkout(w));
        Assert.AreNotEqual(null, res.Id);
        
        long id = (long)res.Id;
        _dataId.Add(id);
        var addRes = new Tools.TestCallResult<WorkoutWithExerciseFullDto>(
            await _controller.AddExerciseToWorkout(id, _exercise.Id));
        Assert.AreNotEqual(null, addRes.Value);
        var addRes2 = new Tools.TestCallResult<WorkoutWithExerciseFullDto>(
            await _controller.AddExerciseToWorkout(id, _exercise2.Id));
        Assert.AreNotEqual(null, addRes.Value);

        var getResult =
            new Tools.TestCallResult<List<WorkoutWithExerciseFullDto>>(_controller.GetWorkoutsWithExercisesFull());
        Assert.AreNotEqual(null, getResult.Value);
        try
        {
            var l = getResult.Value as List<WorkoutWithExerciseFullDto>;
            Assert.AreNotEqual(null, l);
            Assert.IsTrue(l[0].Exercises.Count > 0);
        }
        catch
        {
            Assert.Fail("Failed converting result to List<type>");
        }
    }
}
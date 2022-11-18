using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Evaluation;
using Microsoft.CodeAnalysis.VisualBasic.Syntax;
using Microsoft.EntityFrameworkCore;
using WebAPI.Controllers;
using WebAPI.Dto.Dish;
using WebAPI.Dto.Meal;
using WebAPI.Models;

namespace APIUnitTesting.ControllerTests;
using Tools = TestUtils.TestUtils;
public class MealCtrlUnitTests
{
    // Test status codes and interaction between mealcontroller and dishcontroller (add, remove)
    private DataContext _context;

    private MealController _mealController;
    private DishController _dishController;
    private DishNoIdDto _correctDish;
    private DishNoMealsDto _dishToCheck;

    private List<long> _dataId = new();
    [SetUp]
    public async Task Setup()
    {
        _context = Tools.TestContextSetup();
        _mealController = new MealController(_context);
        _dishController = new DishController(_context);
        _correctDish = new DishNoIdDto()
        {
            Name = "TestDish",
        };
        var d = await _dishController.PostDishModel(_correctDish);
        var res = d.Result as ObjectResult;
        var dish = res.Value as DishNoMealsDto;
        _dataId.Add(dish.Id);
        _dishToCheck = _correctDish.Adapt<DishNoMealsDto>();
        _dishToCheck.Id = dish.Id;
    }

    [TearDown]
    public async Task TearDown()
    {
        foreach (var i in _dataId)
        {
            _dishController.DeleteDishModel(i);
        }
        var meals = await _context.Meals.ToListAsync();
        foreach (Meal m in meals)
        {
            _mealController.DeleteMeal(m.Id);
        }

        _dataId.Clear();
    }

    /*
     * Status code tests
     */

    [Test]
    public async Task Get_ReturnsStatus200()
    {
        //Arrange
        var m = new Meal { Name = "TestMeal" };
        _context.Meals.Add(m);
        _context.SaveChanges();
        // Act
        var result = (await _mealController.GetMeal(m.Id)).Result as ObjectResult;
        // Assert
        Assert.AreEqual(200, result.StatusCode);
    }

    [Test]
    public async Task Post_ReturnsStatus202()
    {
        // Arrange
        var meal = new MealSimple
        {
            Name = "TestMeal",
            Description = "TestDescription",
        };
        // Act
        var result = (await _mealController.PostMeal(meal)).Result;
        var statusCode = (result as ObjectResult).StatusCode;
        // Assert
        Assert.AreEqual(202, statusCode);
    }

    [Test]
    public async Task Put_ReturnsStatus202()
    {
        var meal = new MealSimple
        {
            Name = "TestMeal",
            Description = "TestDescription",
        };
        var post = await _mealController.PostMeal(meal);
        var m = (post.Result as ObjectResult).Value as MealNameWDishes;
        var meal2 = new MealSimple
        {
            Name = "TestMeal2",
            Description = "TestDescription2",
        };
        var result = await _mealController.PutMeal(m.Id, meal2);
        var statusCode = (result as ObjectResult).StatusCode;
        Assert.AreEqual(202, statusCode);
    }

    [Test]
    public async Task Delete_ReturnsStatus204()
    {
        var meal = new MealSimple
        {
            Name = "TestMeal",
            Description = "TestDescription",
        };
        await _mealController.PostMeal(meal);
        var result = await _mealController.DeleteMeal(1);
        var statusCode = (result as StatusCodeResult).StatusCode;
        Assert.AreEqual(204, statusCode);
    }

    /*
     * Put + DishController interaction tests
     */
    [Test]
    public async Task Put_ChangesEntryCorrectly()
    {
        var meal = new MealSimple
        {
            Name = "TestMeal",
            Description = "TestDescription",
        };
        var post = await _mealController.PostMeal(meal);
        var m = (post.Result as ObjectResult).Value as MealNameWDishes;
        var meal2 = new MealSimple
        {
            Name = "TestMeal2",
            Description = "TestDescription2",
        };
        var result = await _mealController.PutMeal(m.Id, meal2);
        var entry = (result as ObjectResult).Value.Adapt<MealSimple>();
        Assert.IsTrue(Tools.CompareProperties<MealSimple>(meal2, entry));
    }
    
    [Test]
    public async Task PutAddDish_AddsDishToMeal()
    {
        var meal = new MealSimple
        {
            Name = "TestMeal",
            Description = "TestDescription",
        };
        var post = await _mealController.PostMeal(meal);
        var m = (post.Result as ObjectResult).Value as MealNameWDishes;
        var result = await _mealController.PutAddDish(m.Id, _dataId[0]);
        var entry = (result as ObjectResult).Value as MealNameWDishes;
        Assert.IsTrue(entry.Dishes.Count > 0);
        Assert.IsTrue(Tools.CompareProperties(entry.Dishes[0], _dishToCheck));
    }

    [Test]
    public async Task PutRemoveDish_RemovesDishFromMeal()
    {
        var meal = new MealSimple
        {
            Name = "TestMeal",
            Description = "TestDescription",
        };
        var post = await _mealController.PostMeal(meal);
        var m = (post.Result as ObjectResult).Value as MealNameWDishes; 
        await _mealController.PutAddDish(m.Id, _dataId[0]);
        var result = await _mealController.PutRemoveDish(m.Id, _dataId[0]);
        var entry = (result as ObjectResult).Value as MealNameWDishes;
        Assert.IsTrue(entry.Dishes.Count == 0);
    }
}


        

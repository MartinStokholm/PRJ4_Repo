using Microsoft.Build.Evaluation;
using Microsoft.CodeAnalysis.VisualBasic.Syntax;
using Microsoft.EntityFrameworkCore;
using WebAPI.Controllers;
using WebAPI.Dto.Dish;
using WebAPI.Dto.Meal;

namespace APIUnitTesting.ControllerTests;
using Tools = TestUtils.TestUtils;
public class MealCtrlUnitTests
{
    // Very much work in progress

    private DataContext _context;
    private MealController _controller;
    private MealSimple _correctMeal;
    private MealSimple _incorrectMeal;
    private DishNoIdDto _correctDish;
    private List<long> _dataId = new();
    [SetUp]
    public void Setup()
    {
        _context = Tools.TestContextSetup();
        _controller = new MealController(_context);

        // Seed data here
        _correctDish = new()
        {
            Name = "Pierogi",
            Category = "Dinner",
            Ingredients = "2 flour 3 waters",
            NutritionalValue = 400,
            PicturePath = "mypic.jpg",
            Recipe = "Dodis den dodat"
        };

        //SeedData();
    }
}


        

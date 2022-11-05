using System.Collections;
using System.Reflection;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Controllers;
using WebAPI.Dto.Dish;
using WebAPI.Models;
using APIUnitTesting.TestUtils;



namespace APIUnitTesting
{
    public class DishCtrlUnitTests
    {
        private DataContext _context;
        private DishController _controller;
        private DishDtoNoId _correctData;
        private DishDtoNoId _incorrectData;
        private Queue<long> _dataId = new();
        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase("TestDb")
                .EnableDetailedErrors()
                .EnableSensitiveDataLogging()
                .Options;

            _context = new DataContext(options);
            _controller = new DishController(_context);
            _correctData = new()
            {
                Name = "Pierogi",
                Category = "Dinner",
                Ingredients = "2 flour 3 waters",
                NutritionalValue = 400,
                PicturePath = "mypic.jpg",
                Recipe = "Dodis den dodat"
            };

            // Incorrect data: Name is required
            _incorrectData = new DishDtoNoId()
            {
                Category = "Dinner",
                Ingredients = "2 flour 3 waters",
                NutritionalValue = 400,
                PicturePath = "mypic.jpg",
                Recipe = "Dodis den dodat"
            };

            SeedData();
        }

        void SeedData()
        {
            var data = new DishDtoNoId()
            {
                Name = "Gulasch",
                Category = "Dinner",
                Ingredients = "2 meats, 5 sauces",
                NutritionalValue = 600,
                PicturePath = "mypic2.jpg",
                Recipe = "Cook meat with sauce"
            };

            var converted = data.Adapt<Dish>();
            _context.Dishes.Add(converted);
            _context.SaveChanges();
            _dataId.Enqueue(converted.Id);

            data = new DishDtoNoId()
            {
                Name = "Caek",
                Category = "Dessert",
                Ingredients = "2 flour 4 waters",
                NutritionalValue = 11000,
                PicturePath = "mypic3.jpg",
                Recipe = "Bake caek"
            };
            
            converted = data.Adapt<Dish>();
            _context.Dishes.Add(converted);
            _context.SaveChanges();
            _dataId.Enqueue(converted.Id); 
        }

        /* POST tests */
        [Test]
        public async Task TestPostCorrect_StatusCode202()
        {
            var data = _correctData;
            var response = await _controller.PostDishModel(data);
            Assert.IsTrue(response.Result.GetType() == typeof(AcceptedResult));
        }

        [Test]
        public async Task TestPostCorrect_ResultValueExists()
        {
            var data = _correctData;
            var response = await _controller.PostDishModel(data);
            AcceptedResult val = (AcceptedResult) response.Result;

            Assert.IsTrue(val.Value != null);
        }
        

        [Test]
        public async Task TestPostIncorrect_DbException()
        {
            bool exceptionThrown = false;
            var data = _incorrectData;
            try
            {
                var response = await _controller.PostDishModel(data);
            }
            catch (DbUpdateException e)
            {
                exceptionThrown = true;
            }
            Assert.IsTrue(exceptionThrown);
        }

        // Note: This test does not check lists, as compare function does not check
        // Lists correctly. 
        // To check complex object lists, we can run a foreach loop comparing the objects
        // inside of lists
        [Test]
        public async Task TestPost_ReturnsCorrectObj()
        {
            var data = _correctData;
            var result = await _controller.PostDishModel(data);
            var accepted = (AcceptedResult)result.Result;
            var Id = ((Dish)accepted.Value).Id;

            var d = data.Adapt<Dish>();
            d.Id = Id;

            Assert.IsTrue(TestUtils.TestUtils.CompareProperties(d, (Dish)accepted.Value, "Meals"));
        }

        /* GET tests with manually seeded data*/
        [Test]
        public async Task TestGet_StatusCode200()
        {
            foreach (var id in _dataId)
            {
                var getResult = await _controller.GetDish(id);
                int? statusCode = null;
                try
                {
                    OkObjectResult res = (OkObjectResult?)getResult.Result;
                    statusCode = res.StatusCode;
                }
                catch (Exception e) { }
                Assert.IsTrue(statusCode == 200);
            }
        }
    }
}
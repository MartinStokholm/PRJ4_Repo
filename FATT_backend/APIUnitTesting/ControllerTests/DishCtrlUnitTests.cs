using System.Collections;
using System.Reflection;
using APIUnitTesting.TestUtils;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Evaluation;
using Microsoft.EntityFrameworkCore;
using WebAPI.Controllers;
using WebAPI.Dto.Dish;
using WebAPI.Models;




namespace APIUnitTesting.ControllerTests
{
    // Note that for some reason ActionResult does not contain a getter for StatusCode
    // So to check StatusCodes we need to type convert into smth else

    // All tests done using InMemory EFCore db. This way there is no need to mock
    // The DbContext. See Testing in EFCore 5 link in Docs
    using Tools = TestUtils.TestUtils;
    public class DishCtrlUnitTests
    {
        private DataContext _context;
        private DishController _controller;
        private DishNoIdDto _correctData;
        private DishNoIdDto _incorrectData;
        private List<long> _dataId = new();
        [SetUp]
        public void Setup()
        {

            _context = Tools.TestContextSetup();
            _controller = new DishController(_context);
            _correctData = new()
            {
                Name = "Pierogi",
                Preptime = "5 hours",
                Ingredients = "2 flour 3 waters",
                NutritionalValue = "400p, 300cb, 50f",
                PicturePath = "mypic.jpg",
                Recipe = "Dodis den dodat"
            };

            SeedData();
        }

        [TearDown]
        public void TearDown()
        {
            foreach (var id in _dataId)
            {
                var dish = _context.Dishes.FirstOrDefault(x => x.Id == id);
                _context.Dishes.Remove(dish);
                _context.SaveChanges();
            }
            _dataId.Clear();
        }

        void SeedData()
        {
            
            var data = new DishNoIdDto();
            data = new DishNoIdDto()
            {
                Name = "Caek",
                Ingredients = "2 flour 4 waters",
                NutritionalValue = "11000",
                PicturePath = "mypic3.jpg",
                Recipe = "Baek caek"
            };

            var converted = data.Adapt<Dish>();
            _context.Dishes.Add(converted);
            _context.SaveChanges();
            _dataId.Add(converted.Id);
        }

        /* POST tests */
        [Test]
        public async Task TestPostCorrect_StatusCode202()
        {
            // Arrange
            var data = _correctData;
            // Act
            var response = await _controller.PostDishModel(data);
            // Needed for cleanup
            var id = _context.Dishes.FirstOrDefault(x => x.Name == _correctData.Name).Id;
            _dataId.Add(id);
            // Assert
            Assert.IsTrue(response.Result.GetType() == typeof(AcceptedResult));
        }

        [Test]
        public async Task TestPostCorrect_EntryWithSameNameFound()
        {
            var data = _correctData;
            var response = await _controller.PostDishModel(data);
            var id = _context.Dishes.FirstOrDefault(x => x.Name == _correctData.Name).Id;
            _dataId.Add(id);
            var x = _context.Dishes.FirstOrDefault(x => x.Name == _correctData.Name);

            Assert.IsTrue(x != null);
        }

        // Note: This test does not check lists, as compare function does not check
        // Lists correctly. 
        // To check complex object lists, we can run a foreach loop comparing the objects
        // inside of lists
        [Test]
        public async Task TestPost_ReturnsCorrectObj()
        {
            var data = _correctData;
            var result =(AcceptedResult)(await _controller.PostDishModel(data)).Result;

            var inserted = _context.Dishes.FirstOrDefault(x => x.Name == _correctData.Name);
            var id = inserted.Id;
            _dataId.Add(id);
            var d = data.Adapt<DishNoMealsDto>();
            d.Id = id;

            Assert.IsTrue(Tools.CompareProperties(d, result.Value));
        }

        /* GET tests with manually seeded data*/
        [Test]
        public async Task TestGetExisting_Status200()
        {
            foreach (var id in _dataId)
            {
                var getResult = await _controller.GetDish(id);
                var callResult = new Tools.TestCallResult<DishNoMealsDto>(getResult);

                Assert.IsTrue(callResult.StatusCode == 200);
            }
        }

        [Test]
        public async Task Get_ReturnsCorrectObject()
        {
            var data = _correctData;
            var postResult = new Tools.TestCallResult<DishNoMealsDto>(await _controller.PostDishModel(data));
            var Id = postResult.Id;
            var d = data.Adapt<DishNoMealsDto>();
            if (Id != null)
            {
                d.Id = (long)Id;
                _dataId.Add((long)Id);
                var getResult = new Tools.TestCallResult<DishNoMealsDto>(await _controller.GetDish((long)Id));
                DishNoMealsDto? retDish = getResult.Value as DishNoMealsDto;
                Assert.IsTrue(Tools.CompareProperties(d, retDish, "Meals"));
            }
            else
            {
                Assert.Fail("Id returned from post was null");
            }
        }

        [Test]
        public async Task GetNonExisting_Status404()
        {

            var getResult = await _controller.GetDish(20);
            try
            {
                var callResult = new Tools.TestCallResult<Dish>(getResult.Result);
                Assert.AreEqual(callResult.StatusCode, 404);
            }
            catch
            {
                Assert.Fail();
            }
        }

        [Test]
        public async Task DeleteExisting_Status204()
        {
            var result = await _controller.PostDishModel(_correctData);
            var accepted = new Tools.TestCallResult<DishNoMealsDto>(result);
            int? statusCode;

            if (accepted.Id != null)
            {
                var delResult = await _controller.DeleteDish((long)accepted.Id);
                statusCode = (delResult as StatusCodeResult).StatusCode;
                Assert.AreEqual(statusCode, 204);
            }
            else
            {
                Assert.Fail();
            }
        }

        [Test]
        public async Task DeleteExisting_GetStatus404()
        {
            var result = await _controller.PostDishModel(_correctData);
            var accepted = (AcceptedResult)result.Result;
            var Id = ((DishNoMealsDto)accepted.Value).Id;

            await _controller.DeleteDish(Id);
            var get = new Tools.TestCallResult<DishNoMealsDto>(await _controller.GetDish(Id));
            Assert.IsTrue(get.StatusCode == 404);
        }

        [Test]
        public async Task DeleteNonexisting_Status404()
        {
            var result = await _controller.DeleteDish(20);
            var statusCodeResult = result as NotFoundObjectResult;
            if (statusCodeResult != null)
            {
                Assert.AreEqual(statusCodeResult.StatusCode, 404);
            }
            else
            {
                Assert.Fail();
            }
        }
    }
}
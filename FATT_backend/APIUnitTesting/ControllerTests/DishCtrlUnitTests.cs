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
    using Tools = TestUtils.TestUtils;
    // Note that for some reason ActionResult does not contain a getter for StatusCode
    // So to check StatusCodes we need to type convert into smth else

    // All tests done using InMemory EFCore db. This way there is no need to mock
    // The DbContext. See Testing in EFCore 5 link in Docs
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
            _incorrectData = new DishNoIdDto()
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
            var data = new DishNoIdDto()
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
            _dataId.Add(converted.Id);

            data = new DishNoIdDto()
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
            _dataId.Add(converted.Id);
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
            AcceptedResult val = (AcceptedResult)response.Result;

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

            Assert.IsTrue(Tools.CompareProperties(d, (Dish)accepted.Value, "Meals"));
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
                var delResult = await _controller.DeleteDishModel((long)accepted.Id);
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
            var Id = ((Dish)accepted.Value).Id;

            await _controller.DeleteDishModel(Id);
            var get = new Tools.TestCallResult<DishNoMealsDto>(await _controller.GetDish(Id));
            Assert.IsTrue(get.StatusCode == 404);
        }

        [Test]
        public async Task DeleteNonexisting_Status404()
        {
            var result = await _controller.DeleteDishModel(20);
            StatusCodeResult statusCodeResult = result as StatusCodeResult;
            if (statusCodeResult != null)
            {
                Assert.AreEqual(statusCodeResult.StatusCode, 404);
            }
            else
            {
                Assert.Fail();
            }
        }

        [Test]
        [TestCase(0)]
        [TestCase(1)]
        public async Task Put_ChangesDishCorrectly(int index)
        {
            DishNoIdDto d = new DishNoIdDto()
            {
                Name = "Garlic Bread"
            };
            try
            {
                long dataId = _dataId[index];
                StatusCodeResult? putResult = await _controller.PutDishModel(dataId, d) as StatusCodeResult;
                Assert.AreEqual(putResult.StatusCode, 204);
                DishMealNames toCheck = d.Adapt<DishMealNames>();
                toCheck.Id = dataId;
                var getResult = await _controller.GetDish(dataId);
                var callResult = new Tools.TestCallResult<DishNoMealsDto>(getResult);
                Assert.IsTrue(Tools.CompareProperties(toCheck, callResult.Value as DishMealNames, "Meals"));
            }
            catch (Exception e)
            {
                Assert.Fail(e.Message);
            }
        }

        [Test]
        public async Task PutNonexisting_Status404()
        {
            DishNoIdDto d = new();
            var result = await _controller.PutDishModel(20, d);
            ObjectResult statusCodeResult = result as ObjectResult;
            if (statusCodeResult != null)
            {
                Assert.AreEqual(404, statusCodeResult.StatusCode);
            }
            else
            {
                Assert.Fail();
            }
        }
    }
}
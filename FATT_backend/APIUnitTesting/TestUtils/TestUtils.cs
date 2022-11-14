using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace APIUnitTesting.TestUtils
{
    class TestUtils
    {
        public class TestCallResult<T>
        {
            public TestCallResult(ActionResult<T> actionResult)
            {
                var objectResult = actionResult.Result as ObjectResult;
                if (objectResult != null && objectResult.Value != null)
                {
                    StatusCode = objectResult.StatusCode;
                    Id = (long)typeof(T).GetProperty("Id").GetValue(objectResult.Value, null);
                    Value = objectResult.Value;
                }
                else
                {
                    var result = actionResult.Result as StatusCodeResult;
                    if (actionResult.Value != null)
                    {
                        Id = (long)typeof(T).GetProperty("Id").GetValue(actionResult.Value, null);
                        Value = actionResult.Value;
                    }

                    if (result != null)
                    {
                        StatusCode = result.StatusCode;
                    }
                }
            }
            public long? Id { get; }
            public int? StatusCode { get; }
            public object? Value { get; }
        }
        public static bool CompareProperties<T>(T? obj1, T? obj2, params string[] ignore) where T : class
        {
            Type type = typeof(T);
            List<string> ignoreList = new List<string>(ignore);
            foreach (PropertyInfo pi in type.GetProperties(System.Reflection.BindingFlags.Public |
                                                           System.Reflection.BindingFlags.Instance))
            {
                if (!ignoreList.Contains(pi.Name))
                {
                    object prop1 = type.GetProperty(pi.Name).GetValue(obj1, null);
                    object prop2 = type.GetProperty(pi.Name).GetValue(obj2, null);
                    if (prop1 != prop2 && (prop1 == null || !prop1.Equals(prop2)))
                    {
                        return false;
                    }
                }
            }

            return true;
        }

        public static DataContext TestContextSetup() 
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase("TestDb")
                .EnableDetailedErrors()
                .EnableSensitiveDataLogging()
                .Options;
            return new DataContext(options);   
        }
    }
}

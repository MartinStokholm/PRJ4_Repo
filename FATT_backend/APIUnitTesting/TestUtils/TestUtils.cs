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
            /// <summary>
            /// Converts ActionResult into TestCallResult 
            /// <para>TestCallResult properties include Id, Value and StatusCode of the call result.
            /// If conversion fails, Error is set to true and other values return null. On StatusCodeResult only StatusCode is set</para>
            /// <para>Type T is return type of the call</para>
            /// </summary>
            public TestCallResult(ActionResult<T> actionResult)
            {
                ObjectResult objectResult = null;
                try
                {
                    var res = actionResult.Result as ObjectResult;
                    objectResult = res;
                }
                catch
                {
                    try
                    {
                        var sts = actionResult.Result as StatusCodeResult;
                        StatusCode = sts.StatusCode;
                    }
                    catch
                    {
                        Error = true;
                        return;
                    }
                }
                if (objectResult != null && objectResult.Value != null)
                {
                    StatusCode = objectResult.StatusCode;
                    if (objectResult.Value != null)
                    {
                        try
                        {
                            Value = (T)objectResult.Value;
                        }
                        catch
                        {
                            Error = true;
                        }

                        try
                        {
                            Id = (long)typeof(T).GetProperty("Id").GetValue(objectResult.Value, null);
                        }
                        catch
                        {
                            Error = true;
                        }
                        
                    }
                }
                else if (objectResult != null && objectResult.StatusCode != null)
                {
                    StatusCode = objectResult.StatusCode;
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
            public T? Value { get; }
            public bool Error { get;}
        }
        /// <summary>
        /// Compares properties of two objects of type T
        /// <para>Third parameter is string ignore list</para>
        /// <para>Does not work on complex object lists, they need to be added to ignore list</para>
        /// </summary>
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

        /// <summary>
        /// Sets up InMemory database for testing
        /// </summary>
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

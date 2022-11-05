using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace APIUnitTesting.TestUtils
{
    class TestUtils
    {
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
    }
}

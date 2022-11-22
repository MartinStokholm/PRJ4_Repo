namespace WebAPI.Dto.Dish;
using WebAPI.Models;

public class DishNoIdDto
{
    public string Name { get; set; } = "";
    public string Preptime { get; set; } = "";
    public string Ingredients { get; set; } = "";
    public string NutritionalValue { get; set; } = "";
    public string Recipe { get; set; } = "";
    public string? PicturePath { get; set; }
}
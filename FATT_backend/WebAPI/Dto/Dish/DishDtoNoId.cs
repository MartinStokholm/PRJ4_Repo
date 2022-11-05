namespace WebAPI.Dto.Dish;

public class DishDtoNoId
{
    public string Name { get; set; }
    public string? Category { get; set; }
    public double? NutritionalValue { get; set; }
    public string? Recipe { get; set; }
    public string? Ingredients { get; set; }
    public string? PicturePath { get; set; }
}
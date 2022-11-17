namespace WebAPI.Dto.Dish;

public class DishThumbnailDto
{
    public long Id { get; set; }
    public string Name { get; set; } = "";
    public string? Category { get; set; }
    public double? NutritionalValue { get; set; }
    public string? Recipe { get; set; }
    public string? Ingredients { get; set; }

    public string? PicturePath { get; set; }
}
namespace WebAPI.Dto.Meal;


// For creating meals without ingredients already in them
public class MealSimple
{
    public string? Category { get; set; }
    public string? Description { get; set; }
    public double? NutritionalValue { get; set; }
}
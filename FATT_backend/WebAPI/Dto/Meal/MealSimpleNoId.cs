namespace WebAPI.Dto.Meal;


// For creating meals without ingredients already in them
public class MealSimpleNoId
{
    public string Name { get; set; }
    public string? Category { get; set; }
    public string? Description { get; set; }
}
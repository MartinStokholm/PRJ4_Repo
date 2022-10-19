namespace WebAPI.Models
{
    public class DishModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string? Category { get; set; }
        public double? NutritionalValue { get; set; }
        public string? Recipe { get; set; }
        public string? Ingredients { get; set; }
        
        public string? PicturePath { get; set; }
        public List<MealModel> Meals { get; set; }
    }
}

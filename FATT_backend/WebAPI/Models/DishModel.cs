namespace WebAPI.Models
{
    public class DishModel
    {
        public long Id { get; set; }
        public string Category { get; set; } = "";
        public double NutritunalValue { get; set; }
        public string Recipe { get; set; } = "";
        public string Ingredients { get; set; } = "";
        
        public string PicturePath { get; set; } = "";
    }
}

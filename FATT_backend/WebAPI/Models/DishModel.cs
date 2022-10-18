namespace WebAPI.Models
{
    public class DishModel
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public double NutritunalValue { get; set; }
        public string Recipe { get; set; }
        public string Ingredients { get; set; }
        
        // no clue what data type
        public string PicturePath { get; set; }
    }
}

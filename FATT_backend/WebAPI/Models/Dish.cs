﻿namespace WebAPI.Models
{
    public class Dish
    {
        public long Id { get; set; }
        public string Name { get; set; } = "";
        public string? Category { get; set; } = "";
        public double? NutritionalValue { get; set; }
        public string? Recipe { get; set; } = "";
        public string? Ingredients { get; set; } = "";
        
        public string? PicturePath { get; set; } = "";
        public List<Meal> Meals { get; set; } = new();
    }
}

﻿namespace WebAPI.Dto.Meal;

public class MealSimple
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string? Category { get; set; }
    public string? Description { get; set; }
}
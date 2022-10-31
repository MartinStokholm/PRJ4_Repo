using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


// Make sure to change path to where your secret is saved
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("C:\\Users\\msldk\\AppData\\Roaming\\Microsoft\\UserSecrets\\ea531bc4-79d0-465e-9313-b6711b47fe62\\secrets.json");

// Add to fix circular reference problem with JSON serialization
builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("myConxStr") ?? throw new InvalidOperationException("Connection string 'DataContext' not found.")));


//builder.Services.AddDbContext<DataContext>(options =>
//    options.UseInMemoryDatabase("InMemoryDb"));

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

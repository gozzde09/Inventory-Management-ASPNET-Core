using InventoryManagement.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddDbContext<ItemDbContext>(options =>
//     options.UseSqlite("Data Source=inventory.db"));

builder.Services.AddDbContext<ItemDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(options =>
    options.AllowAnyMethod()
           .AllowAnyHeader()
           .AllowAnyOrigin());
app.MapControllers();

app.Run();

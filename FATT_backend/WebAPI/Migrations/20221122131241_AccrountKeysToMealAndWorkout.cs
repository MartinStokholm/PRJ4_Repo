using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class AccrountKeysToMealAndWorkout : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "AccountId",
                table: "Workouts",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "AccountId",
                table: "Meals",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Workouts_AccountId",
                table: "Workouts",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_AccountId",
                table: "Meals",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Accounts_AccountId",
                table: "Meals",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_Accounts_AccountId",
                table: "Workouts",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Accounts_AccountId",
                table: "Meals");

            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_Accounts_AccountId",
                table: "Workouts");

            migrationBuilder.DropIndex(
                name: "IX_Workouts_AccountId",
                table: "Workouts");

            migrationBuilder.DropIndex(
                name: "IX_Meals_AccountId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "Workouts");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "Meals");
        }
    }
}

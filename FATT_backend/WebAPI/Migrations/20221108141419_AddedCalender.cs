using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class AddedCalender : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CalenderId",
                table: "Accounts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "Calender",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Calender", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkoutDate",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkoutId = table.Column<long>(type: "bigint", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CalenderId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutDate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkoutDate_Calender_CalenderId",
                        column: x => x.CalenderId,
                        principalTable: "Calender",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_CalenderId",
                table: "Accounts",
                column: "CalenderId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutDate_CalenderId",
                table: "WorkoutDate",
                column: "CalenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Calender_CalenderId",
                table: "Accounts",
                column: "CalenderId",
                principalTable: "Calender",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Calender_CalenderId",
                table: "Accounts");

            migrationBuilder.DropTable(
                name: "WorkoutDate");

            migrationBuilder.DropTable(
                name: "Calender");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_CalenderId",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "CalenderId",
                table: "Accounts");
        }
    }
}

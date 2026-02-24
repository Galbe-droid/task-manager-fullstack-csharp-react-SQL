using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManager.Migrations
{
    /// <inheritdoc />
    public partial class AddUserAuth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "IdUser",
                table: "ToDos",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "userId",
                table: "ToDos",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ToDos_userId",
                table: "ToDos",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDos_Users_userId",
                table: "ToDos",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDos_Users_userId",
                table: "ToDos");

            migrationBuilder.DropIndex(
                name: "IX_ToDos_userId",
                table: "ToDos");

            migrationBuilder.DropColumn(
                name: "IdUser",
                table: "ToDos");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "ToDos");
        }
    }
}

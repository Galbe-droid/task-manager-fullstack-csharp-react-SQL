using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManager.Migrations
{
    /// <inheritdoc />
    public partial class AddUserAuthCorrections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDos_Users_userId",
                table: "ToDos");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "ToDos",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ToDos_userId",
                table: "ToDos",
                newName: "IX_ToDos_UserId");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "ToDos",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDos_Users_UserId",
                table: "ToDos",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDos_Users_UserId",
                table: "ToDos");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ToDos",
                newName: "userId");

            migrationBuilder.RenameIndex(
                name: "IX_ToDos_UserId",
                table: "ToDos",
                newName: "IX_ToDos_userId");

            migrationBuilder.AlterColumn<Guid>(
                name: "userId",
                table: "ToDos",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ToDos_Users_userId",
                table: "ToDos",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

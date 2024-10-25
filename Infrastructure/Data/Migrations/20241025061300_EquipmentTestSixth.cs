using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class EquipmentTestSixth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Colors",
                table: "Armament");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "Armament");

            migrationBuilder.AlterColumn<string>(
                name: "Size",
                table: "ProductToCreateOrder",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "ProductToCreateOrder",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Armament",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "ProductToCreateOrder");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Armament");

            migrationBuilder.AlterColumn<string>(
                name: "Size",
                table: "ProductToCreateOrder",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string[]>(
                name: "Colors",
                table: "Armament",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string[]>(
                name: "Size",
                table: "Armament",
                type: "text[]",
                nullable: true);
        }
    }
}

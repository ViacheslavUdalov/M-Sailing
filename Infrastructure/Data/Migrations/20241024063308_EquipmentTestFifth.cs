using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class EquipmentTestFifth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductToCreateOrder_ProductVariants_VariantId",
                table: "ProductToCreateOrder");

            migrationBuilder.DropIndex(
                name: "IX_ProductToCreateOrder_VariantId",
                table: "ProductToCreateOrder");

            migrationBuilder.DropColumn(
                name: "VariantId",
                table: "ProductToCreateOrder");

            migrationBuilder.AddColumn<string>(
                name: "Size",
                table: "ProductToCreateOrder",
                type: "text",
                nullable: true,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Size",
                table: "ProductToCreateOrder");

            migrationBuilder.AddColumn<int>(
                name: "VariantId",
                table: "ProductToCreateOrder",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProductToCreateOrder_VariantId",
                table: "ProductToCreateOrder",
                column: "VariantId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductToCreateOrder_ProductVariants_VariantId",
                table: "ProductToCreateOrder",
                column: "VariantId",
                principalTable: "ProductVariants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

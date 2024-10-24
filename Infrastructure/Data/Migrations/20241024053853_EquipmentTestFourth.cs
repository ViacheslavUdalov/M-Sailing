using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class EquipmentTestFourth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Covers");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "ProductToCreateOrder");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "Color",
                table: "ProductToCreateOrder",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Size",
                table: "ProductToCreateOrder",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Covers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Colors = table.Column<string[]>(type: "text[]", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Pictures = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false),
                    Size = table.Column<string[]>(type: "text[]", nullable: true),
                    Type = table.Column<string>(type: "text", nullable: false),
                    TypeForBuy = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Covers", x => x.Id);
                });
        }
    }
}

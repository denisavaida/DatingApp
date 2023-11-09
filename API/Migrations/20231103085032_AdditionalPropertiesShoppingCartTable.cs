using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AdditionalPropertiesShoppingCartTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Total",
                table: "ShoppingCart",
                newName: "Subtotal");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "ProductCategory",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "ProductCategory",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "ShoppingCart",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Price",
                table: "ShoppingCart",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "ShoppingCart");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "ShoppingCart");

            migrationBuilder.RenameColumn(
                name: "Subtotal",
                table: "ShoppingCart",
                newName: "Total");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "ProductCategory",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ProductCategory",
                newName: "id");
        }
    }
}

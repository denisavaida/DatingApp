using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class CategoryGenderUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CategoryGender",
                table: "Product",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Subcategory",
                table: "Product",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryGender",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "ProductCategory");

            migrationBuilder.DropColumn(
                name: "Subcategory",
                table: "Product");
        }
    }
}

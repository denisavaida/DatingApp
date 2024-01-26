using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class SubcategoryUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Favourites_FavouritesId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_FavouritesId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "CategoryGenderId",
                table: "Subcategory");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Subcategory");

            migrationBuilder.DropColumn(
                name: "FavouritesId",
                table: "Product");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ChangeProductTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "CategoryGender",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "Subcategory",
                table: "Product");

            migrationBuilder.AddColumn<int>(
                name: "CategoryGenderId",
                table: "Product",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Product",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SubcategoryId",
                table: "Product",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_CategoryGenderId",
                table: "Product",
                column: "CategoryGenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_CategoryId",
                table: "Product",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_SubcategoryId",
                table: "Product",
                column: "SubcategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_CategoryGender_CategoryGenderId",
                table: "Product",
                column: "CategoryGenderId",
                principalTable: "CategoryGender",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_ProductCategory_CategoryId",
                table: "Product",
                column: "CategoryId",
                principalTable: "ProductCategory",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Subcategory_SubcategoryId",
                table: "Product",
                column: "SubcategoryId",
                principalTable: "Subcategory",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_CategoryGender_CategoryGenderId",
                table: "Product");

            migrationBuilder.DropForeignKey(
                name: "FK_Product_ProductCategory_CategoryId",
                table: "Product");

            migrationBuilder.DropForeignKey(
                name: "FK_Product_Subcategory_SubcategoryId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_CategoryGenderId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_CategoryId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_SubcategoryId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "CategoryGenderId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "SubcategoryId",
                table: "Product");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Product",
                type: "TEXT",
                nullable: true);

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
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class TablesUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryGenderId",
                table: "ProductCategory");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "CategoryGender");

            migrationBuilder.AddColumn<int>(
                name: "ProductCategoryId",
                table: "Subcategory",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductCategoryId",
                table: "CategoryGender",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subcategory_ProductCategoryId",
                table: "Subcategory",
                column: "ProductCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryGender_ProductCategoryId",
                table: "CategoryGender",
                column: "ProductCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryGender_ProductCategory_ProductCategoryId",
                table: "CategoryGender",
                column: "ProductCategoryId",
                principalTable: "ProductCategory",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategory_ProductCategory_ProductCategoryId",
                table: "Subcategory",
                column: "ProductCategoryId",
                principalTable: "ProductCategory",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryGender_ProductCategory_ProductCategoryId",
                table: "CategoryGender");

            migrationBuilder.DropForeignKey(
                name: "FK_Subcategory_ProductCategory_ProductCategoryId",
                table: "Subcategory");

            migrationBuilder.DropIndex(
                name: "IX_Subcategory_ProductCategoryId",
                table: "Subcategory");

            migrationBuilder.DropIndex(
                name: "IX_CategoryGender_ProductCategoryId",
                table: "CategoryGender");

            migrationBuilder.DropColumn(
                name: "ProductCategoryId",
                table: "Subcategory");

            migrationBuilder.DropColumn(
                name: "ProductCategoryId",
                table: "CategoryGender");

            migrationBuilder.AddColumn<int>(
                name: "CategoryGenderId",
                table: "ProductCategory",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "CategoryGender",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ChangeProductTable1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategory_Product_ProductId",
                table: "ProductCategory");

            migrationBuilder.DropIndex(
                name: "IX_ProductCategory_ProductId",
                table: "ProductCategory");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "ProductCategory");


            migrationBuilder.AddForeignKey(
                name: "FK_Product_CategoryGender_CategoryGenderId",
                table: "Product",
                column: "CategoryGenderId",
                principalTable: "CategoryGender",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Product_ProductCategory_CategoryId",
                table: "Product",
                column: "CategoryId",
                principalTable: "ProductCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Subcategory_SubcategoryId",
                table: "Product",
                column: "SubcategoryId",
                principalTable: "Subcategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "ProductCategory",
                type: "INTEGER",
                nullable: true);

      
            migrationBuilder.CreateIndex(
                name: "IX_ProductCategory_ProductId",
                table: "ProductCategory",
                column: "ProductId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategory_Product_ProductId",
                table: "ProductCategory",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id");
        }
    }
}

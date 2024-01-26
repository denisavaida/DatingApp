using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class TablesUpdate3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subcategory_ProductCategory_ProductCategoryId",
                table: "Subcategory");

            migrationBuilder.DropColumn(
                name: "SubcategoryId",
                table: "ProductCategory");

            migrationBuilder.AlterColumn<int>(
                name: "ProductCategoryId",
                table: "Subcategory",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategory_ProductCategory_ProductCategoryId",
                table: "Subcategory",
                column: "ProductCategoryId",
                principalTable: "ProductCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subcategory_ProductCategory_ProductCategoryId",
                table: "Subcategory");

            migrationBuilder.AlterColumn<int>(
                name: "ProductCategoryId",
                table: "Subcategory",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "SubcategoryId",
                table: "ProductCategory",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategory_ProductCategory_ProductCategoryId",
                table: "Subcategory",
                column: "ProductCategoryId",
                principalTable: "ProductCategory",
                principalColumn: "Id");
        }
    }
}

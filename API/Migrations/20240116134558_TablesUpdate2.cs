using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class TablesUpdate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryGender_ProductCategory_ProductCategoryId",
                table: "CategoryGender");

            migrationBuilder.DropIndex(
                name: "IX_CategoryGender_ProductCategoryId",
                table: "CategoryGender");

            migrationBuilder.DropColumn(
                name: "ProductCategoryId",
                table: "CategoryGender");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductCategoryId",
                table: "CategoryGender",
                type: "INTEGER",
                nullable: true);

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
        }
    }
}

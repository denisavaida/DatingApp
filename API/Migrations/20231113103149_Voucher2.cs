using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Voucher2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vouchers_Users_AppUserId",
                table: "Vouchers");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Vouchers");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Vouchers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Vouchers_Users_AppUserId",
                table: "Vouchers",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vouchers_Users_AppUserId",
                table: "Vouchers");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Vouchers",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Vouchers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Vouchers_Users_AppUserId",
                table: "Vouchers",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}

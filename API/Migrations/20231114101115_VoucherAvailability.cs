using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class VoucherAvailability : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Summary_Vouchers_VoucherId",
                table: "Summary");

            migrationBuilder.DropIndex(
                name: "IX_Summary_VoucherId",
                table: "Summary");

            migrationBuilder.DropColumn(
                name: "VoucherId",
                table: "Summary");

            migrationBuilder.AddColumn<bool>(
                name: "Available",
                table: "Vouchers",
                type: "INTEGER",
                nullable: false,
                defaultValue: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Available",
                table: "Vouchers");

            migrationBuilder.AddColumn<int>(
                name: "VoucherId",
                table: "Summary",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Summary_VoucherId",
                table: "Summary",
                column: "VoucherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Summary_Vouchers_VoucherId",
                table: "Summary",
                column: "VoucherId",
                principalTable: "Vouchers",
                principalColumn: "Id");
        }
    }
}

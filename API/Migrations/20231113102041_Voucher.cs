using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Voucher : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropForeignKey(
                name: "FK_Order_ShoppingCart_ShoppingCartId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Users_AppUserId",
                table: "Order");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Order",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Vouchers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Discount = table.Column<int>(type: "INTEGER", nullable: false),
                    Validity = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    AppUserId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vouchers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vouchers_Users_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });
                
            migrationBuilder.CreateIndex(
                name: "IX_Vouchers_AppUserId",
                table: "Vouchers",
                column: "AppUserId");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Card_PaymentMethodId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Summary_SummaryId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Users_AppUserId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_Vouchers_VoucherId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingCart_Summary_SummaryId",
                table: "ShoppingCart");

            migrationBuilder.DropTable(
                name: "Summary");

            migrationBuilder.DropTable(
                name: "Vouchers");

            migrationBuilder.DropIndex(
                name: "IX_ShoppingCart_SummaryId",
                table: "ShoppingCart");

            migrationBuilder.DropIndex(
                name: "IX_Order_SummaryId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "SummaryId",
                table: "ShoppingCart");

            migrationBuilder.DropColumn(
                name: "SummaryId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "DeliveryInfo");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Card");

            migrationBuilder.RenameColumn(
                name: "VoucherId",
                table: "Order",
                newName: "ShoppingCartId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_VoucherId",
                table: "Order",
                newName: "IX_Order_ShoppingCartId");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Order",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "Coupon",
                table: "Order",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Payment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CardId = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Icon = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payment_Card_CardId",
                        column: x => x.CardId,
                        principalTable: "Card",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payment_CardId",
                table: "Payment",
                column: "CardId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Payment_PaymentMethodId",
                table: "Order",
                column: "PaymentMethodId",
                principalTable: "Payment",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_ShoppingCart_ShoppingCartId",
                table: "Order",
                column: "ShoppingCartId",
                principalTable: "ShoppingCart",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Users_AppUserId",
                table: "Order",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Delivery_DeliveryOptionsId",
                table: "Order");

            migrationBuilder.RenameColumn(
                name: "DeliveryOptionsId",
                table: "Order",
                newName: "DeliveryId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_DeliveryOptionsId",
                table: "Order",
                newName: "IX_Order_DeliveryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Delivery_DeliveryId",
                table: "Order",
                column: "DeliveryId",
                principalTable: "Delivery",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Delivery_DeliveryId",
                table: "Order");

            migrationBuilder.RenameColumn(
                name: "DeliveryId",
                table: "Order",
                newName: "DeliveryOptionsId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_DeliveryId",
                table: "Order",
                newName: "IX_Order_DeliveryOptionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Delivery_DeliveryOptionsId",
                table: "Order",
                column: "DeliveryOptionsId",
                principalTable: "Delivery",
                principalColumn: "Id");
        }
    }
}

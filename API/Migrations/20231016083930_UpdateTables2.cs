using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTables2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Delivery_DeliveryMethodId",
                table: "Order");

            migrationBuilder.RenameColumn(
                name: "DeliveryMethodId",
                table: "Order",
                newName: "DeliveryOptionsId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_DeliveryMethodId",
                table: "Order",
                newName: "IX_Order_DeliveryOptionsId");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "DeliveryInfo",
                newName: "Lastname");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "DeliveryInfo",
                newName: "Firstname");

            migrationBuilder.AddColumn<string>(
                name: "Postcode",
                table: "Adress",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Delivery_DeliveryOptionsId",
                table: "Order",
                column: "DeliveryOptionsId",
                principalTable: "Delivery",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Delivery_DeliveryOptionsId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "Postcode",
                table: "Adress");

            migrationBuilder.RenameColumn(
                name: "DeliveryOptionsId",
                table: "Order",
                newName: "DeliveryMethodId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_DeliveryOptionsId",
                table: "Order",
                newName: "IX_Order_DeliveryMethodId");

            migrationBuilder.RenameColumn(
                name: "Lastname",
                table: "DeliveryInfo",
                newName: "Surname");

            migrationBuilder.RenameColumn(
                name: "Firstname",
                table: "DeliveryInfo",
                newName: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Delivery_DeliveryMethodId",
                table: "Order",
                column: "DeliveryMethodId",
                principalTable: "Delivery",
                principalColumn: "Id");
        }
    }
}

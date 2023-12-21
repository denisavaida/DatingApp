using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDeliveryInfoForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryInfo_Adress_AdressId",
                table: "DeliveryInfo");

            migrationBuilder.AlterColumn<int>(
                name: "AdressId",
                table: "DeliveryInfo",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryInfo_Adress_AdressId",
                table: "DeliveryInfo",
                column: "AdressId",
                principalTable: "Adress",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryInfo_Adress_AdressId",
                table: "DeliveryInfo");

            migrationBuilder.AlterColumn<int>(
                name: "AdressId",
                table: "DeliveryInfo",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryInfo_Adress_AdressId",
                table: "DeliveryInfo",
                column: "AdressId",
                principalTable: "Adress",
                principalColumn: "Id");
        }
    }
}

﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class VoucherAddedToSummary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Vouchers_VoucherId",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_Order_VoucherId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "VoucherId",
                table: "Order");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "VoucherId",
                table: "Order",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Order_VoucherId",
                table: "Order",
                column: "VoucherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Vouchers_VoucherId",
                table: "Order",
                column: "VoucherId",
                principalTable: "Vouchers",
                principalColumn: "Id");
        }
    }
}

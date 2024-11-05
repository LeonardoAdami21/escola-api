/*
  Warnings:

  - Added the required column `manager_id` to the `Clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clients" ADD COLUMN     "manager_id" INTEGER NOT NULL;

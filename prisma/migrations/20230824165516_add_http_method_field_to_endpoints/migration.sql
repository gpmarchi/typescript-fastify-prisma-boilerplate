/*
  Warnings:

  - Added the required column `http_method` to the `endpoints` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "http_method" AS ENUM ('GET', 'POST', 'PUT', 'PATCH', 'DELETE');

-- AlterTable
ALTER TABLE "endpoints" ADD COLUMN     "http_method" "http_method" NOT NULL;

/*
  Warnings:

  - You are about to drop the column `descrica` on the `compradores` table. All the data in the column will be lost.
  - Added the required column `descricao` to the `compradores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compradores" DROP COLUMN "descrica",
ADD COLUMN     "descricao" TEXT NOT NULL;

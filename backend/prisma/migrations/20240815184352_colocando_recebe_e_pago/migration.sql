-- AlterTable
ALTER TABLE "compradores" ADD COLUMN     "pago" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recebeu_ticket" BOOLEAN NOT NULL DEFAULT false;

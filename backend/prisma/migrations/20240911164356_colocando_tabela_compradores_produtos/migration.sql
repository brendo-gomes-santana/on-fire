-- CreateTable
CREATE TABLE "compradores_produtos" (
    "id" TEXT NOT NULL,
    "id_comprador" TEXT NOT NULL,
    "id_produto" TEXT NOT NULL,

    CONSTRAINT "compradores_produtos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "compradores_produtos_id_key" ON "compradores_produtos"("id");

-- AddForeignKey
ALTER TABLE "compradores_produtos" ADD CONSTRAINT "compradores_produtos_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "compradores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compradores_produtos" ADD CONSTRAINT "compradores_produtos_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

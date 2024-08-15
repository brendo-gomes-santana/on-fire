-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "descricao" TEXT,
    "quantidade" INTEGER NOT NULL,
    "img" TEXT,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compradores" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "visao" TEXT NOT NULL,
    "nome_lider" TEXT,
    "igreja" TEXT,
    "valor" TEXT NOT NULL,
    "descrica" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "compradores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "compradores_id_key" ON "compradores"("id");

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataAbertura" TIMESTAMP(3) NOT NULL,
    "CEP" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "complemento" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "UF" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_CNPJ_key" ON "Empresa"("CNPJ");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_email_key" ON "Empresa"("email");

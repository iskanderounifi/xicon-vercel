-- CreateTable
CREATE TABLE "Entreprise" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "emailPro" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "mf" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "siteweb" TEXT,
    "service" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Entreprise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entreprise_emailPro_key" ON "Entreprise"("emailPro");

-- CreateIndex
CREATE UNIQUE INDEX "Entreprise_mf_key" ON "Entreprise"("mf");

-- AddForeignKey
ALTER TABLE "Entreprise" ADD CONSTRAINT "Entreprise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

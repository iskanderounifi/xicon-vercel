-- CreateTable
CREATE TABLE "Temoignage" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Temoignage_pkey" PRIMARY KEY ("id")
);

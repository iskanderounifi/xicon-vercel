/*
  Warnings:

  - Added the required column `date` to the `Rdv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heure` to the `Rdv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeMeet` to the `Rdv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rdv" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "heure" TEXT NOT NULL,
ADD COLUMN     "typeMeet" TEXT NOT NULL;

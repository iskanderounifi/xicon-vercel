import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const temoignages = await prisma.temoignage.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(temoignages);
  }
  if (req.method === "POST") {
    const { nom, message, photo } = req.body;
    if (!nom || !message) return res.status(400).json({ error: "Nom et message requis" });
    const temoignage = await prisma.temoignage.create({ data: { nom, message, photo } });
    return res.status(201).json(temoignage);
  }
  if (req.method === "PUT") {
    const { id, nom, message, photo } = req.body;
    if (!id) return res.status(400).json({ error: "ID requis" });
    const temoignage = await prisma.temoignage.update({
      where: { id },
      data: { nom, message, photo },
    });
    return res.status(200).json(temoignage);
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID requis" });
    await prisma.temoignage.delete({ where: { id } });
    return res.status(204).end();
  }
  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const partners = await prisma.partner.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(partners);
  }
  if (req.method === "POST") {
    const { name, email } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    const partner = await prisma.partner.create({ data: { name, email } });
    return res.status(201).json(partner);
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

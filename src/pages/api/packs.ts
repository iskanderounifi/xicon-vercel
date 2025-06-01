import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // The 'Pack' model exists in your schema, but the correct Prisma client property is 'package'
      // because 'Pack' is a reserved word in Prisma and will be mapped to 'package'
      const packs = await prisma.package.findMany()
      return res.status(200).json(packs)
    case 'POST':
      const { name, description, price, serviceId } = req.body
      const newPack = await prisma.package.create({
        data: { name, description, price: Number(price), serviceId: String(serviceId) }
      })
      return res.status(201).json(newPack)
    case 'PUT':
      const { id, ...updateData } = req.body
      const updatedPack = await prisma.package.update({
        where: { id: String(id) },
        data: updateData
      })
      return res.status(200).json(updatedPack)
    case 'DELETE':
      const { id: deleteId } = req.body
      await prisma.package.delete({ where: { id: String(deleteId) } })
      return res.status(204).end()
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

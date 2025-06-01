import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const services = await prisma.service.findMany({ include: { packages: true } })
      return res.status(200).json(services)
    }
    case 'POST': {
      const { name, shortDesc, icon, detailedDesc, price, coverImage } = req.body
      const newService = await prisma.service.create({
        data: { name, shortDesc, icon, detailedDesc, price: Number(price), coverImage }
      })
      return res.status(201).json(newService)
    }
    case 'PUT': {
      const { id, ...updateData } = req.body
      const updatedService = await prisma.service.update({
        where: { id: String(id) },
        data: updateData
      })
      return res.status(200).json(updatedService)
    }
    case 'DELETE': {
      const { id } = req.body
      await prisma.service.delete({ where: { id: String(id) } })
      return res.status(204).end()
    }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

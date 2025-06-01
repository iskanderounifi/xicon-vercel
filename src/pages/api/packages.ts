import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const packages = await prisma.package.findMany({ include: { service: true } })
      return res.status(200).json(packages)
    }
    case 'POST': {
      const { name, description, price, serviceId } = req.body
      const newPackage = await prisma.package.create({
        data: { name, description, price: Number(price), serviceId: String(serviceId) }
      })
      return res.status(201).json(newPackage)
    }
    case 'PUT': {
      const { id, ...updateData } = req.body
      const updatedPackage = await prisma.package.update({
        where: { id: String(id) },
        data: updateData
      })
      return res.status(200).json(updatedPackage)
    }
    case 'DELETE': {
      const { id } = req.body
      await prisma.package.delete({ where: { id: String(id) } })
      return res.status(204).end()
    }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

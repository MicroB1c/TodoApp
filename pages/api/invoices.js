import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const invoices = await prisma.invoice.findMany();
      res.status(200).json(invoices);
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
      res.status(500).json({ error: 'Failed to fetch invoices' });
    }
  } else if (req.method === 'POST') {
    const { amount, dueDate, status } = req.body;
    try {
      const newInvoice = await prisma.invoice.create({
        data: {
          amount: parseFloat(amount), // Ensure the amount is a float
          dueDate: new Date(dueDate), // Ensure the due date is a Date object
          status,
        },
      });
      res.status(201).json(newInvoice);
    } catch (error) {
      console.error('Failed to create invoice:', error);
      res.status(500).json({ error: 'Failed to create invoice' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await prisma.invoice.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      console.error('Failed to delete invoice:', error);
      res.status(500).json({ error: 'Failed to delete invoice' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

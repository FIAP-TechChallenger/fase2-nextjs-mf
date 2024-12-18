import { Conta, PrismaClient, Saldo, Transacao } from "@prisma/client";

const prisma = new PrismaClient();

export { Conta, prisma, Saldo, Transacao };

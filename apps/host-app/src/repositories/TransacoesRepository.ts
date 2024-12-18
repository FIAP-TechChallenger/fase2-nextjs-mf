import { prisma, Transacao } from "@libs/db";
import SaldoRepository from "./SaldoRepository";

export default class TransacoesRepository {
  private saldoRepository = new SaldoRepository();

  async getTransacoesByUserId(userId: number): Promise<Transacao[] | null> {
    return prisma.transacao.findMany({
      where: { contaId: userId },
    });
  }

  async getTransacoesById(transacaoId: number) {
    return prisma.transacao.findUnique({
      where: { id: transacaoId },
    });
  }

  async updateTransacao(transacaoId: number, tipoTransacao: string, valor: number, date: Date) {
    const transacao = await this.getTransacoesById(transacaoId);

    if (transacao !== null) {
      const saldo = await this.saldoRepository.findByUserId(transacao.contaId);

      if (saldo != null) {
        let newSaldo =
          transacao.tipoTransacao === "transferencia"
            ? saldo.total + (transacao.valor ?? 0)
            : saldo.total - (transacao.valor ?? 0);

        newSaldo = tipoTransacao === "transferencia" ? newSaldo - (valor ?? 0) : newSaldo + (valor ?? 0);

        await this.saldoRepository.updateSaldo(transacao.contaId, newSaldo);
      }
    }

    return prisma.transacao.update({
      where: { id: transacaoId },
      data: {
        tipoTransacao,
        valor,
        date,
      },
    });
  }

  async createTransacao(userId: number, tipoTransacao: string, valor: number, date: Date) {
    return prisma.transacao.create({
      data: {
        contaId: userId,
        tipoTransacao,
        valor,
        date,
      },
    });
  }

  async DeletarTransacao(transacaoId: number) {
    const transacao = await this.getTransacoesById(transacaoId);

    if (transacao !== null) {
      const saldo = await this.saldoRepository.findByUserId(transacao.contaId);

      if (saldo != null) {
        const newSaldo =
          transacao.tipoTransacao === "transferencia"
            ? saldo.total + (transacao.valor ?? 0)
            : saldo.total - (transacao.valor ?? 0);

        await this.saldoRepository.updateSaldo(transacao.contaId, newSaldo);
      }
    }

    return prisma.transacao.delete({
      where: {
        id: transacaoId,
      },
    });
  }
}

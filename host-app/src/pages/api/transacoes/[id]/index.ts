import TransacoesRepository from "@/repositories/TransacoesRepository";
import { NextApiRequest, NextApiResponse } from "next";

const transacoesRepository = new TransacoesRepository();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const transacaoId = parseInt(id as string, 10);

  if (isNaN(transacaoId) || transacaoId <= 0) {
    return res.status(400).json({ error: "transacaoId não fornecido ou inválido." });
  }

  try {
    // Método GET
    if (req.method === "GET") {
      const transacao = await transacoesRepository.getTransacoesById(transacaoId);

      if (!transacao) {
        return res.status(404).json({ error: "Transação não encontrada." });
      }

      return res.status(200).json(transacao);
    }

    // Método PUT
    if (req.method === "PUT") {
      const { tipoTransacao, valor, date } = req.body;

      const transacaoExistente = await transacoesRepository.getTransacoesById(transacaoId);

      if (!transacaoExistente) {
        return res.status(404).json({ error: "Transação não encontrada." });
      }

      const transacaoAtualizada = await transacoesRepository.updateTransacao(
        transacaoId,
        tipoTransacao,
        valor,
        new Date(date)
      );

      return res.status(200).json(transacaoAtualizada);
    }

    // Método não permitido
    return res.setHeader("Allow", ["GET", "PUT"]).status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(`Erro ao processar a transação (método ${req.method}):`, error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

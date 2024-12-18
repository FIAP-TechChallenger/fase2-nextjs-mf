import TransacoesRepository from "@/repositories/TransacoesRepository";
import { NextApiRequest, NextApiResponse } from "next";

const transacoesRepository = new TransacoesRepository();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const userId = parseInt((req.query.userId as string) || "0", 10);

    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: "userId não fornecido ou inválido." });
    }

    try {
      const transacoes = await transacoesRepository.getTransacoesByUserId(userId);

      if (!transacoes) {
        return res.status(404).json({ error: "Transação não encontrada." });
      }
      return res.status(200).json(transacoes);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      return res.status(500).json({ error: "Erro ao buscar transação." });
    }
  }

  if (req.method === "POST") {
    const { userId, tipoTransacao, valor, date } = req.body;

    try {
      if (!userId) {
        return res.status(400).json({ error: "userId não fornecido." });
      }
      const novaTransacao = await transacoesRepository.createTransacao(userId, tipoTransacao, valor, date);

      return res.status(201).json(novaTransacao);
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      return res.status(500).json({ error: "Erro ao criar transação." });
    }
  }

  if (req.method === "PUT") {
    const id = parseInt((req.query.id as string) || "0", 10);
    const { tipoTransacao, valor, date } = req.body;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "id não fornecido ou inválido." });
    }

    try {
      const transacaoExistente = await transacoesRepository.getTransacoesById(id);

      if (!transacaoExistente) {
        return res.status(404).json({ error: "Transação não encontrada." });
      }

      const transacaoAtualizada = await transacoesRepository.updateTransacao(id, tipoTransacao, valor, date);

      return res.status(200).json(transacaoAtualizada);
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
      return res.status(500).json({ error: "Erro ao atualizar transação." });
    }
  }

  if (req.method === "DELETE") {
    const id = parseInt((req.query.id as string) || "0", 10);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID não fornecido ou inválido." });
    }

    try {
      const transacaoDeletada = await transacoesRepository.DeletarTransacao(id);

      if (!transacaoDeletada) {
        return res.status(404).json({ error: "Transação não encontrada." });
      }

      return res.status(200).json({ message: "Transação deletada com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
      return res.status(500).json({ error: "Erro ao deletar transação." });
    }
  }

  // Caso o método não seja permitido
  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

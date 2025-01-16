"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  DeleteTransacao,
  getSaldo,
  getTransacoes,
  postSaldo,
  postTransacao,
  putTransacoes,
} from "../services/transacoesServices";
import { useSession } from "next-auth/react";
import { Transacao, TransacoesContextData } from "@/shared/models/Transacao";
import { TipoTransacao } from "@/shared/types/TipoTransacao";

const TransacoesContext = createContext<TransacoesContextData | undefined>(undefined);

export function TransacoesProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const user = (session?.user as any) || {};
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [saldo, setSaldo] = useState<number>(0);

  // const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (session?.user?.id) {
      const fetchData = async () => {
        try {
          const [saldoResult, transacoesResult] = await Promise.allSettled([
            getSaldo(session.user.id),
            getTransacoes(session.user.id),
          ]);

          if (saldoResult.status === "fulfilled") setSaldo(saldoResult.value);
          if (transacoesResult.status === "fulfilled") setTransacoes(transacoesResult.value);
        } catch (error) {
          console.error("Erro ao buscar dados no servidor:", error);
        } finally {
          // setLoading(false);
        }
      };

      fetchData();
    }
  }, [session]);

  const atualizarSaldo = async () => {
    try {
      if (!user?.id) return;
      const saldoAtualizado = await getSaldo(user.id);
      setSaldo(saldoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar saldo:", error);
    }
  };

  const atualizaTransacoes = async () => {
    try {
      if (!user?.id) return;
      const transacoesAtualizadas = await getTransacoes(user.id);
      setTransacoes(transacoesAtualizadas);
    } catch (error) {
      console.log("Erro ao atualizar as transações", error);
    }
  };

  const deposito = async (valor: number) => {
    try {
      if (!user?.id) throw new Error("Usuário não autenticado.");
      const novoSaldo = saldo + valor;
      await postSaldo(user.id, novoSaldo);
      await atualizarSaldo();
    } catch (error) {
      console.error("Erro ao realizar depósito:", error);
    }
  };

  const transferencia = async (valor: number) => {
    try {
      if (!user?.id) throw new Error("Usuário não autenticado.");
      const novoSaldo = saldo - valor;
      await postSaldo(user.id, novoSaldo);
      await atualizarSaldo();
    } catch (error) {
      console.error("Erro ao realizar transferência:", error);
    }
  };

  const novaTransacao = async (
    tipoTransacao: TipoTransacao,
    valor: number,
    date: string,
    userId: number,
    anexo?: File
  ) => {
    if (tipoTransacao === TipoTransacao.TRANSFERENCIA && !verificaSaldo(valor)) {
      alert("Saldo insuficiente para realizar a transferência.");
      return;
    }

    const transacao: Transacao = { userId, tipoTransacao, valor, date, anexo };
    const result = await postTransacao(transacao);
    if (result) await atualizaTransacoes();
  };

  const verificaSaldo = (valor: number): boolean => {
    if (valor > saldo) {
      return false;
    }
    return true;
  };

  const atualizarTransacao = async (
    transacaoId: number,
    tipoTransacao: string,
    valor: number,
    date: string,
    anexo?: File
  ) => {
    try {
      if (!user?.id) throw new Error("Usuário não autenticado.");

      const transacaoAtualizada = { transacaoId, tipoTransacao, valor, date, anexo };
      const result = await putTransacoes(transacaoAtualizada);
      if (result) {
        await atualizaTransacoes();
        await atualizarSaldo();
      }
      return result;
    } catch (error) {
      console.error("Erro ao atualizar a transação:", error);
      return false;
    }
  };

  const deletarTransacao = async (transacaoId: number) => {
    try {
      if (!transacaoId) throw new Error("Usuário não autenticado.");
      await DeleteTransacao(transacaoId);
      await atualizarSaldo();
      await atualizaTransacoes();
    } catch (error) {
      console.error("Erro ao deletar a transação context:", error);
    }
  };

  return (
    <TransacoesContext.Provider
      value={{ transacoes, saldo, deposito, transferencia, novaTransacao, atualizarTransacao, deletarTransacao, user }}
    >
      {children}
    </TransacoesContext.Provider>
  );
}

export function useTransacoesContext() {
  const context = useContext(TransacoesContext);
  if (!context) {
    throw new Error("useTransacoesContext deve ser usado dentro de um TransacoesProvider");
  }
  return context;
}

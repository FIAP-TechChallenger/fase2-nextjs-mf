"use client";

import { useState, useEffect } from "react";
import { getSaldo, getTransacoes } from "@/services/transacoesServices";
import Aside from "@/components/layout/Aside";
import { Transacao } from "@/context/TransacoesContext";
import CardNovaTransacao from "@/components/layout/transacao/CardNovaTransacao";
import Extrato from "@/components/layout/transacao/Extrato";
import Saldo from "@/components/layout/transacao/Saldo";
import LayoutLogado from "@/components/layout/LayoutLogado";

interface ContainerProps {
  userId: number;
  saldoInicial: number;
  transacoesIniciais: Transacao[];
}

export default function Container({ saldoInicial, transacoesIniciais, userId }: ContainerProps) {
  const [saldo, setSaldo] = useState(saldoInicial);
  const [transacoes, setTransacoes] = useState(transacoesIniciais);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [saldoResult, transacoesResult] = await Promise.allSettled([getSaldo(userId), getTransacoes(userId)]);

        if (saldoResult.status === "fulfilled") setSaldo(saldoResult.value);
        if (transacoesResult.status === "fulfilled") setTransacoes(transacoesResult.value);

        if (saldoResult.status === "fulfilled") setSaldo(saldoResult.value);
        if (transacoesResult.status === "fulfilled") setTransacoes(transacoesResult.value);
      } catch (error) {
        console.error("Erro ao buscar dados no servidor:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <LayoutLogado>
      <div className="flex flex-col lg:flex-row lg:justify-center overflow-auto max-w-[1024px] mx-auto max-sm:px-6 max-md:px-[3.75rem] p-6 pb-8 w-full h-full gap-8 lg:gap-4">
        <Aside removeOnMobile={true} />
        <div className="flex flex-col w-full lg:max-w-[690px] h-max gap-8">
          <Saldo saldo={saldo} />
          <CardNovaTransacao />
        </div>
        <Extrato transacoesIniciais={transacoes} />
      </div>
    </LayoutLogado>
  );
}
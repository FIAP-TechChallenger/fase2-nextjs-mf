"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/index";
import {
  setTipoFiltroTransacao,
  setDataInicio,
  setDataFim,
  atualizarTransacoesFiltradas,
} from "@/features/FilterTransactions/filterTransactions";
import { TiposTransacao } from "@/shared/types/TipoTransacao";
import Button from "@/components/ui/Button";
import { ButtonColors } from "@/shared/types/Button";
import Input from "@/components/forms/Input";
import ListaTransacoes from "./ListaTransacoes";

export default function TransacoesPage({userId }: any) {
  
  const dispatch: AppDispatch = useDispatch();
  const { transacoesFiltradas, tipoFiltroTransacao, dataInicio, dataFim } = useSelector(
    (state: RootState) => state.filterTransaction
  );

  const transacoes = useSelector((state: RootState) => state.filterTransaction.transacoesFiltradas);
  console.log('transaçoes em transaçoes page', transacoes)

  const handleFiltrarTransacoes = () => {
    dispatch( atualizarTransacoesFiltradas());
  };

  function getFiltroTipoButtonColor(tipo: TiposTransacao): ButtonColors {
    return tipo === tipoFiltroTransacao ? "blue" : "gray";
  }

  return (
    <div className="bg-fiap-white shadow-md rounded-lg p-6 w-126">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">Transferências</h2>
      </div>

      <div className="flex flex-col bg-white border-[1px] rounded border-fiap-light-blue px-4 pt-3 pb-5">
        <span className="pb-3">Filtros</span>

        <div className="flex max-sm:flex-col gap-2 mb-4">
          <Button
            text="Todos"
            color={getFiltroTipoButtonColor("todos")}
            onClick={() => {
              dispatch(setTipoFiltroTransacao("todos"));
              handleFiltrarTransacoes();
            }}
          />
          <Button
            text="Depósitos"
            color={getFiltroTipoButtonColor("deposito")}
            onClick={() => {
              dispatch(setTipoFiltroTransacao("deposito"));
              handleFiltrarTransacoes();
            }}
          />
          <Button
            text="Transferências"
            color={getFiltroTipoButtonColor("transferencia")}
            onClick={() => {
              dispatch(setTipoFiltroTransacao("transferencia"));
              handleFiltrarTransacoes();
            }}
          />
        </div>

        <div className="flex max-sm:flex-col w-full gap-4">
          <Input
            type="date"
            value={dataInicio}
            label="Data início:"
            labelTextBold={false}
            name="dataInicio"
            onValueChanged={(value) => {
              dispatch(setDataInicio(value as string));
              handleFiltrarTransacoes();
            }}
          />
          <Input
            type="date"
            value={dataFim}
            label="Data fim:"
            labelTextBold={false}
            name="dataFim"
            onValueChanged={(value) => {
              dispatch(setDataFim(value as string ));
              handleFiltrarTransacoes();
            }}
          />
        </div>
      </div>

      <ListaTransacoes transacoes={transacoesFiltradas} showActions={true} userId = {userId}/>
    </div>
  );
}

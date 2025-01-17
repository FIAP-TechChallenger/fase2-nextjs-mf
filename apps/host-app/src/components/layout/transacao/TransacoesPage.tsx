import React, { useState } from "react";
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

const ITENS_POR_PAGINA = 5; 

export default function TransacoesPage({ userId }: any) {
  const dispatch: AppDispatch = useDispatch();
  const { transacoesFiltradas, tipoFiltroTransacao, dataInicio, dataFim } = useSelector(
    (state: RootState) => state.filterTransaction
  );

  const [paginaAtual, setPaginaAtual] = useState(1); 

  const totalPaginas = Math.ceil(transacoesFiltradas.length / ITENS_POR_PAGINA);

  const transacoesExibidas = transacoesFiltradas.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  const handlePaginaChange = (pagina: number) => {
    setPaginaAtual(pagina);
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
              dispatch(atualizarTransacoesFiltradas());
            }}
          />
          <Button
            text="Depósitos"
            color={getFiltroTipoButtonColor("deposito")}
            onClick={() => {
              dispatch(setTipoFiltroTransacao("deposito"));
              dispatch(atualizarTransacoesFiltradas());
            }}
          />
          <Button
            text="Transferências"
            color={getFiltroTipoButtonColor("transferencia")}
            onClick={() => {
              dispatch(setTipoFiltroTransacao("transferencia"));
              dispatch(atualizarTransacoesFiltradas());
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
              dispatch(atualizarTransacoesFiltradas());
            }}
          />
          <Input
            type="date"
            value={dataFim}
            label="Data fim:"
            labelTextBold={false}
            name="dataFim"
            onValueChanged={(value) => {
              dispatch(setDataFim(value as string));
              dispatch(atualizarTransacoesFiltradas());
            }}
          />
        </div>
      </div>

      <ListaTransacoes transacoes={transacoesExibidas} showActions={true} userId={userId} />

      {/* Botões de Paginação */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
          <Button
            key={pagina}
            text={String(pagina)}
            color={pagina === paginaAtual ? "blue" : "gray"}
            onClick={() => handlePaginaChange(pagina)}
          />
        ))}
      </div>
    </div>
  );
}

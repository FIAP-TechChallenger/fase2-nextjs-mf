"use client";

import { useTransacoesContext } from "@/context/TransacoesContext";
import { FormEditarTransacaoProps } from "@/shared/models/Formulario";
import Input from "@/components/forms/Input";
import InputSelect from "@/components/forms/InputSelect";
import { InputSelectOption } from "@/shared/models/Input";
import Button from "@/components/ui/Button";
import { useRef, useState } from "react";
import FileUploader, { FileUploaderRef } from "@/components/forms/FileUploader";
import TransacaoAnexoDownload from "./TransacaoAnexoDownload";
import InputLabel from "@/components/forms/InputLabel";
import {Transacao }from '../../../shared/models/Transacao'
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useSession } from "next-auth/react";
import { atualizarTransacaoBanco } from "@/features/transactions/transactionSlice";

export default function FormEditarTransacao(options: FormEditarTransacaoProps) {
  const fileUploaderRef = useRef<FileUploaderRef>();
  const [formData, setFormData] = useState<Transacao>(options.transacao);
  const {data: session} = useSession();
  const user = session?.user;


  // const listaTransacoes = useSelector((state : any)=> state.transaction.transacoes);
  // console.log("lista de transacoes form nova transacaoS",listaTransacoes) 
  // const saldo = useSelector((state : any)=> state.transaction.saldo);
  // console.log("saldo form editar transaçao",saldo)

  const dispatch = useDispatch<AppDispatch>();

  const tiposTransacao: InputSelectOption[] = [
    { value: "", label: "Selecione o Tipo" },
    { value: "transferencia", label: "Transferência" },
    { value: "deposito", label: "Depósito" },
  ];

  function onCancelClicked() {
    if (options.onCancelClicked) options.onCancelClicked();
  }

  function onAnexoRemoved() {
    setFormData({ ...formData, anexoName: undefined });
  }
  const handleChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Dados inválidos! Verifique os campos.");
      return;
    }
     confirmarTransacao();
    // console.log("lista de transacoes form nova transacao depois ",listaTransacoes) 
  };

 
   const confirmarTransacao = async () => {
    const { tipoTransacao, valor, date, anexo } = formData;
    const result = await dispatch(
      atualizarTransacaoBanco({
        transacaoId: Number(options.transacao.id),
        tipoTransacao,
        valor,
        date,
        anexo,
        userId: user?.id || 0,
      })
    );
    console.log("result", result);
    console.log("", );

     if (options.onConfirmClicked) options.onConfirmClicked();
   };

  const isFormValid = () => {
    const { tipoTransacao, valor, date } = formData;

    if (!tipoTransacao || tipoTransacao.trim() === "") {
      return false;
    }
    if (valor <= 0 || isNaN(valor)) {
      return false;
    }
    if (!date || isNaN(new Date(date).getTime())) {
      return false;
    }

    return true;
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputSelect
          name="tipoTransacao"
          label="Tipo"
          options={tiposTransacao}
          style="dark"
          value={formData.tipoTransacao}
          onValueChanged={(value) => handleChange("tipoTransacao", value)}
        />
        <Input
          name="valor"
          type="number"
          label="Valor"
          style="dark"
          value={formData.valor}
          onValueChanged={(value) => handleChange("valor", Number(value))}
        />
        <Input
          name="date"
          type="date"
          label="Data"
          style="dark"
          value={formData.date}
          onValueChanged={(value) => handleChange("date", value)}
        />
        <FileUploader
          ref={fileUploaderRef}
          name="anexo"
          label={formData.anexoName ? "Alterar anexo" : "Anexo"}
          style="dark"
          accept="image/*,application/pdf,.docx,.xlsx"
          onValueChanged={(value) => handleChange("anexo", value)}
        />

        {formData.anexoName && (
          <div className="flex flex-col">
            <InputLabel text="Anexo salvo"></InputLabel>
            <TransacaoAnexoDownload displayType="anexoName" item={formData} onRemoveAnexo={onAnexoRemoved} />
          </div>
        )}

        <div className="flex gap-4">
          {options.showCancel && <Button type="button" text="Cancelar" color="red" onClick={onCancelClicked} />}
          <Button type="submit" text="Atualizar transação" color="blue" />
        </div>
      </form>
    </>
  );
}

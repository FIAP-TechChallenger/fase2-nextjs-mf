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
import { Transacao } from "../../../shared/models/Transacao";
import { TipoTransacao } from "@/shared/types/TipoTransacao";
import { DepositoCategorias, TransferenciaCategorias } from "@/shared/types/CategoriasPorTipoTransacao";

export default function FormEditarTransacao(options: FormEditarTransacaoProps) {
  const fileUploaderRef = useRef<FileUploaderRef>();
  const { atualizarTransacao } = useTransacoesContext();
  const [formData, setFormData] = useState<Transacao>(options.transacao);

  const tiposTransacao: InputSelectOption[] = [
    { value: "", label: "Selecione o Tipo" },
    { value: TipoTransacao.TRANSFERENCIA, label: "Transferência" },
    { value: TipoTransacao.DEPOSITO, label: "Depósito" },
  ];

  function onCancelClicked() {
    if (options.onCancelClicked) options.onCancelClicked();
  }

  function onAnexoRemoved() {
    setFormData({ ...formData, anexoName: undefined });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Dados inválidos! Verifique os campos.");
      return;
    }
    confirmarTransacao();
  };

  const handleChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const confirmarTransacao = async () => {
    const { tipoTransacao, valor, date, anexo, categoria } = formData;
    const result = await atualizarTransacao(Number(options.transacao.id), tipoTransacao, valor, date, anexo, categoria);
    if (result && options.onConfirmClicked) options.onConfirmClicked();
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
        <InputSelect
          name="categoria"
          label="Categoria"
          options={
            formData.tipoTransacao === TipoTransacao.TRANSFERENCIA ? TransferenciaCategorias : DepositoCategorias
          }
          style="dark"
          value={formData.categoria || ""}
          onValueChanged={(value) => handleChange("categoria", value)}
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

"use client";

import {  useTransacoesContext } from "@/context/TransacoesContext";
import { FormEditarTransacaoProps } from "../../../shared/models/Formulario";
import Input from "@/components/forms/Input";
import InputSelect, { InputSelectOption } from "@/components/forms/InputSelect";
import Button from "@/components/ui/Button";
import { useState } from "react";


export default function FormEditarTransacao(options: FormEditarTransacaoProps) {
  const { atualizarTransacao } = useTransacoesContext();
  const [formData, setFormData] = useState(options.transacao);

  const tiposTransacao: InputSelectOption[] = [
    { value: "", label: "Selecione o Tipo" },
    { value: "transferencia", label: "Transferência" },
    { value: "deposito", label: "Depósito" },
  ];

  function onCancelClicked() {
    if (options.onCancelClicked) options.onCancelClicked();
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Dados inválidos! Verifique os campos.");
      return;
    }
    confirmarTransacao();
  };

  const handleChange = (name: string, value: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const confirmarTransacao = () => {
    const { tipoTransacao, valor, date } = formData;
    atualizarTransacao(Number(options.transacao.id), tipoTransacao, valor, date);

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
          onValueChanged={(value) => handleChange("valor", value)}
        />
        <Input
          name="date"
          type="date"
          label="Data"
          style="dark"
          value={formData.date}
          onValueChanged={(value) => handleChange("date", value)}
        />

        <div className="flex gap-4">
          {options.showCancel && <Button type="button" text="Cancelar" color="red" onClick={onCancelClicked} />}
          <Button type="submit" text="Atualizar transação" color="blue" />
        </div>
      </form>
    </>
  );
}

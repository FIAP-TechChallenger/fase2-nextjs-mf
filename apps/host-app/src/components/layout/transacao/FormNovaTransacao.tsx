"use client";
import { useState } from "react";
import InputSelect from "@/components/forms/InputSelect";
import Input from "@/components/forms/Input";
import Button from "@/components/ui/Button";
import { TipoTransacao } from "@/shared/types/TipoTransacao";
import {FormularioProps } from '../../../shared/models/Formulario'
import { InputSelectOption } from '../../../shared/models/Input'

export default function FormNovaTransacao({ deposito, transferencia, novaTransacao, userId }: FormularioProps) {
  const [formData, setFormData] = useState({
    tipoTransacao: "deposito",
    valor: 0,
    date: new Date().toISOString(),
  });

  const tiposTransacao: InputSelectOption[] = [
    { value: "", label: "Selecione o Tipo" },
    { value: "transferencia", label: "Transferência" },
    { value: "deposito", label: "Depósito" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Dados inválidos! Verifique os campos.");
      return;
    }

    processarTransacao();
    resetForm();
  };

  const handleChange = (name: string, value: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const processarTransacao = () => {
    const { tipoTransacao, valor, date } = formData;

    novaTransacao(tipoTransacao, valor, date, userId);

    if (tipoTransacao === TipoTransacao.DEPOSITO) {
      deposito(valor);
    } else if (tipoTransacao === TipoTransacao.TRANSFERENCIA) {
      transferencia(valor);
    } else {
      throw new Error("Tipo de Transação é inválido!");
    }
  };
  const resetForm = () => {
    setFormData({
      tipoTransacao: "deposito",
      valor: 0,
      date: new Date().toISOString(),
    });
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

      <Button type="submit" text="Adicionar Transação" color="blue" />
    </form>
  );
}

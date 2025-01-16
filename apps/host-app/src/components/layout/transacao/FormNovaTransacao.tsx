"use client";
import { useRef, useState } from "react";
import InputSelect from "@/components/forms/InputSelect";
import Input from "@/components/forms/Input";
import Button from "@/components/ui/Button";
import { TipoTransacao } from "@/shared/types/TipoTransacao";
import { FormularioProps } from "@/shared/models/Formulario";
import { InputSelectOption } from "@/shared/models/Input";
import FileUploader, { FileUploaderRef } from "@/components/forms/FileUploader";

type TransacaoForm = {
  tipoTransacao: TipoTransacao;
  valor: number;
  date: string;
  anexo?: File;
};

export default function FormNovaTransacao({ deposito, transferencia, novaTransacao, userId }: FormularioProps) {
  const fileUploaderRef = useRef<FileUploaderRef>();
  const [formData, setFormData] = useState<TransacaoForm>({
    tipoTransacao: TipoTransacao.DEPOSITO,
    valor: 0,
    date: new Date().toISOString(),
  });

  const tiposTransacao: InputSelectOption[] = [
    { value: "", label: "Selecione o Tipo" },
    { value: TipoTransacao.TRANSFERENCIA, label: "Transferência" },
    { value: TipoTransacao.DEPOSITO, label: "Depósito" },
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

  const handleChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const processarTransacao = () => {
    const { tipoTransacao, valor, date, anexo } = formData;

    novaTransacao(tipoTransacao, valor, date, userId, anexo);

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
      tipoTransacao: TipoTransacao.DEPOSITO,
      valor: 0,
      date: new Date().toISOString(),
      anexo: undefined,
    });
    fileUploaderRef.current?.clear();
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
      <FileUploader
        ref={fileUploaderRef}
        name="anexo"
        label="Anexo"
        style="dark"
        accept="image/*,application/pdf,.docx,.xlsx"
        onValueChanged={(value) => handleChange("anexo", value)}
      />

      <Button type="submit" text="Adicionar Transação" color="blue" />
    </form>
  );
}

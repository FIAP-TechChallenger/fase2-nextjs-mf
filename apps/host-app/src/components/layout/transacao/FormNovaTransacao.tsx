"use client";

import { useRef, useState } from "react";
import InputSelect from "@/components/forms/InputSelect";
import Input from "@/components/forms/Input";
import Button from "@/components/ui/Button";
import FileUploader, { FileUploaderRef } from "@/components/forms/FileUploader";
import { InputSelectOption } from "@/shared/models/Input";
import { TipoTransacao } from "@/shared/types/TipoTransacao";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { novaTransacaoBanco, realizarDeposito } from "@/features/transactions/transactionSlice";

// Define o tipo para os dados do formulário
type TransacaoForm = {
  tipoTransacao: string;
  valor: number;
  date: string;
  anexo?: File;
};

type FormularioProps = {
  userId: string | number;
};

export default function FormNovaTransacao({ userId }: FormularioProps) {
  const fileUploaderRef = useRef<FileUploaderRef>();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<TransacaoForm>({
    tipoTransacao: "deposito",
    valor: 0,
    date: new Date().toISOString(),
  });

  const tiposTransacao: InputSelectOption[] = [
    { value: "", label: "Selecione o Tipo" },
    { value: "transferencia", label: "Transferência" },
    { value: "deposito", label: "Depósito" },
  ];

  const saldoRedux = useSelector((state: any) => state.transaction.saldo); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      await processarTransacao();
      resetForm();
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      alert("Erro ao adicionar transação. Tente novamente mais tarde.");
    }
  };

  const handleChange = (name: string, value: string | number | File | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const processarTransacao = async () => {
    const { tipoTransacao, valor, date, anexo } = formData;

    if (!userId) {
      throw new Error("Usuário inválido!");
    }

    await dispatch(
      novaTransacaoBanco({
        userId : Number(userId),
        tipoTransacao,
        valor,
        date,
        anexo,
      })
    ).unwrap();

    if (tipoTransacao === TipoTransacao.DEPOSITO) {
     const novoSaldo : number = saldoRedux + valor
     console.log("novo saldo para o realizar deposito",novoSaldo)
           await dispatch(
            realizarDeposito({userId : Number(userId),valor: novoSaldo})
          );
         }
    else if (tipoTransacao === TipoTransacao.TRANSFERENCIA){
      const novoSaldo : number = saldoRedux - valor
      console.log("novo saldo para o realizar transferencia ",novoSaldo)
      await dispatch(realizarDeposito({userId : Number(userId),valor: novoSaldo}))
      
    }  
     else {
           throw new Error("Tipo de Transação é inválido!");
        }
  };

  console.log("saldo redux formulario",saldoRedux)
  const resetForm = () => {
    setFormData({
      tipoTransacao: "deposito",
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

import { Transacao } from "../models/Transacao";

export interface FormEditarTransacaoProps {
  transacao: Transacao;
  showCancel?: boolean;
  onCancelClicked?: { (): void };
  onConfirmClicked?: { (): void };
}

export interface FormularioProps {
  deposito: (valor: number) => void;
  transferencia: (valor: number) => void;
  novaTransacao: (tipo: string, valor: number, date: string, userId: number, anexo?: File) => void;
  userId: number;
}

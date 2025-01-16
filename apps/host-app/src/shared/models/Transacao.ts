import { TipoTransacao } from "../types/TipoTransacao";
import { User } from "./User";

export interface Transacao {
  id?: number;
  userId: number;
  tipoTransacao: TipoTransacao;
  valor: number;
  date: string;
  anexo?: File;
  anexoName?: string;
}

export interface TransacoesContextData {
  transacoes: Transacao[];
  saldo: number;
  deposito: (valor: number) => Promise<void>;
  transferencia: (valor: number) => Promise<void>;
  novaTransacao: (
    tipoTransacao: TipoTransacao,
    valor: number,
    date: string,
    userId: number,
    anexo?: File
  ) => Promise<void>;
  atualizarTransacao: (
    transacaoId: number,
    tipoTransacao: TipoTransacao,
    valor: number,
    date: string,
    anexo?: File
  ) => Promise<boolean>;
  deletarTransacao: (transacaoId: number) => Promise<void>;
  user: User;
}
export interface ListaTransacoesOptions {
  transacoes: Transacao[];
  showActions: boolean;
}

export interface TransacaoModalConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tipoTransacao: TipoTransacao;
  valor: number;
  date: string;
  isSubmitting?: boolean;
}
export interface TransacaoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transacao: Transacao;
}
export interface TransacaoItemOptions {
  item: Transacao;
  showActions: boolean;
  onDownloadAttachmentClicked?: { (): void };
  onEditClicked?: { (): void };
  onDeleteClicked?: { (): void };
}

export interface TransacaoAnexoDownloadOptions {
  item: Transacao;
  displayType: "onlyButton" | "anexoName";
  onRemoveAnexo?: { (): void };
}

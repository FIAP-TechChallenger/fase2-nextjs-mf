import { User } from "./User";

export interface Transacao {
  id?: number;
  userId: number;
  tipoTransacao: string;
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
  novaTransacao: (tipoTransacao: string, valor: number, date: string, userId: number, anexo?: File) => Promise<void>;
  atualizarTransacao: (
    transacaoId: number,
    tipoTransacao: string,
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
  tipoTransacao: string;
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

export interface TransacaoForm  {
  tipoTransacao: string;
  valor: number;
  date: string;
  anexo?: File;
};

export interface CardNovaTransacaoProps {
  userId: number
}


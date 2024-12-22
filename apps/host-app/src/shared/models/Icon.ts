import { ButtonColors } from "../../components/ui/Button";

export interface IconOptions {
    /** Nome do icone */
    name: string;
    /** Estilos customizados. */
    className?: string;
  }

export interface IconButtonOptions {
  /** Nome do icone */
  icon: string;
  /** Cor do botão */
  color?: ButtonColors;
  /** Estilos customizados. */
  className?: string;
  /** Função executada quando é clicado no botão */
  onClick?: { (): void };
}
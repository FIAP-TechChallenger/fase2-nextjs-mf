"use client";

export interface IconOptions {
  /** Nome do icone */
  name: string;
  /** Estilos customizados. */
  className?: string;
  /** Título */
  title?: string;
}

export default function Icon(options: IconOptions) {
  return (
    <span className={`material-icons ${options.className || ""}`} title={options.title}>
      {options.name}
    </span>
  );
}

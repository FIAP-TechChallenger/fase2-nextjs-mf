import React, { ReactNode } from "react";

export interface ModalOptions {
    children: ReactNode;
    isOpen: boolean;
    className?: string;
  }
  
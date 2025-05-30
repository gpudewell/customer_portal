import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

export default function Portal({ children }: { children: ReactNode }) {
  return createPortal(children, document.body);
}
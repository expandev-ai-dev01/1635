import { ChangeEvent, ReactNode } from 'react';

export interface SelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

import { SelectProps } from './types';

export const Select = ({
  id,
  name,
  value,
  onChange,
  disabled = false,
  className = '',
  children,
}: SelectProps) => {
  const baseStyles =
    'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500';
  const disabledStyles = 'disabled:bg-gray-100 disabled:cursor-not-allowed';

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`${baseStyles} ${disabledStyles} ${className}`}
    >
      {children}
    </select>
  );
};

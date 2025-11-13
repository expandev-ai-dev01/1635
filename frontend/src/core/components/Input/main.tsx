import { InputProps } from './types';

export const Input = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  className = '',
}: InputProps) => {
  const baseStyles =
    'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500';
  const disabledStyles = 'disabled:bg-gray-100 disabled:cursor-not-allowed';

  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${baseStyles} ${disabledStyles} ${className}`}
    />
  );
};

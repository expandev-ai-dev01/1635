import { TextareaProps } from './types';

export const Textarea = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  className = '',
  rows = 4,
}: TextareaProps) => {
  const baseStyles =
    'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500';
  const disabledStyles = 'disabled:bg-gray-100 disabled:cursor-not-allowed';

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className={`${baseStyles} ${disabledStyles} ${className}`}
    />
  );
};

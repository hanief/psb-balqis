export default function Input({
  label,
  type,
  id,
  placeholder,
  value,
  isRequired,
  onChange,
}: {
  label: string
  type: string
  id: string
  placeholder: string
  isRequired?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}{isRequired && '*'}</label>
      <input
        type={type} 
        className="form-control" 
        id={id} 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        required={isRequired}
        aria-required={isRequired}
      />
    </div>
  )
}
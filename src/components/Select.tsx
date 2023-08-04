export default function Select({
  label,
  options,
  id,
  placeholder,
  isRequired,
  value,
  onChange,
}: {
  label: string
  options: { value: string, label: string }[]
  id: string
  placeholder?: string
  isRequired?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <select
        className="form-select"
        aria-label={label}
        id={id} 
        value={value}
        onChange={onChange}
        required={isRequired}
        aria-required={isRequired}
      >
        <option>{placeholder}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}
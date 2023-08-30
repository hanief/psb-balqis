import { FormGroup, Label, FormFeedback } from "reactstrap"
import Select, { components, DropdownIndicatorProps } from 'react-select'
import { useEffect, useState } from "react"
import { convertToTitleCase } from "@/utils"

export default function ValidatedInput({ name, label = '', options, value, required = false, onChange, ...props }) {
  const [localValue, setLocalValue] = useState(value || '')
  const [isDirty, setIsDirty] = useState(false)

  const invalid = required && !localValue

  useEffect(() => {
    setLocalValue(value || '')
  }, [value])

  function handleChange(option) {
    if (!isDirty) setIsDirty(true)
    setLocalValue(option.value || '')
    onChange(name, option.value)
  }

  function getBorderColor(state) {
    if (invalid) return 'rgb(220, 53, 69)'
    
    return 'rgb(222, 226, 230)'
  }

  function getBoxShadow(state) {
    if (state.isFocused) {
      if (invalid) return '0 0 0 0.2rem rgba(220, 53, 69,.25)'

      return '0 0 0 0.2rem rgba(25, 135, 84,.25)'
    }
    
    return null
  }

  return (
    <FormGroup>
      {label && (<Label for={name}>{label}</Label>)}
      <Select
        className={`${invalid ? 'is-invalid' : ''} ${invalid ? '' : 'is-valid'} ${isDirty ? 'is-dirty' : ''}`}
        styles={{
          control: (provided, state) => ({
            ...provided,
            borderWidth: '1px',
            borderColor: getBorderColor(state),
            boxShadow: getBoxShadow(state),
            '&:hover': {
              borderColor: getBorderColor(state),
            },
          })
        }}
        components={{ DropdownIndicator }}
        id={name}
        name={name}
        options={options}
        value={options?.find(opt => opt.value === localValue) || null}
        aria-invalid={invalid}
        onChange={handleChange}
        {...props}
      />
      <FormFeedback>{invalid && `${label || convertToTitleCase(name)} harus diisi`}</FormFeedback>
    </FormGroup>
  )
}

const DropdownIndicator = ({selectProps, ...props}: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator selectProps={selectProps} {...props}>
      {selectProps.className?.includes('is-invalid') ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" height="18" width="18" fill="none" stroke="#dc3545">
          <circle cx="6" cy="6" r="4.5" />
          <path strokeLinejoin="round" d="M5.8 3.6h.4L6 6.5z" />
          <circle cx="6" cy="8.2" r=".6" fill="#dc3545" stroke="none" />
        </svg>
      ) : (
        props.children
      )}
    </components.DropdownIndicator>
  );
};
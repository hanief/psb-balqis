import { FormGroup, Label, Input, FormFeedback } from "reactstrap"

export default function ValidatedInput({ className = '', name, label = '', valid = true, required = false, onChange, ...props }) {
  function convertToTitleCase(str) {
    if (!str) return ''

    return str.replaceAll('_', ' ').replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  function handleChange(event) {
    onChange(name, event.target.value)
  }

  return (
    <FormGroup className={className}>
      {label && (<Label for={name}>{label}</Label>)}
      <Input
        id={name}
        name={name}
        invalid={!valid}
        aria-invalid={!valid}
        required={required}
        aria-required={required}
        onChange={handleChange}
        {...props}
      />
      <FormFeedback>{!valid && `${label || convertToTitleCase(name)} harus diisi`}</FormFeedback>
    </FormGroup>
  )
}
import Select, {components, StylesConfig} from 'react-select'
import {Button} from 'reactstrap'
import {useRef} from 'react'

export default function MultiSelect({
  options,
  selectedOptions,
  setSelectedOptions,
  showSelectAllButton = true,
  selectAllOptionsLabel = 'Select All',
  selectOptionsLabel = 'Select Options',
  emptyOptionsLabel = 'No Options',
  selectedOptionsLabel = 'selected',
  ...props
}) {
  const selectRef = useRef(null)

  const Option = props => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">{props.label}</div>
          <div>
            {props.isSelected && <i className="bi-check text-primary" />}
          </div>
        </div>
      </components.Option>
    )
  }

  const ValueContainer = props => {
    return (
      <components.ValueContainer {...props}>
        {selectedOptions?.length > 0 && (
          <span className="text-body">
            {`${selectedOptions.length} ${selectedOptionsLabel}`}
          </span>
        )}
        {props.children}
      </components.ValueContainer>
    )
  }

  const IndicatorsContainer = props => {
    return (
      <components.IndicatorsContainer {...props}>
        {showSelectAllButton && !(selectedOptions.length === options.length) && (
          <>
            <Button size='sm' color="link" className='select-secondary' onClick={() => setSelectedOptions(options)}>
              {selectAllOptionsLabel}
            </Button>
            <components.IndicatorSeparator {...props}/>
          </>
        )}
        {props.children}
      </components.IndicatorsContainer>
    )
  }

  const MultiValueContainer = () => {
    return null
  }

  const Placeholder = props => {
    return (
      <components.Placeholder {...props}>
        {options.length > 0 ? (
          <span>{selectOptionsLabel}</span>
        ) : (
          <span>{emptyOptionsLabel}</span>
        )}
      </components.Placeholder>
    )
  }

  const colorStyles: StylesConfig = {
    option: (styles, {isDisabled, isFocused}) => {
      return {
        ...styles,
        backgroundColor: isFocused ? '#f5f5f5' : 'white',
        color: isDisabled ? '#ccc' : 'black'
      }
    }
  }

  return (
    <Select
      components={{
        IndicatorsContainer,
        Option,
        ValueContainer,
        Placeholder,
        MultiValueContainer
      }}
      ref={selectRef}
      options={options}
      value={selectedOptions}
      onChange={newValues => setSelectedOptions(newValues)}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      isClearable={true}
      openMenuOnFocus={true}
      styles={colorStyles}
      isDisabled={options.length === 0 || props.disabled}
      {...props}
    />
  )
}

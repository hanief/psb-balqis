import { Stepper } from "react-form-stepper";

const CustomStepper = ({activeStep, steps, setActiveStep, isClickable}) => {
  return <Stepper 
    activeStep={activeStep}
    steps={steps}
    stepClassName="bg-balqis"
    onClick={event => {
      if (isClickable) {
        const input = event.target as HTMLElement
        const currentStep = parseInt(input.innerText)
        if (currentStep <= 3) {
          setActiveStep(currentStep - 1)
        }
      }
    }}
    styleConfig={{
      activeBgColor: '#e44600',
      activeTextColor: '#fff',
      completedBgColor: '#2a833b',
      completedTextColor: '#fff',
      inactiveBgColor: '#f0f0f0',
      inactiveTextColor: '#000',
      size: '2em',
      circleFontSize: '1rem',
      labelFontSize: '0.875rem',
      borderRadius: '50%',
      fontWeight: '500'
    }}
  />
};

export default CustomStepper;
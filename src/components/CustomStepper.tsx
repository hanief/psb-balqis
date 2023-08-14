import { Stepper } from "react-form-stepper";

const CustomStepper = ({activeStep, steps, setActiveStep}) => {
  return <Stepper 
    activeStep={activeStep}
    steps={steps}
    stepClassName="bg-balqis"
    onClick={event => {
      const currentStep = parseInt(event.target.innerText)
      if (currentStep <= 3) {
        setActiveStep(currentStep - 1)
      }
    }}
    styleConfig={{
      activeBgColor: '#7cac33',
      activeTextColor: '#fff',
      completedBgColor: '#2a833b',
      completedTextColor: '#fff',
      inactiveBgColor: '#f0f0f0',
      inactiveTextColor: '#2a833b',
      size: '2em',
      circleFontSize: '1rem',
      labelFontSize: '0.875rem',
      borderRadius: '50%',
      fontWeight: '500'
    }}
  />
};

export default CustomStepper;
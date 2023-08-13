import { Stepper } from "react-form-stepper";

const CustomStepper = ({activeStep, steps, setActiveStep}) => {
  return <Stepper 
    activeStep={activeStep}
    steps={steps}
    stepClassName="bg-balqis"
    onClick={event => {
      setActiveStep(parseInt(event.target.innerText) - 1)
    }}
    styleConfig={{
      activeBgColor: '#2a833b',
      activeTextColor: '#fff',
      completedBgColor: '#7cac33',
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
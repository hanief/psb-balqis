import { Stepper } from "react-form-stepper";

const CustomStepper = ({activeStep, steps}) => {
  return <Stepper 
    activeStep={activeStep}
    steps={steps}
    stepClassName="bg-balqis"
    styleConfig={{
      activeBgColor: '#2a833b',
      activeTextColor: '#fff',
      completedBgColor: '#a10308',
      completedTextColor: '#fff',
      inactiveBgColor: '#e0e0e0',
      inactiveTextColor: '#ffffff',
      size: '2em',
      circleFontSize: '1rem',
      labelFontSize: '0.875rem',
      borderRadius: '50%',
      fontWeight: '500'
    }}
  />
};

export default CustomStepper;
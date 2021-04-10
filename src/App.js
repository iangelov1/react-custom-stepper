import React, { useState, useEffect } from 'react';
import Stepper from './stepper/Stepper';

import "./App.scss";


const App = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const stepsArray = [ "Add personal info", "Add payment details", "Complete registration", "Registration complete" ];

    const handleClick = (clickType) => {
        let newStep = currentStep;
        clickType === "next" ? newStep++ : newStep--;

        if (newStep > 0 && newStep <= 5) {
            setCurrentStep(newStep)
        }
    }
    
    return (
        <>
            <div className="stepper-container-horizontal">
                <Stepper 
                    stepsArray={stepsArray} 
                    direction="horizontal"
                    currentStepNumber={currentStep}
                />
            </div>

            <div className="buttons-container">
                <button onClick={() => handleClick()}>Previous</button>
                <button onClick={() => handleClick("next")}>Next</button>
            </div>
        </>
    )
}

export default App

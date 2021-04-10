import React, { useState, useEffect, useRef } from 'react'
import "./Stepper.scss";

const Stepper = ({ stepsArray, direction, currentStepNumber }) => {
    const [steps, setSteps] = useState([
        {
            description: "Create an application",
            completed: false,
            selected: true,
            highlighted: true
        },
        {
            description: "Add personal data",
            completed: false,
            selected: false,
            highlighted: false
        },
        {
            description: "Add payment",
            completed: false,
            selected: false,
            highlighted: false
        },
        {
            description: "Submit application",
            completed: false,
            selected: false,
            highlighted: false
        }
    ]);

    const prevCountRef = useRef();

    useEffect(() => {
        const stepsState = stepsArray.map((step, index) => {
            const stepObj = {};
            stepObj.description = step;
            stepObj.highlighted = index === 0 ? true : false;
            stepObj.selected = index === 0 ? true : false;
            stepObj.completed = false;
            return stepObj;
        })

        const currentSteps = updateStep(currentStepNumber - 1, stepsState)

        setSteps(currentSteps)
    }, []);

    const updateStep = (stepNumber, steps) => {
        const newSteps = [...steps];

        let stepCounter = 0;

        while(stepCounter < newSteps.length) {
            if (stepCounter === stepNumber) {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted: true,
                    selected: true,
                    completed: false
                };
                stepCounter++;
            } else if (stepCounter < stepNumber) {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted: false,
                    selected: true,
                    completed: true
                };
                stepCounter++;
            } else {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted: false,
                    selected: false,
                    completed: false
                };
                stepCounter++;
            }
        }

        return newSteps;
    }

    useEffect(() => {
        prevCountRef.current = currentStepNumber;
    });

    const prevCount = prevCountRef.current;

    useEffect(() => {
        if (prevCount !== currentStepNumber) {
            const currentSteps = updateStep(currentStepNumber - 1, steps);

            setSteps(currentSteps)
        }
    }, [currentStepNumber]);

    const stepsDisplay = steps.map((step, index) => {
        return (
            <div className="step-wrapper" key={index}>
                <div className={`step-number ${step.selected ? "step-number-active" : "step-number-disabled"}`}>
                    {step.completed ? <span>&#10003;</span> : index + 1}
                </div>

                <div className={`step-description ${step.highlighted && "step-description-active"}`}>
                    {step.description}
                </div>

                <div className={index !== stepsArray.length - 1 && (`divider-line divider-line-${stepsArray.length}`)} />
            </div>
        )
    })

    return (
        <div className={`stepper-wrapper-${direction}`}>
           {stepsDisplay}
        </div>
    )
}

export default Stepper;
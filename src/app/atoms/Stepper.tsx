import React, {FC} from 'react'

import classNames from "clsx";

import styles from 'app/atoms/Stepper.module.css'
import { ReactComponent as OkIcon } from "app/icons/ok.svg";


interface Props {
    style: React.CSSProperties;
    steps: {
        label: string
    }[]
    currentStep: number
}

const Stepper: FC<Props> = ({ style, steps, currentStep = 2 }) => (
        <div className={classNames(styles['stepperWrapper'])} style={style}>
            {steps.map((stepItem, index) => (
                <div className='stepBlock' key={stepItem.label + index}>
                    <p>{stepItem.label}</p>
                    <div className={styles['stepWrapper']}>
                        <div
                            onClick={() => console.log({index})}
                            className={
                                classNames(styles['circle'], currentStep === index && styles['circle-active'], currentStep > index && styles['circle-passed'])
                            }
                        >
                            {currentStep > index && <OkIcon style={{width: '14px', height: '14px'}}/>}
                        </div>
                        {index !== steps.length - 1 && (
                            <div className={classNames(styles['line'], currentStep > index && styles['line-active'])} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    )


export default Stepper;
import { useEffect, useRef, useState } from 'react';
import './CustomInput.scss';
import { INPUT_NUMBER } from '../../Constants';

export const CustomInput = ({
    inputType,
    inputName,
    value,
    onChange,
    placeholderText = '',
}: {
    inputType: string;
    inputName: string;
    value: string | number | undefined;
    onChange: ((e: any) => void) | (() => void);
    placeholderText?: string;
}) => {
    const [width, setWidth] = useState(10);
    const span = useRef<any>();

    useEffect(() => {
        if (span && span.current) {
            const newWidth =
                span.current.offsetWidth >= 10 ? span.current.offsetWidth : 10;

            setWidth(newWidth);
        }
    }, [value]);

    const highlightOnFocus = (e: any) => {
        e.target.select();
    };

    const cleanNumbersOnChange = (e: any) => {
        const incomingValue = e.target.value;
        if (inputType === INPUT_NUMBER) {
            const cleanNumber = Number(incomingValue).toString();
            onChange(cleanNumber);
        } else {
            onChange(incomingValue);
        }
    };
    const actualNumberValue =
        inputType === 'number' ? Number(value).toString() : value;
    return (
        <div className="input-wrapper flex-centered">
            <span className="hidden-horizontal-measurement" ref={span}>
                {value || value === 0 ? value : placeholderText}
            </span>
            <input
                className="custom-input"
                type={inputType}
                id={inputName}
                value={actualNumberValue}
                onChange={cleanNumbersOnChange}
                placeholder={placeholderText}
                // Using onFocus instead of onClick opens right mouse context menu for some reason
                onClick={highlightOnFocus}
                style={{ width }}
            />
        </div>
    );
};

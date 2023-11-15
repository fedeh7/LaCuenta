import { useEffect, useRef, useState } from 'react';
import './CustomInput.scss';

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
    const [width, setWidth] = useState(0);
    const span = useRef<any>();

    useEffect(() => {
        if (span && span.current) {
            const newWidth =
                span.current.offsetWidth >= 90 ? span.current.offsetWidth : 90;
            setWidth(newWidth);
        }
    }, [value]);
    const highlightOnFocus = (e: any) => {
        e.target.select();
    };

    return (
        <div className="input-wrapper">
            <span className="hidden-horizontal-measurement" ref={span}>
                {value}
            </span>
            <input
                className="custom-input"
                type={inputType}
                id={inputName}
                value={value}
                onChange={onChange}
                placeholder={placeholderText}
                // Using onFocus instead of onClick opens right mouse context menu for some reason
                onClick={highlightOnFocus}
                style={{ width }}
            />
        </div>
    );
};

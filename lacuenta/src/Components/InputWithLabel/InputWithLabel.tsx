import './InputWithLabel.scss';

export const InputWithLabel = ({
    inputType,
    inputName,
    labelText,
    value,
    onChange,
}: {
    inputType: string;
    inputName: string;
    labelText: string;
    value: string | number | undefined;
    onChange: ((e: any) => void) | (() => void);
}) => {
    return (
        <label htmlFor={inputName} className="custom-input-with-label">
            <p className="custom-input-with-label-text">{labelText}</p>
            <input
                className="custom-input-with-label-input"
                type={inputType}
                name={inputName}
                id={inputName}
                value={value}
                onChange={onChange}
            />
        </label>
    );
};

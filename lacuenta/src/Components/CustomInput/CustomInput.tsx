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
    // const highlightOnFocus = (e: any) => {
    //     console.log('focus');
    //     e.target.select();
    // };

    return (
        <input
            className="custom-input"
            type={inputType}
            id={inputName}
            value={value}
            onChange={onChange}
            placeholder={placeholderText}
            // onFocus={highlightOnFocus}
        />
    );
};

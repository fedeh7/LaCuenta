import './CustomButton.scss';

export const CustomButton = ({
    text,
    onClick,
}: // disabled = false,
{
    text: string;
    onClick: () => void;
    // disabled?: boolean;
}) => {
    return (
        <button
            className="custom-button"
            onClick={onClick}
            // disabled={disabled}
        >
            {text}
        </button>
    );
};

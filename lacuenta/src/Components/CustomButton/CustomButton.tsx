import './CustomButton.scss';

export const CustomButton = ({
    text,
    onClick,
}: {
    text: string;
    onClick: () => void;
}) => {
    return (
        <button className="custom-button" onClick={onClick}>
            {text}
        </button>
    );
};

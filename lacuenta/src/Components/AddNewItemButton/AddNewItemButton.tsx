import './AddNewItemButton.scss';

export const AddNewItemButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button onClick={onClick} className="add-item-button">
            <span className="add-item-button-text">New</span>
        </button>
    );
};

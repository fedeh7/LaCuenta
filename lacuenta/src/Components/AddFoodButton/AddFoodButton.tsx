import { useContext, useId } from 'react';
import { ModalContext } from '../../Context/ModalContextProvider';
import { CustomButton } from '../CustomButton';
import './AddFoodButton.scss';
import { GlobalContext } from '../../Context/GlobalContext';

export const AddFoodButton = () => {
    const { addFood } = useContext(GlobalContext);

    const handle = () => {
        addFood();
    };

    return (
        <button onClick={handle} className="add-food-button">
            <span className="add-food-button-text">+</span>
        </button>
    );
};

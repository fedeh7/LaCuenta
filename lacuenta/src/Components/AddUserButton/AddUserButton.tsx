import { useContext, useId } from 'react';
import { ModalContext } from '../../Context/ModalContextProvider';
import { CustomButton } from '../CustomButton';
import './AddUserButton.scss';
import { GlobalContext } from '../../Context/GlobalContext';

export const AddUserButton = () => {
    const { addUser } = useContext(GlobalContext);

    const handle = () => {
        addUser();
    };
    return (
        <button onClick={handle} className="add-user-button">
            <span className="add-user-button-text">+</span>
        </button>
    );
};

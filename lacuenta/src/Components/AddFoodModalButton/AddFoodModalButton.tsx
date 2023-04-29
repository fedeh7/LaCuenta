import { useContext } from 'react';
import { ModalContext } from '../../Context/ModalContextProvider';
import { CustomButton } from '../CustomButton';
import './AddFoodModalButton.scss';

export const AddFoodModalButton = () => {
    const { openAddFoodModal } = useContext(ModalContext);
    const handle = () => {
        openAddFoodModal();
    };
    return <CustomButton onClick={handle} text="Agregar comida" />;
};

import { useContext, useId } from 'react';
import { ModalContext } from '../../Context/ModalContextProvider';
import { CustomButton } from '../CustomButton';
import './AddUserModalButton.scss';

export const AddUserModalButton = () => {
    const { openAddUserModal } = useContext(ModalContext);

    const handle = () => {
        openAddUserModal();
    };
    return <CustomButton onClick={handle} text="Agregar comensal" />;
};

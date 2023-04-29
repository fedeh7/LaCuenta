import { useContext, useState } from 'react';
import { CustomButton } from '../../Components/CustomButton';
import { InputWithLabel } from '../../Components/InputWithLabel';
import {
    ADD_FOOD_MODAL_ID,
    ADD_USER_MODAL_ID,
    EDIT_FOOD_MODAL_ID,
    EDIT_USER_MODAL_ID,
    REMOVE_FOOD_MODAL_ID,
    REMOVE_USER_MODAL_ID,
} from '../../Constants';
import { ModalContext } from '../../Context/ModalContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import { AddFoodForm } from '../AddFoodForm';
import { AddUserForm } from '../AddUserForm';
import './Modal.scss';

const forms: { [dynamic: string]: JSX.Element | null } = {
    [ADD_USER_MODAL_ID]: <AddUserForm />,
    [REMOVE_USER_MODAL_ID]: null,
    [EDIT_USER_MODAL_ID]: null,
    [ADD_FOOD_MODAL_ID]: <AddFoodForm />,
    [REMOVE_FOOD_MODAL_ID]: null,
    [EDIT_FOOD_MODAL_ID]: null,
    '': null,
};

export const Modal = () => {
    const { currentModal, closeAllModals } = useContext(ModalContext);

    const currentForm = forms[currentModal];

    return (
        <div className={`modal ${!currentModal && 'hidden'}`}>
            <div className="modal-solid-background">
                {currentForm}
                <CustomButton onClick={closeAllModals} text="Salir" />
            </div>
        </div>
    );
};

import { useContext, useEffect, useRef, useState } from 'react';
import { CustomButton } from '../../Components/CustomButton';

import {
    ADD_FOOD_MODAL_ID,
    ADD_USER_MODAL_ID,
    EDIT_FOOD_MODAL_ID,
    EDIT_USER_MODAL_ID,
    REMOVE_FOOD_MODAL_ID,
    REMOVE_USER_MODAL_ID,
} from '../../Constants';
import { ModalContext } from '../../Context/ModalContextProvider';

import { AddFoodForm } from '../AddFoodForm';
import { AddUserForm } from '../AddUserForm';
import './Modal.scss';
import { EditUserForm } from '../EditUserForm';

const forms: { [dynamic: string]: JSX.Element | null } = {
    [ADD_USER_MODAL_ID]: <AddUserForm />,
    [REMOVE_USER_MODAL_ID]: null,
    [EDIT_USER_MODAL_ID]: null, //Use EditUserForm
    [ADD_FOOD_MODAL_ID]: <AddFoodForm />,
    [REMOVE_FOOD_MODAL_ID]: null,
    [EDIT_FOOD_MODAL_ID]: null,
    '': null,
};

// export const Modal = () => {
//     const { currentModal, closeAllModals } = useContext(ModalContext);

//     const currentForm = forms[currentModal];

//     return (
//         <div className={`modal ${!currentModal && 'hidden'}`}>
//             <div className="modal-solid-background">
//                 {currentForm}
//                 <CustomButton onClick={closeAllModals} text="Salir" />
//             </div>
//         </div>
//     );
// };

export const Modal = () => {
    const ref: any = useRef(null);

    const { currentModal, closeAllModals } = useContext(ModalContext);

    useEffect(() => {
        if (currentModal.length > 0) {
            ref?.current?.showModal();
        } else {
            ref?.current?.close();
        }
    }, [currentModal]);

    useEffect(() => {
        const currentDialog = ref.current;
        const listener = (e: any) => {
            const dialogDimensions = currentDialog.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                closeAllModals();
            }
        };
        currentDialog.addEventListener('click', listener);

        return () => {
            currentDialog.removeEventListener('click', listener);
        };
    }, [closeAllModals, ref]);

    const currentForm = forms[currentModal];

    return (
        <dialog className="modal" ref={ref}>
            <div className="modal-content">
                {currentForm}
                <CustomButton onClick={closeAllModals} text="Salir" />
            </div>
        </dialog>
    );
};

import { createContext, ReactNode, useState } from 'react';

import {
    ADD_FOOD_MODAL_ID,
    ADD_USER_MODAL_ID,
    REMOVE_FOOD_MODAL_ID,
    REMOVE_USER_MODAL_ID,
    EDIT_FOOD_MODAL_ID,
    EDIT_USER_MODAL_ID,
} from './../Constants';

interface stateInterface {
    currentModal: string;
    openAddUserModal: () => void;
    openRemoveUserModal: () => void;
    openEditUserModal: () => void;
    openAddFoodModal: () => void;
    openRemoveFoodModal: () => void;
    openEditFoodModal: () => void;
    closeAllModals: () => void;
}

const defaultState = {
    currentModal: '',
    openAddUserModal: () => {},
    openRemoveUserModal: () => {},
    openEditUserModal: () => {},
    openAddFoodModal: () => {},
    openRemoveFoodModal: () => {},
    openEditFoodModal: () => {},
    closeAllModals: () => {},
} as stateInterface;

export const ModalContext = createContext(defaultState);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [currentModal, setCurrentModal] = useState<string>('');

    const openAddUserModal = () => {
        setCurrentModal(ADD_USER_MODAL_ID);
    };
    const openRemoveUserModal = () => {
        setCurrentModal(REMOVE_USER_MODAL_ID);
    };
    const openEditUserModal = () => {
        setCurrentModal(EDIT_USER_MODAL_ID);
    };
    const openAddFoodModal = () => {
        setCurrentModal(ADD_FOOD_MODAL_ID);
    };
    const openRemoveFoodModal = () => {
        setCurrentModal(REMOVE_FOOD_MODAL_ID);
    };
    const openEditFoodModal = () => {
        setCurrentModal(EDIT_FOOD_MODAL_ID);
    };

    const closeAllModals = () => {
        setCurrentModal('');
    };

    return (
        <ModalContext.Provider
            value={{
                currentModal,
                openAddUserModal,
                openRemoveUserModal,
                openEditUserModal,
                openAddFoodModal,
                openRemoveFoodModal,
                openEditFoodModal,

                closeAllModals,
            }}>
            {children}
        </ModalContext.Provider>
    );
};

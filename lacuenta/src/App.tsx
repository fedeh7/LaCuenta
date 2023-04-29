import React, { useContext, useState } from 'react';
import './App.scss';
import { AddFoodModalButton } from './Components/AddFoodModalButton';
import { AddUserModalButton } from './Components/AddUserModalButton';
import { FoodDataContainer } from './Containers/FoodDataContainer';

import { Modal } from './Containers/Modal';

import { UserDataContainer } from './Containers/UserDataContainer';
import { ModalProvider } from './Context/ModalContextProvider';
import { UserContext, UserProvider } from './Context/UserContextProvider';

export const App = () => {
    return (
        <div className="App">
            <UserProvider>
                <ModalProvider>
                    <AddUserModalButton />
                    <AddFoodModalButton />

                    <UserDataContainer />
                    <FoodDataContainer />

                    <Modal />
                </ModalProvider>
            </UserProvider>
        </div>
    );
};

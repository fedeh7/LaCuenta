import { createContext, ReactNode, useState } from 'react';
import {
    addAndEditFoodInterface,
    foodInterface,
    useFoodData,
    userAndFoodInterface,
} from './FoodContextUtils';
import {
    addUserInterface,
    editUserInterface,
    removeUserInterface,
    userInterface,
    useUserData,
} from './UserContextUtils';

interface stateInterface {
    users: { [dynamic: string]: userInterface };
    foods: { [dynamic: string]: foodInterface };
    userList: string[];
    foodList: string[];
    canAddUser: (userName: string) => boolean;
    canAddFood: ({ foodName }: { foodName: string }) => boolean;
    canEditUser: ({
        previousName,
        newName,
    }: {
        previousName: string;
        newName: string;
    }) => boolean;
    addUser: ({ userName, initialMoneySpent }: addUserInterface) => void;
    addFood: ({ foodName, value }: addAndEditFoodInterface) => void;
    editUser: ({
        previousName,
        newName,
        newAmountOfMoneySpent,
    }: editUserInterface) => void;

    removeUser: ({ userName }: removeUserInterface) => void;
    connectUserAndFood: ({ userName, foodName }: userAndFoodInterface) => void;
    disconnectUserAndFood: ({
        userName,
        foodName,
    }: userAndFoodInterface) => void;
}

const defaultState = {
    users: {},
    foods: {},
    userList: [],
    foodList: [],
    canAddUser: () => false,
    canAddFood: () => false,
    canEditUser: () => false,

    addUser: () => {},
    addFood: () => {},

    editUser: () => {},

    removeUser: () => {},
    connectUserAndFood: () => {},
    disconnectUserAndFood: () => {},
} as stateInterface;

export const UserContext = createContext(defaultState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const {
        foods,
        foodList,
        addFood,
        addUserToFood,
        removeUserFromFood,
        removeFood,
        editFood,
        canAddFood,
    } = useFoodData();
    const {
        users,
        userList,
        addUser,
        removeUser,
        editUser,
        canAddUser,
        canEditUser,
        addFoodToUser,
        removeFoodFromUser,
    } = useUserData();

    const connectUserAndFood = ({
        userName,
        foodName,
    }: userAndFoodInterface) => {
        addUserToFood({ userName, foodName });

        const newFoodDividedValue = foods[foodName].dividedValue;
        const affectedUsers = foods[foodName].peoplePaying;

        addFoodToUser({ affectedUsers, foodName, newFoodDividedValue });
    };
    const disconnectUserAndFood = async ({
        userName,
        foodName,
    }: userAndFoodInterface) => {
        removeUserFromFood({ userName, foodName });

        const affectedUsers = foods[foodName].peoplePaying;
        const newFoodDividedValue = foods[foodName].dividedValue;

        removeFoodFromUser({
            userName,
            affectedUsers,
            foodName,
            newFoodDividedValue,
        });
    };

    return (
        <UserContext.Provider
            value={{
                users,
                canAddUser,
                addUser,
                canEditUser,
                editUser,
                removeUser,
                userList,
                addFood,
                canAddFood,
                foods,
                foodList,
                connectUserAndFood,
                disconnectUserAndFood,
            }}>
            {children}
        </UserContext.Provider>
    );
};

import { createContext, ReactNode, useState } from 'react';
import {
    addAndEditFoodInterface,
    foodInterface,
    useFoodData,
    userAndFoodInterface,
} from './FoodContextUtils';
import {
    addUserInterface,
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
    addUser: ({ userName, initialMoneySpent }: addUserInterface) => void;
    addFood: ({ foodName, value }: addAndEditFoodInterface) => void;
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

    addUser: () => {},
    addFood: () => {},

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
        addFoodToUser,
        removeFoodFromUser,
    } = useUserData();

    // const updateMoneyToPayForUsers = () => {
    //     userList.forEach((userName) => {
    //         users[userName].foods.forEach((foodName) => {});
    //     });
    // };
    // const updateMoneyToPayForUsers = () => {
    //     userList.forEach((userName) => {
    //         users[userName].foods.forEach((foodName) => {

    //             foods[foodName].dividedValue
    //         });
    //     });
    // };
    // const updateMoneyToPayForUsers = ({ foodName }: { foodName: string }) => {

    //     foods[foodName].peoplePaying.forEach((userName)=>{

    //     })

    // };
    const connectUserAndFood = ({
        userName,
        foodName,
    }: userAndFoodInterface) => {
        // const updateRelations = () => {

        addUserToFood({ userName, foodName });

        const newFoodDividedValue = foods[foodName].dividedValue;
        const affectedUsers = foods[foodName].peoplePaying;

        addFoodToUser({ affectedUsers, foodName, newFoodDividedValue });

        // };

        // await updateRelations();
        // updateMoneyToPayForUsers();
    };
    const disconnectUserAndFood = async ({
        userName,
        foodName,
    }: userAndFoodInterface) => {
        // const updateRelations = () => {

        removeUserFromFood({ userName, foodName });

        const affectedUsers = foods[foodName].peoplePaying;
        const newFoodDividedValue = foods[foodName].dividedValue;

        removeFoodFromUser({
            userName,
            affectedUsers,
            foodName,
            newFoodDividedValue,
        });

        // };
        // await updateRelations();
        // updateMoneyToPayForUsers();
    };

    return (
        <UserContext.Provider
            value={{
                users,
                canAddUser,
                addUser,
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

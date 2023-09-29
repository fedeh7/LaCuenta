import { useState } from 'react';
import { capitalize } from '../Utils';
import { userAndFoodInterface } from './FoodContextUtils';

export interface addUserInterface {
    userName: string;
    initialMoneySpent: number;
}
export interface removeUserInterface {
    userName: string;
}

export interface foodsArrayInterface {
    [dynamic: string]: number;
}
export interface userInterface {
    initialMoneySpent: number;
    foods: foodsArrayInterface;
    expectedPay: number;
}

export interface addFoodToUserInterface {
    affectedUsers: string[];
    foodName: string;
    newFoodDividedValue: number;
}
export interface removeFoodFromUserInterface {
    userName: string;
    affectedUsers: string[];
    foodName: string;
    newFoodDividedValue: number;
}

export interface editUserInterface {
    previousName: string;
    newName: string;
    newAmountOfMoneySpent: number;
}

export const useUserData = () => {
    const [users, setUsers] = useState<{ [dynamic: string]: userInterface }>(
        {},
    );

    const [userIdCounter, setUserIdCounter] = useState(0);

    const userList = Object.keys(users);

    const getNewUserId = () => {
        setUserIdCounter(userIdCounter + 1);
    };

    const addUser = ({ userName, initialMoneySpent }: addUserInterface) => {
        const capitalizedName = capitalize(userName);
        const newUsers = {
            ...users,
            [capitalizedName]: {
                initialMoneySpent: initialMoneySpent,
                foods: {},
                expectedPay: 0 - initialMoneySpent,
            },
        };
        setUsers(newUsers);
    };

    const calculateUserExpectedPay = ({
        currentUser,
    }: {
        currentUser: userInterface;
    }) => {
        const currentFoodsValues = Object.values(currentUser.foods);
        const initialMoneySpent = currentUser.initialMoneySpent;

        let newExpectedPay = 0;

        currentFoodsValues.forEach((foodValue) => {
            newExpectedPay += foodValue;
        });

        newExpectedPay -= initialMoneySpent;
        newExpectedPay = Number(newExpectedPay.toFixed(2));
        return newExpectedPay;
    };

    const addFoodToUser = ({
        affectedUsers,
        foodName,
        newFoodDividedValue,
    }: addFoodToUserInterface) => {
        const newUsers = users;
        affectedUsers.forEach((userName) => {
            const currentUser = newUsers[userName];
            currentUser.foods = {
                ...currentUser.foods,
                [foodName]: newFoodDividedValue,
            };
            currentUser.expectedPay = calculateUserExpectedPay({ currentUser });
        });

        // currentUser.foods = {
        //     ...currentUser.foods,
        //     [foodName]: newFoodDividedValue,
        // };
        // currentUser.expectedPay = calculateUserExpectedPay({ currentUser });
        // const newUsers = { ...users, [userName]: currentUser };
        setUsers(newUsers);
    };

    const removeFoodFromUser = ({
        userName,
        affectedUsers,
        foodName,
        newFoodDividedValue,
    }: removeFoodFromUserInterface) => {
        const newUsers = users;

        delete newUsers[userName].foods[foodName];
        newUsers[userName].expectedPay = calculateUserExpectedPay({
            currentUser: newUsers[userName],
        });

        affectedUsers.forEach((affectedUser) => {
            const currentUser = newUsers[affectedUser];
            currentUser.foods = {
                ...currentUser.foods,
                [foodName]: newFoodDividedValue,
            };
            currentUser.expectedPay = calculateUserExpectedPay({ currentUser });
        });
        // delete currentUser.foods[foodName];

        // currentUser.expectedPay = calculateUserExpectedPay({ currentUser });

        // currentUser.foods = currentUser.foods.filter(
        //     (food) => food !== foodName,
        // );

        // const newUsers = { ...users, [userName]: currentUser };
        setUsers(newUsers);
    };

    const removeUser = ({ userName }: removeUserInterface) => {
        const currentUsers = users;

        delete currentUsers[userName];

        setUsers(currentUsers);
    };

    const editUser = ({
        previousName,
        newName,
        newAmountOfMoneySpent,
    }: editUserInterface) => {
        if (
            newName != previousName ||
            newAmountOfMoneySpent != users[previousName].initialMoneySpent
        ) {
            addUser({
                userName: newName,
                initialMoneySpent: newAmountOfMoneySpent,
            });
            removeUser({ userName: previousName });
        }
    };

    const canAddUser = (name: string) => {
        return !userList.includes(name);
    };

    const canEditUser = ({
        previousName,
        newName,
    }: {
        previousName: string;
        newName: string;
    }) => {
        if (newName != previousName) {
            return !userList.includes(newName);
        }
        return true;
    };
    return {
        users,
        userList,
        addUser,
        removeUser,
        editUser,
        canAddUser,
        canEditUser,
        addFoodToUser,
        removeFoodFromUser,
    };
};

import { useState } from 'react';
import {
    addFoodToUserInterface,
    editUserInterface,
    removeFoodFromUserInterface,
    userInterface,
} from './Interfaces';

const calculateUserExpectedPay = ({
    currentUser,
}: {
    currentUser: userInterface;
}) => {
    const currentFoodsValues = Object.values(currentUser.foods);
    const initialMoneySpent = currentUser.initialMoneySpent
        ? currentUser.initialMoneySpent
        : 0;

    let newExpectedPay = 0;

    currentFoodsValues.forEach((foodValue) => {
        const realFoodValue = foodValue ? foodValue : 0;
        newExpectedPay += realFoodValue;
    });

    newExpectedPay -= initialMoneySpent;
    newExpectedPay = Number(newExpectedPay.toFixed(2));
    return newExpectedPay;
};

export const useUser = () => {
    const [users, setUsers] = useState<{ [dynamic: number]: userInterface }>(
        {},
    );
    const [userIdCounter, setUserIdCounter] = useState(0);

    const userList = Object.keys(users);

    const getNewId = () => {
        setUserIdCounter(userIdCounter + 1);
        return userIdCounter;
    };

    const addUser = () => {
        const newUserId = getNewId();
        const newUsers = {
            ...users,
            [newUserId]: {
                userId: newUserId,
                userName: 'New',
                initialMoneySpent: 0,
                foods: {},
                expectedPay: 0,
            },
        };
        setUsers(newUsers);
    };

    const editUser = ({
        userId,
        newUserName,
        newInitialMoneySpent,
    }: editUserInterface) => {
        const newUsers = { ...users };
        let currentUser = newUsers[userId];

        if (newUserName != undefined) {
            currentUser.userName = newUserName;
        }

        if (newInitialMoneySpent != undefined) {
            currentUser.initialMoneySpent = newInitialMoneySpent;
            currentUser.expectedPay = calculateUserExpectedPay({
                currentUser,
            });
        }

        setUsers(newUsers);
    };

    const updateAffectedUsers = ({
        affectedUsers,
        foodId,
        newFoodDividedValue,
    }: addFoodToUserInterface) => {
        const newUsers = { ...users };
        affectedUsers.forEach((userId: number) => {
            const currentUser = newUsers[userId];
            currentUser.foods = {
                ...currentUser.foods,
                [foodId]: newFoodDividedValue,
            };
            currentUser.expectedPay = calculateUserExpectedPay({ currentUser });
        });
        setUsers(newUsers);
    };

    const addFoodToUser = ({
        foodId,
        userId,
    }: {
        foodId: number;
        userId: number;
    }) => {
        const newUsers = { ...users };
        const currentUser = newUsers[userId];
        currentUser.foods = {
            ...currentUser.foods,
            [foodId]: 0,
        };
        setUsers(newUsers);
    };

    const removeFoodFromUser = ({
        userId,
        foodId,
    }: removeFoodFromUserInterface) => {
        const newUsers = { ...users };

        delete newUsers[userId].foods[foodId];
        newUsers[userId].expectedPay = calculateUserExpectedPay({
            currentUser: newUsers[userId],
        });

        setUsers(newUsers);
    };

    return {
        users,
        userList,
        addUser,
        editUser,
        updateAffectedUsers,
        addFoodToUser,
        removeFoodFromUser,
    };
};

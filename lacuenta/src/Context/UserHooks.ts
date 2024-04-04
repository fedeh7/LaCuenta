import { useEffect, useMemo, useState } from 'react';
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
    const [userIdCounter, setUserIdCounter] = useState(0);
    const getNewId = () => {
        setUserIdCounter(userIdCounter + 1);
        return userIdCounter;
    };

    // Cant use this function inside the default value of useState because it causes infinite rerenders for some reason
    const getInitialState = () => {
        let newUsers = {};
        const savedLocalStorage = localStorage.getItem('users');
        if (savedLocalStorage != null) {
            const savedUsers = JSON.parse(savedLocalStorage);

            savedUsers.forEach((userName: string, index: number) => {
                newUsers = {
                    ...newUsers,
                    [index]: {
                        userId: userName,
                        userName,
                        initialMoneySpent: 0,
                        foods: {},
                        expectedPay: 0,
                    },
                };
            });
            setUserIdCounter(savedUsers.length);
        }
        return newUsers;
    };
    const [users, setUsersState] = useState<{
        [dynamic: number]: userInterface;
    }>({});

    useEffect(() => {
        const initialState = getInitialState();
        setUsersState(initialState);
    }, []);

    const userList = useMemo(() => {
        return Object.keys(users);
    }, [Object.keys(users).length]);

    const saveUsersToLocalStorage = (newUsers: {
        [dynamic: number]: userInterface;
    }) => {
        const usersNameList = [];
        for (let userId in newUsers) {
            usersNameList.push(newUsers[userId].userName);
        }
        localStorage.setItem('users', JSON.stringify(usersNameList));
    };
    const setUsers = (newUsers: { [dynamic: number]: userInterface }) => {
        saveUsersToLocalStorage(newUsers);
        setUsersState(newUsers);
    };
    const addUser = (userName = 'New') => {
        const newUserId = getNewId();
        const newUsers = {
            ...users,
            [newUserId]: {
                userId: newUserId,
                userName,
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

    const removeUserFromState = ({ userId }: { userId: number }) => {
        const newUsers = { ...users };
        delete newUsers[userId];

        setUsers(newUsers);
    };
    //TODO: Create getUserById, removeUser, lockUser. Maybe add emojis for names?

    return {
        users,
        userList,
        addUser,
        editUser,
        updateAffectedUsers,
        addFoodToUser,
        removeFoodFromUser,
        removeUserFromState,
    };
};

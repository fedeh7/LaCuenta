import { useEffect, useMemo, useState } from 'react';
import {
    updateAffectedUsersInterface,
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
    const moneySpentOnBoughtFoods = currentUser.moneySpentOnBoughtFoods;
    let newExpectedPay = 0;

    currentFoodsValues.forEach((foodValue) => {
        const realFoodValue = foodValue ? foodValue : 0;
        newExpectedPay += realFoodValue;
    });

    newExpectedPay -= initialMoneySpent;
    newExpectedPay -= moneySpentOnBoughtFoods;
    newExpectedPay = Number(newExpectedPay.toFixed(2));
    return newExpectedPay;
};

const calculateUserMoneySpentOnBoughtFoods = ({
    currentUser,
}: {
    currentUser: userInterface;
}) => {
    const currentFoodsBoughtValues = Object.values(currentUser.boughtFoods);

    let newMoneySpentOnBoughtFoods = 0;

    currentFoodsBoughtValues.forEach((foodCost) => {
        const realFoodCost = foodCost ? foodCost : 0;
        newMoneySpentOnBoughtFoods += realFoodCost;
    });

    newMoneySpentOnBoughtFoods = Number(newMoneySpentOnBoughtFoods);
    return newMoneySpentOnBoughtFoods;
};

const createNewUserInUsersObject = ({
    newUsers,
    newUserId,
    newUserName,
}: {
    newUsers: userInterface | {};
    newUserId: number;
    newUserName: string;
}) => {
    return {
        ...newUsers,
        [newUserId]: {
            userId: newUserId,
            userName: newUserName,
            initialMoneySpent: 0,
            foods: {},
            expectedPay: 0,
            boughtFoods: {},
            moneySpentOnBoughtFoods: 0,
        },
    };
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
                newUsers = createNewUserInUsersObject({
                    newUsers,
                    newUserId: index,
                    newUserName: userName,
                });
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

        const newUsers = createNewUserInUsersObject({
            newUsers: users,
            newUserId: newUserId,
            newUserName: userName,
        });
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
    }: updateAffectedUsersInterface) => {
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

    const addFoodToUserBoughtFoods = ({
        userId,
        foodId,
        foodCost,
    }: {
        userId: number;
        foodId: number;
        foodCost: number;
    }) => {
        const newUsers = { ...users };
        newUsers[userId].boughtFoods = {
            ...newUsers[userId].boughtFoods,
            [foodId]: foodCost,
        };
        newUsers[userId].moneySpentOnBoughtFoods =
            calculateUserMoneySpentOnBoughtFoods({
                currentUser: newUsers[userId],
            });
        newUsers[userId].expectedPay = calculateUserExpectedPay({
            currentUser: newUsers[userId],
        });

        setUsers(newUsers);
    };
    const removeFoodFromUserBoughtFoods = ({
        userId,
        foodId,
    }: {
        userId: number;
        foodId: number;
    }) => {
        const newUsers = { ...users };
        delete newUsers[userId].boughtFoods[foodId];

        newUsers[userId].moneySpentOnBoughtFoods =
            calculateUserMoneySpentOnBoughtFoods({
                currentUser: newUsers[userId],
            });
        newUsers[userId].expectedPay = calculateUserExpectedPay({
            currentUser: newUsers[userId],
        });

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
        addFoodToUserBoughtFoods,
        removeFoodFromUserBoughtFoods,
    };
};

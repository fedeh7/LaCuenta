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
    const currentFoodKeys = Object.keys(currentUser.foods);
    const currentFoodsTotal = currentFoodKeys.reduce(
        (accumulator: number, currentValue: string) => {
            if (currentUser.foods[Number(currentValue)].useUnits) {
                return (
                    accumulator +
                    currentUser.foods[Number(currentValue)].unitsTotalSpent
                );
            }
            return (
                accumulator +
                currentUser.foods[Number(currentValue)].dividedValue
            );
        },
        0,
    );

    const initialMoneySpent = currentUser.initialMoneySpent
        ? currentUser.initialMoneySpent
        : 0;
    const moneySpentOnBoughtFoods = currentUser.moneySpentOnBoughtFoods;
    let newExpectedPay = currentFoodsTotal;

    newExpectedPay -= initialMoneySpent;
    newExpectedPay -= moneySpentOnBoughtFoods;
    newExpectedPay = Number(newExpectedPay);

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
        const realFoodCost = foodCost ? Number(foodCost) : 0;
        newMoneySpentOnBoughtFoods += realFoodCost;
    });

    newMoneySpentOnBoughtFoods = Number(newMoneySpentOnBoughtFoods);
    return newMoneySpentOnBoughtFoods;
};

const calculateUserTotalSpentInUnits = ({
    currentUser,
    foodId,
}: {
    currentUser: userInterface;
    foodId: number;
}) => {
    const consumedUnits = currentUser.foods[foodId].unitsConsumed
        ? currentUser.foods[foodId].unitsConsumed
        : 0;
    return consumedUnits! * currentUser.foods[foodId].unitsCost;
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
    const [userIdCounter, setUserIdCounter] = useState(1);
    const getNewId = () => {
        setUserIdCounter(userIdCounter + 1);
        return userIdCounter;
    };

    // Cant use this function inside the default value of useState because it causes infinite rerenders for some reason
    // I think it causes infinte rerenders becuase the state for the ids is inside this same hook so it rerenders when it changes but IM NOT SURE
    const getInitialState = () => {
        let newUsers = {};
        let initialId = 1;
        const savedLocalStorage = localStorage.getItem('users');
        if (savedLocalStorage != null) {
            const savedUsers = JSON.parse(savedLocalStorage);

            savedUsers.forEach((userName: string) => {
                newUsers = createNewUserInUsersObject({
                    newUsers,
                    newUserId: initialId,
                    newUserName: userName,
                });
                initialId += 1;
            });
            setUserIdCounter(initialId);
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
        newFoodCost,
        foodBuyer,
        useUnits,
        unitsCost,
    }: updateAffectedUsersInterface) => {
        const newUsers = { ...users };
        affectedUsers.forEach((userIdString: string) => {
            const userId = Number(userIdString);
            const currentUser = newUsers[userId];
            currentUser.foods = {
                ...currentUser.foods,
                [foodId]: {
                    ...currentUser.foods[foodId],
                    ...((newFoodDividedValue || newFoodDividedValue === 0) && {
                        dividedValue: newFoodDividedValue,
                    }),
                    ...(useUnits !== undefined && { useUnits }),
                    ...((unitsCost || unitsCost === 0) && { unitsCost }),
                },
            };
            currentUser.foods[foodId].unitsTotalSpent =
                calculateUserTotalSpentInUnits({ currentUser, foodId });
            currentUser.expectedPay = calculateUserExpectedPay({ currentUser });
        });

        if (
            (foodBuyer || foodBuyer === 0) &&
            (newFoodCost || newFoodCost === 0)
        ) {
            newUsers[foodBuyer].boughtFoods[foodId] = newFoodCost;
            newUsers[foodBuyer].moneySpentOnBoughtFoods =
                calculateUserMoneySpentOnBoughtFoods({
                    currentUser: newUsers[foodBuyer],
                });
            newUsers[foodBuyer].expectedPay = calculateUserExpectedPay({
                currentUser: newUsers[foodBuyer],
            });
        }
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
            [foodId]: {
                ...currentUser.foods[foodId],
                dividedValue: 0,
                useUnits: false,
                unitsConsumed: 1,
                unitsCost: 0,
                unitsTotalSpent: 0,
            },
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
        newBuyerUserId,
        previousBuyerUserId,
        foodId,
        foodCost,
    }: {
        newBuyerUserId: number;
        previousBuyerUserId: number | null;
        foodId: number;
        foodCost: number;
    }) => {
        const newUsers = { ...users };

        // Add new bought food to list of bought foods of new buyer
        newUsers[newBuyerUserId].boughtFoods = {
            ...newUsers[newBuyerUserId].boughtFoods,
            [foodId]: foodCost,
        };
        newUsers[newBuyerUserId].moneySpentOnBoughtFoods =
            calculateUserMoneySpentOnBoughtFoods({
                currentUser: newUsers[newBuyerUserId],
            });
        newUsers[newBuyerUserId].expectedPay = calculateUserExpectedPay({
            currentUser: newUsers[newBuyerUserId],
        });

        // Remove bought food from previous buyer if it exists
        if (previousBuyerUserId != null) {
            delete newUsers[previousBuyerUserId].boughtFoods[foodId];
            newUsers[previousBuyerUserId].moneySpentOnBoughtFoods =
                calculateUserMoneySpentOnBoughtFoods({
                    currentUser: newUsers[previousBuyerUserId],
                });
            newUsers[previousBuyerUserId].expectedPay =
                calculateUserExpectedPay({
                    currentUser: newUsers[previousBuyerUserId],
                });
        }
        setUsers(newUsers);
    };

    // TODO: This functions logic is also in addFoodToUserBoughtFoods, its repeated, probably having a single function would be better, like a toggle or something
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

    const setUserUnitsConsumed = ({
        userId,
        foodId,
        unitsAmount,
    }: {
        userId: number;
        foodId: number;
        unitsAmount: number;
    }) => {
        const newUsers = { ...users };

        newUsers[userId].foods[foodId].unitsConsumed = unitsAmount;

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
        setUserUnitsConsumed,
    };
};

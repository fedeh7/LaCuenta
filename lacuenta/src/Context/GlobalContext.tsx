import { createContext, ReactNode, useEffect, useState } from 'react';
import {
    addFoodToUserInterface,
    editFoodInterface,
    editUserInterface,
    foodInterface,
    removeFoodFromUserInterface,
    stateInterface,
    userAndFoodInterface,
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

const calculateNewDividedValue = ({
    peoplePaying,
    foodCost,
}: {
    peoplePaying: number[];
    foodCost: number;
}) => {
    let newFoodCost = 0;
    const totalValue = foodCost ? foodCost : 0;
    if (peoplePaying.length) {
        newFoodCost = totalValue / peoplePaying.length;
    }
    newFoodCost = Number(newFoodCost.toFixed(2));
    return newFoodCost;
};

const defaultState = {
    users: {},
    userList: [],
    addUser: () => {},
    editUser: () => {},

    foods: {},
    foodList: [],
    addFood: () => {},
    editFoodValues: () => {},
    addUserToFood: () => {},
    removeUserFromFood: () => {},

    connectUserAndFood: () => {},
    disconnectUserAndFood: () => {},
    updateFoodsValueOnUsers: () => {},
} as stateInterface;

export const GlobalContext = createContext(defaultState);

export const GlobalContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [foods, setFoods] = useState<{ [dynamic: number]: foodInterface }>(
        {},
    );
    const [users, setUsers] = useState<{ [dynamic: number]: userInterface }>(
        {},
    );
    const [foodIdCounter, setFoodIdCounter] = useState(0);
    const [userIdCounter, setUserIdCounter] = useState(0);

    const foodList = Object.keys(foods);
    const userList = Object.keys(users);

    const getNewId = (entity: string) => {
        if (entity === 'food') {
            setFoodIdCounter(foodIdCounter + 1);
            return foodIdCounter;
        } else {
            setUserIdCounter(userIdCounter + 1);
            return userIdCounter;
        }
    };

    // useEffect(() => {
    //     let newUsersFoodsData = {} as newUsersFoodsDataInterface;

    //     foodList.forEach((foodId: string) => {
    //         const currentFood = foods[Number(foodId)];

    //         currentFood.peoplePaying.forEach((userId: number) => {
    //             newUsersFoodsData = {
    //                 ...newUsersFoodsData,
    //                 [userId]: {
    //                     ...newUsersFoodsData[userId],
    //                     [foodId]: foods[Number(foodId)].dividedValue,
    //                 },
    //             };
    //         });
    //     });

    //     updateFoodsValueOnUsers({ newUsersFoodsData });
    // }, [foods]);

    // FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD

    const addFood = () => {
        const newFoodId = getNewId('food');
        const newFoods = {
            ...foods,
            [newFoodId]: {
                foodId: newFoodId,
                foodName: 'New',
                foodCost: 0,
                dividedValue: 0,
                peoplePaying: [],
            },
        };
        setFoods(newFoods);
    };

    const editFood = ({
        foodId,
        newFoodName,
        newFoodCost,
    }: editFoodInterface) => {
        const newFoods = { ...foods };
        let currentFood = newFoods[foodId];

        if (newFoodName != undefined) {
            currentFood.foodName = newFoodName;
        }

        if (newFoodCost != undefined) {
            currentFood.foodCost = newFoodCost;
            currentFood.dividedValue = calculateNewDividedValue({
                peoplePaying: foods[foodId].peoplePaying,
                foodCost: newFoodCost,
            });
        }

        setFoods(newFoods);
    };

    const addUserToFood = ({ userId, foodId }: userAndFoodInterface) => {
        const newFoods = {
            ...foods,
        };
        const currentFood = newFoods[foodId];

        currentFood.peoplePaying.push(userId);
        currentFood.dividedValue = calculateNewDividedValue({
            foodCost: currentFood.foodCost,
            peoplePaying: currentFood.peoplePaying,
        });

        setFoods(newFoods);
    };
    const removeUserFromFood = ({ userId, foodId }: userAndFoodInterface) => {
        const newFoods = {
            ...foods,
        };
        const currentFood = newFoods[foodId];

        currentFood.peoplePaying = currentFood.peoplePaying.filter(
            (payingUser) => payingUser !== userId,
        );
        currentFood.dividedValue = calculateNewDividedValue({
            foodCost: currentFood.foodCost,
            peoplePaying: currentFood.peoplePaying,
        });

        setFoods(newFoods);
    };

    // // const removeFood = ({ foodName }: { foodName: string }) => {
    // //     const currentFoods = foods;

    // //     delete currentFoods[foodName];

    // //     setFoods(currentFoods);
    // // };

    // FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD

    // USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER

    const addUser = () => {
        const newUserId = getNewId('user');
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

    // // const removeUser = ({ userName }: removeUserInterface) => {
    // //     const currentUsers = users;

    // //     delete currentUsers[userName];

    // //     setUsers(currentUsers);
    // // };

    // USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER

    const connectUserAndFood = ({ userId, foodId }: userAndFoodInterface) => {
        addUserToFood({ userId, foodId });

        const newFoodDividedValue = foods[foodId].dividedValue;
        const affectedUsers = foods[foodId].peoplePaying;

        addFoodToUser({
            foodId,
            userId,
        });
        updateAffectedUsers({
            affectedUsers,
            foodId,
            newFoodDividedValue,
        });
    };
    const disconnectUserAndFood = ({
        userId,
        foodId,
    }: userAndFoodInterface) => {
        removeUserFromFood({ userId, foodId });

        const affectedUsers = foods[foodId].peoplePaying;
        const newFoodDividedValue = foods[foodId].dividedValue;

        removeFoodFromUser({
            userId,
            affectedUsers,
            foodId,
            newFoodDividedValue,
        });
        updateAffectedUsers({
            affectedUsers,
            foodId,
            newFoodDividedValue,
        });
    };

    const editFoodValues = ({
        foodId,
        newFoodName,
        newFoodCost,
    }: editFoodInterface) => {
        editFood({ foodId, newFoodName, newFoodCost });
        if (newFoodCost != undefined) {
            const affectedUsers = foods[foodId].peoplePaying;
            const newFoodDividedValue = foods[foodId].dividedValue;
            updateAffectedUsers({
                affectedUsers,
                foodId,
                newFoodDividedValue,
            });
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                users,
                addUser,
                editUser,
                userList,

                foods,
                foodList,
                addFood,
                addUserToFood,
                removeUserFromFood,

                connectUserAndFood,
                disconnectUserAndFood,
                editFoodValues,
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

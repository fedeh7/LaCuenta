import { createContext, ReactNode } from 'react';
import {
    editFoodInterface,
    stateInterface,
    userAndFoodInterface,
} from './Interfaces';
import { useFood } from './FoodHooks';
import { useUser } from './UserHooks';

export const GlobalContext = createContext<stateInterface>(null!);

export const GlobalContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const {
        foods,
        addFood,
        editFood,
        addUserToFood,
        removeUserFromFood,
        foodList,
        removeFoodFromState,
        setBuyerForFood,
        removeBuyerFromFood,
        toggleUnitsStatus,
        setFoodUnitsAmount,
    } = useFood();
    const {
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
    } = useUser();

    // If setting states is an async functionality, why am i getting the correct values for newFoodDividedValue and affectedUsers after running addUserToFood??
    const connectUserAndFood = ({ userId, foodId }: userAndFoodInterface) => {
        addUserToFood({ userId, foodId });

        const { dividedValue, buyer, unitsCost, useUnits, foodCost } =
            foods[foodId];
        const affectedUsers = Object.keys(foods[foodId].peoplePaying);

        addFoodToUser({
            foodId,
            userId,
        });
        updateAffectedUsers({
            affectedUsers,
            foodId,
            newFoodDividedValue: dividedValue,
            newFoodCost: foodCost,
            foodBuyer: buyer,
            unitsCost,
            useUnits,
        });
    };
    const disconnectUserAndFood = ({
        userId,
        foodId,
    }: userAndFoodInterface) => {
        removeUserFromFood({ userId, foodId });

        const affectedUsers = Object.keys(foods[foodId].peoplePaying);
        const { dividedValue, buyer, unitsCost, useUnits, foodCost } =
            foods[foodId];

        removeFoodFromUser({
            userId,
            foodId,
        });
        updateAffectedUsers({
            affectedUsers,
            foodId,
            newFoodDividedValue: dividedValue,
            newFoodCost: foodCost,
            foodBuyer: buyer,
            unitsCost,
            useUnits,
        });
    };

    const handleToggleUserConsumesFood = ({
        userId,
        foodId,
        currentStatus,
    }: {
        userId: number;
        foodId: number;
        currentStatus: boolean;
    }) => {
        const newStatus = !currentStatus;
        if (newStatus) {
            connectUserAndFood({ userId, foodId });
        } else {
            disconnectUserAndFood({ userId, foodId });
        }
    };

    const editFoodValues = ({
        foodId,
        newFoodName,
        newFoodCost,
    }: editFoodInterface) => {
        editFood({ foodId, newFoodName, newFoodCost });
        if (newFoodCost != undefined) {
            const affectedUsers = Object.keys(foods[foodId].peoplePaying);
            const { dividedValue, buyer, unitsCost, useUnits } = foods[foodId];

            updateAffectedUsers({
                affectedUsers,
                foodId,
                newFoodDividedValue: dividedValue,
                newFoodCost,
                foodBuyer: buyer,
                unitsCost,
                useUnits,
            });
        }
    };

    const deleteUser = ({ userId }: { userId: number }) => {
        const userToRemove = users[userId];
        const userFoodIdList = Object.keys(userToRemove.foods);
        const userBoughtFoodsIdList = Object.keys(userToRemove.boughtFoods);

        userFoodIdList.forEach((foodId) => {
            disconnectUserAndFood({ userId, foodId: Number(foodId) });
        });
        userBoughtFoodsIdList.forEach((foodId) => {
            removeBuyer({ userId, foodId: Number(foodId) });
        });

        removeUserFromState({ userId });
    };
    const deleteFood = ({ foodId }: { foodId: number }) => {
        const foodToRemove = foods[foodId];
        const foodUsersPayingList = Object.keys(foodToRemove.peoplePaying);
        const foodBuyerId = foodToRemove.buyer;

        foodUsersPayingList.forEach((userIdString) => {
            const userId = Number(userIdString);
            disconnectUserAndFood({ userId, foodId });
        });

        if (foodBuyerId) {
            removeBuyer({ foodId, userId: foodBuyerId });
        }
        removeFoodFromState({ foodId });
    };

    const setBuyer = ({
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
        setBuyerForFood({ userId: newBuyerUserId, foodId });
        addFoodToUserBoughtFoods({
            newBuyerUserId,
            previousBuyerUserId,
            foodId,
            foodCost,
        });
    };
    const removeBuyer = ({
        userId,
        foodId,
    }: {
        userId: number;
        foodId: number;
    }) => {
        removeBuyerFromFood({ foodId });
        removeFoodFromUserBoughtFoods({ userId, foodId });
    };
    const handleToggleBuyer = ({
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
        if (previousBuyerUserId === newBuyerUserId) {
            removeBuyer({ userId: newBuyerUserId, foodId });
        } else {
            setBuyer({ newBuyerUserId, previousBuyerUserId, foodId, foodCost });
        }
    };
    const handleToggleFoodUnitsStatus = ({ foodId }: { foodId: number }) => {
        toggleUnitsStatus({ foodId });
        const affectedUsers = Object.keys(foods[foodId].peoplePaying);
        const { dividedValue, buyer, unitsCost, useUnits, foodCost } =
            foods[foodId];
        updateAffectedUsers({
            affectedUsers,
            foodId,
            newFoodDividedValue: dividedValue,
            newFoodCost: foodCost,
            foodBuyer: buyer,
            unitsCost,
            useUnits,
        });
    };
    const handleSetNewUnitsAmount = ({
        foodId,
        userId,
        unitsAmount,
        shouldConnectUserAndFood,
    }: {
        foodId: number;
        userId: number;
        unitsAmount: number;
        shouldConnectUserAndFood: boolean;
    }) => {
        if (shouldConnectUserAndFood) {
            connectUserAndFood({ userId, foodId });
        }
        if (!unitsAmount || unitsAmount === 0) {
            disconnectUserAndFood({ userId, foodId });
        } else {
            setFoodUnitsAmount({ foodId, userId, unitsAmount });
            setUserUnitsConsumed({ foodId, userId, unitsAmount });
            const affectedUsers = Object.keys(foods[foodId].peoplePaying);
            const { dividedValue, buyer, unitsCost, useUnits, foodCost } =
                foods[foodId];
            updateAffectedUsers({
                affectedUsers,
                foodId,
                newFoodDividedValue: dividedValue,
                newFoodCost: foodCost,
                foodBuyer: buyer,
                unitsCost,
                useUnits,
            });
        }
    };

    //TODO: Find a way to divide the state in diferent values, to prevent unnesesary rerender of components because the object of the context is being reinstanced, maybe create individual contexts for each variable that depend on this bigger context. For example right now when you add a new food and there are no users, UserContainer rerenders and it shouldnt, since it has nothing diferent to render
    const values: stateInterface = {
        // User related methods
        users,
        addUser,
        editUser,
        userList,

        // Food related methods
        foods,
        foodList,
        addFood,

        // Context Methods
        editFoodValues,
        deleteFood,
        deleteUser,
        handleToggleBuyer,
        handleToggleUserConsumesFood,
        handleToggleFoodUnitsStatus,
        handleSetNewUnitsAmount,
    };

    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    );
};

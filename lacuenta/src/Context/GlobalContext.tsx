import { createContext, ReactNode } from 'react';
import {
    editFoodInterface,
    stateInterface,
    userAndFoodInterface,
} from './Interfaces';
import { useFood } from './FoodHooks';
import { useUser } from './UserHooks';

const defaultState = {
    users: {},
    userList: [],
    addUser: () => {},
    editUser: () => {},

    foods: {},
    foodList: [],
    addFood: () => {},
    editFoodValues: () => {},

    updateFoodsValueOnUsers: () => {},
    deleteUser: () => {},
    deleteFood: () => {},
    handleToggleBuyer: () => {},
    handleToggleUserConsumesFood: () => {},
} as stateInterface;

export const GlobalContext = createContext(defaultState);

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
    } = useUser();

    // If setting states is an async functionality, why am i getting the correct values for newFoodDividedValue and affectedUsers after running addUserToFood??
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
            foodId,
        });
        updateAffectedUsers({
            affectedUsers,
            foodId,
            newFoodDividedValue,
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
            const affectedUsers = foods[foodId].peoplePaying;
            const newFoodDividedValue = foods[foodId].dividedValue;
            const foodBuyer = foods[foodId].buyer;

            updateAffectedUsers({
                affectedUsers,
                foodId,
                newFoodDividedValue,
                newFoodCost,
                foodBuyer,
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
        const foodUsersPayingList = foodToRemove.peoplePaying;
        const foodBuyerId = foodToRemove.buyer;

        foodUsersPayingList.forEach((userId) => {
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
    };

    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    );
};

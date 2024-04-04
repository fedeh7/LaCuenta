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

    connectUserAndFood: () => {},
    disconnectUserAndFood: () => {},
    updateFoodsValueOnUsers: () => {},
    deleteUser: () => {},
    deleteFood: () => {},
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
    } = useUser();

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

    const deleteUser = ({ userId }: { userId: number }) => {
        const userToRemove = users[userId];
        const userFoodIdList = Object.keys(userToRemove.foods);

        userFoodIdList.forEach((foodId) => {
            disconnectUserAndFood({ userId, foodId: Number(foodId) });
        });
        removeUserFromState({ userId });
    };
    const deleteFood = ({ foodId }: { foodId: number }) => {
        const foodToRemove = foods[foodId];
        const foodUsersPayingList = foodToRemove.peoplePaying;

        foodUsersPayingList.forEach((userId) => {
            disconnectUserAndFood({ userId, foodId });
        });
        removeFoodFromState({ foodId });
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
        connectUserAndFood,
        disconnectUserAndFood,
        editFoodValues,
        deleteFood,
        deleteUser,
    };

    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    );
};

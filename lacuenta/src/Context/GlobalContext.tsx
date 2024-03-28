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
    } = useFood();
    const {
        users,
        userList,
        addUser,
        editUser,
        updateAffectedUsers,
        addFoodToUser,
        removeFoodFromUser,
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

    return (
        <GlobalContext.Provider
            value={{
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
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

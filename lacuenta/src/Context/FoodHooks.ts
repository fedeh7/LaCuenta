import { useState } from 'react';
import {
    editFoodInterface,
    foodInterface,
    userAndFoodInterface,
} from './Interfaces';
import { HAMBURGER_ICON } from '../Constants';

const calculateNewDividedValue = ({
    peoplePaying,
    foodCost,
}: {
    peoplePaying: {
        [dynamic: number]: number | undefined;
    };
    foodCost: number;
}) => {
    let newDividedValue = 0;
    const totalValue = foodCost ? foodCost : 0;
    const peoplePayingList = Object.keys(peoplePaying);
    if (peoplePayingList.length) {
        newDividedValue = totalValue / peoplePayingList.length;
    }
    newDividedValue = Number(newDividedValue.toFixed(2));
    return newDividedValue;
};

const calculateNewUnitCost = ({
    unitsConsumedTotal,
    foodCost,
}: {
    unitsConsumedTotal: number;
    foodCost: number;
}) => {
    let newUnitCost = 0;
    const totalValue = foodCost ? foodCost : 0;
    if (unitsConsumedTotal) {
        newUnitCost = totalValue / unitsConsumedTotal;
    }
    newUnitCost = Number(newUnitCost.toFixed(2));

    return newUnitCost;
};

const calculateUnitsConsumedTotal = ({
    peoplePaying,
}: {
    peoplePaying: {
        [dynamic: number]: number | undefined;
    };
}) => {
    const peoplePayingList = Object.keys(peoplePaying);
    const newUnitsConsumedTotal = peoplePayingList.reduce(
        (accumulator: number, currentValue: string) => {
            const id = Number(currentValue);
            if (peoplePaying[id] !== undefined) {
                return accumulator + peoplePaying[id]!;
            }
            return accumulator;
        },
        0,
    );

    return newUnitsConsumedTotal;
};

export const useFood = () => {
    const [foods, setFoods] = useState<{ [dynamic: number]: foodInterface }>(
        {},
    );
    const [foodIdCounter, setFoodIdCounter] = useState(1);

    const foodList = Object.keys(foods);
    const getNewId = () => {
        setFoodIdCounter(foodIdCounter + 1);
        return foodIdCounter;
    };

    const addFood = () => {
        const newFoodId = getNewId();
        const newFoods: { [dynamic: number]: foodInterface } = {
            ...foods,
            [newFoodId]: {
                foodId: newFoodId,
                foodName: HAMBURGER_ICON,
                foodCost: 0,
                dividedValue: 0,
                peoplePaying: {},
                buyer: null,
                useUnits: false,
                unitsConsumedTotal: 0,
                unitsCost: 0,
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
            currentFood.unitsCost = calculateNewUnitCost({
                foodCost: currentFood.foodCost,
                unitsConsumedTotal: currentFood.unitsConsumedTotal,
            });
        }

        setFoods(newFoods);
    };

    const addUserToFood = ({ userId, foodId }: userAndFoodInterface) => {
        const newFoods = {
            ...foods,
        };
        const currentFood = newFoods[foodId];
        currentFood.peoplePaying = { ...currentFood.peoplePaying, [userId]: 1 };

        currentFood.dividedValue = calculateNewDividedValue({
            foodCost: currentFood.foodCost,
            peoplePaying: currentFood.peoplePaying,
        });
        currentFood.unitsConsumedTotal = calculateUnitsConsumedTotal({
            peoplePaying: currentFood.peoplePaying,
        });

        currentFood.unitsCost = calculateNewUnitCost({
            foodCost: currentFood.foodCost,
            unitsConsumedTotal: currentFood.unitsConsumedTotal,
        });

        setFoods(newFoods);
    };
    const removeUserFromFood = ({ userId, foodId }: userAndFoodInterface) => {
        const newFoods = {
            ...foods,
        };

        const currentFood = newFoods[foodId];
        delete currentFood.peoplePaying[userId];
        // TODO: these following functions seem to be used in the same way and order in other places withtin this file, consider extracting this login into a new function
        currentFood.dividedValue = calculateNewDividedValue({
            foodCost: currentFood.foodCost,
            peoplePaying: currentFood.peoplePaying,
        });
        currentFood.unitsConsumedTotal = calculateUnitsConsumedTotal({
            peoplePaying: currentFood.peoplePaying,
        });

        currentFood.unitsCost = calculateNewUnitCost({
            foodCost: currentFood.foodCost,
            unitsConsumedTotal: currentFood.unitsConsumedTotal,
        });

        setFoods(newFoods);
    };

    const removeFoodFromState = ({ foodId }: { foodId: number }) => {
        const newFoods = { ...foods };
        delete newFoods[foodId];

        setFoods(newFoods);
    };

    const setBuyerForFood = ({
        userId,
        foodId,
    }: {
        userId: number;
        foodId: number;
    }) => {
        const newFoods = { ...foods };
        newFoods[foodId].buyer = userId;

        setFoods(newFoods);
    };
    const removeBuyerFromFood = ({ foodId }: { foodId: number }) => {
        const newFoods = { ...foods };
        newFoods[foodId].buyer = null;

        setFoods(newFoods);
    };

    const toggleUnitsStatus = ({ foodId }: { foodId: number }) => {
        const newFoods = { ...foods };
        newFoods[foodId].useUnits = !newFoods[foodId].useUnits;
        setFoods(newFoods);
    };

    const setFoodUnitsAmount = ({
        foodId,
        userId,
        unitsAmount,
    }: {
        foodId: number;
        userId: number;
        unitsAmount: number;
    }) => {
        const newFoods = { ...foods };
        const currentFood = newFoods[foodId];
        currentFood.peoplePaying[userId] = unitsAmount;

        currentFood.unitsConsumedTotal = calculateUnitsConsumedTotal({
            peoplePaying: currentFood.peoplePaying,
        });

        currentFood.unitsCost = calculateNewUnitCost({
            foodCost: currentFood.foodCost,
            unitsConsumedTotal: currentFood.unitsConsumedTotal,
        });
        setFoods(newFoods);
    };

    //TODO: Add getFoodById, removeFood, change name for foods to only suport icons
    return {
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
    };
};

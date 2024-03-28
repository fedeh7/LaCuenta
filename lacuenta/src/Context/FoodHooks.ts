import { useState } from 'react';
import {
    editFoodInterface,
    foodInterface,
    userAndFoodInterface,
} from './Interfaces';

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

export const useFood = () => {
    const [foods, setFoods] = useState<{ [dynamic: number]: foodInterface }>(
        {},
    );
    const [foodIdCounter, setFoodIdCounter] = useState(0);

    const foodList = Object.keys(foods);
    const getNewId = () => {
        setFoodIdCounter(foodIdCounter + 1);
        return foodIdCounter;
    };

    const addFood = () => {
        const newFoodId = getNewId();
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
            (payingUser: number) => payingUser !== userId,
        );
        currentFood.dividedValue = calculateNewDividedValue({
            foodCost: currentFood.foodCost,
            peoplePaying: currentFood.peoplePaying,
        });

        setFoods(newFoods);
    };

    return {
        foods,
        addFood,
        editFood,
        addUserToFood,
        removeUserFromFood,
        foodList,
    };
};

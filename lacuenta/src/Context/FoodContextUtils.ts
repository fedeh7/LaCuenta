import { useEffect, useState } from 'react';

export interface addAndEditFoodInterface {
    foodName: string;
    value: number;
}
export interface foodInterface {
    value: number;
    dividedValue: number;
    peoplePaying: string[];
}

export interface userAndFoodInterface {
    foodName: string;
    userName: string;
}

// const FoodControls = ({ value }: { value: number }) => {
//     const [currentValue, setCurrentValue] = useState<number>(value);
//     const [dividedValue, setDividedValue] = useState<number>(0);
//     const [peoplePaying, setPeoplePaying] = useState<string[]>([]);

//     useEffect(() => {
//         const calculateDividedValue = () => {
//             let newValue = 0;
//             if (peoplePaying.length) {
//                 newValue = value / peoplePaying.length;
//             }
//             setDividedValue(newValue);
//         };

//         calculateDividedValue();
//     }, [peoplePaying, currentValue, value]);

//     const addUserToPeoplePaying = ({ user }: { user: string }) => {
//         const currentPeoplePaying = peoplePaying;

//         currentPeoplePaying.push(user);

//         setPeoplePaying(currentPeoplePaying);
//     };

//     const removeUserFromPeoplePaying = ({ user }: { user: string }) => {
//         const newPeoplePayingList = peoplePaying.filter(
//             (payingUser) => payingUser !== user,
//         );

//         setPeoplePaying(newPeoplePayingList);
//     };

//     const editValue = ({ newValue }: { newValue: number }) => {
//         setCurrentValue(newValue);
//     };

//     return {
//         currentValue,
//         dividedValue,
//         addUserToPeoplePaying,
//         removeUserFromPeoplePaying,
//         editValue,
//     };
// };

const calculateNewDividedValue = ({
    peoplePaying,
    value,
}: {
    peoplePaying: string[];
    value: number;
}) => {
    let newValue = 0;
    if (peoplePaying.length) {
        newValue = value / peoplePaying.length;
    }
    return newValue;
};
export const useFoodData = () => {
    const [foods, setFoods] = useState<{ [dynamic: string]: foodInterface }>(
        {},
    );

    const foodList = Object.keys(foods);

    const addFood = ({ foodName, value }: addAndEditFoodInterface) => {
        const newFoods = {
            ...foods,
            [foodName]: {
                value,
                dividedValue: 0,
                peoplePaying: [],
            },
        };
        setFoods(newFoods);
    };

    const addUserToFood = ({ userName, foodName }: userAndFoodInterface) => {
        const currentFood = foods[foodName];

        currentFood.peoplePaying.push(userName);
        currentFood.dividedValue = calculateNewDividedValue({
            value: currentFood.value,
            peoplePaying: currentFood.peoplePaying,
        });
        const newFoods = {
            ...foods,
            [foodName]: currentFood,
        };
        setFoods(newFoods);
    };
    const removeUserFromFood = ({
        userName,
        foodName,
    }: userAndFoodInterface) => {
        const currentFood = foods[foodName];

        currentFood.peoplePaying = currentFood.peoplePaying.filter(
            (payingUser) => payingUser !== userName,
        );
        currentFood.dividedValue = calculateNewDividedValue({
            value: currentFood.value,
            peoplePaying: currentFood.peoplePaying,
        });
        const newFoods = {
            ...foods,
            [foodName]: currentFood,
        };
        setFoods(newFoods);
    };

    const removeFood = ({ foodName }: { foodName: string }) => {
        const currentFoods = foods;

        delete currentFoods[foodName];

        setFoods(currentFoods);
    };

    const editFood = ({ foodName, value }: addAndEditFoodInterface) => {};

    const canAddFood = ({ foodName }: { foodName: string }) => {
        return !foodList.includes(foodName);
    };

    return {
        foods,
        foodList,
        addFood,
        addUserToFood,
        removeUserFromFood,
        removeFood,
        editFood,
        canAddFood,
    };
};

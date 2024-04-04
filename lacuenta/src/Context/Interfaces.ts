import { foodValues } from '../Constants/interfaces';

export interface foodInterface {
    foodId: number;
    foodName: foodValues;
    foodCost: number;
    dividedValue: number;
    peoplePaying: number[];
}

export interface userAndFoodInterface {
    foodId: number;
    userId: number;
}

export interface editFoodInterface {
    foodId: number;
    newFoodName?: foodValues;
    newFoodCost?: number;
}

export interface foodsArrayInterface {
    [dynamic: number]: number;
}
export interface userInterface {
    userId: number;
    userName: string;
    initialMoneySpent: number;
    foods: foodsArrayInterface;
    expectedPay: number;
}

export interface addFoodToUserInterface {
    affectedUsers: number[];
    foodId: number;
    newFoodDividedValue: number;
}

export interface removeFoodFromUserInterface {
    userId: number;
    affectedUsers: number[];
    foodId: number;
    newFoodDividedValue: number;
}

export interface editUserInterface {
    userId: number;
    newUserName?: string;
    newInitialMoneySpent?: number;
}

export interface newUsersFoodsDataInterface {
    [dynamic: number]: { [dynamic: number]: number };
}

export interface stateInterface {
    users: { [dynamic: string]: userInterface };
    userList: string[];
    addUser: (userName?: string) => void;
    editUser: ({
        userId,
        newUserName,
        newInitialMoneySpent,
    }: editUserInterface) => void;

    foods: { [dynamic: string]: foodInterface };
    foodList: string[];
    addFood: () => void;
    editFoodValues: ({
        foodId,
        newFoodName,
        newFoodCost,
    }: editFoodInterface) => void;

    connectUserAndFood: ({ userId, foodId }: userAndFoodInterface) => void;
    disconnectUserAndFood: ({ userId, foodId }: userAndFoodInterface) => void;
    deleteUser: ({ userId }: { userId: number }) => void;
    deleteFood: ({ foodId }: { foodId: number }) => void;
}

import { foodValues } from '../Constants/interfaces';

export interface foodInterface {
    foodId: number;
    foodName: foodValues;
    foodCost: number;
    dividedValue: number;
    peoplePaying: number[];
    buyer: number | null;
    useUnits: boolean;
    unitsConsumedTotal: number;
    unitsCost: number;
}

export interface userInterface {
    userId: number;
    userName: string;
    initialMoneySpent: number;
    foods: foodsConsumedInterface;
    expectedPay: number;
    boughtFoods: foodsBoughtInterface;
    moneySpentOnBoughtFoods: number;
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

export interface foodsConsumedInterface {
    [dynamic: number]: {
        dividedValue: number;
        useUnits: boolean;
        unitsConsumed: number;
        unitsCost: number;
        unitsTotalSpent: number;
    };
}
export interface foodsBoughtInterface {
    [dynamic: number]: number;
}

export interface updateAffectedUsersInterface {
    affectedUsers: number[];
    foodId: number;
    newFoodDividedValue: number;
    newFoodCost?: number;
    foodBuyer?: number | null;
}

export interface removeFoodFromUserInterface {
    userId: number;
    foodId: number;
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

    handleToggleUserConsumesFood: ({
        userId,
        foodId,
        currentStatus,
    }: {
        userId: number;
        foodId: number;
        currentStatus: boolean;
    }) => void;
    deleteUser: ({ userId }: { userId: number }) => void;
    deleteFood: ({ foodId }: { foodId: number }) => void;
    handleToggleBuyer: ({
        foodId,
        newBuyerUserId,
        previousBuyerUserId,
        foodCost,
    }: {
        foodId: number;
        newBuyerUserId: number;
        previousBuyerUserId: number | null;
        foodCost: number;
    }) => void;
    handleToggleFoodUnitsStatus: ({ foodId }: { foodId: number }) => void;
}

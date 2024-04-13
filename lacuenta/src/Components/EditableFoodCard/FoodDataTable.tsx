import { FoodCost } from './FoodCost';
import { FoodDividedValue } from './FoodDividedValue';
import { FoodName } from './FoodName';

import './FoodDataTable.scss';
import { foodValues } from '../../Constants/interfaces';
import { FoodUnitsToggle } from './FoodUnitsToggle';

export const FoodDataTable = ({
    foodName,
    foodCost,
    foodId,
    handleOnNameChange,
    handleOnFoodCostChange,
    foodDividedValue,
    useUnits,
    handleOnToggleUnits,
    totalUnits,
    unitsCost,
}: {
    foodName: foodValues;
    foodCost: number;
    foodId: number;
    handleOnNameChange: (newFoodName: foodValues) => void;
    handleOnFoodCostChange: (newFoodCost: number) => void;
    foodDividedValue: number;
    useUnits: boolean;
    handleOnToggleUnits: (e: any) => void;
    totalUnits: number;
    unitsCost: number;
}) => {
    return (
        <div className="food-data-table-container">
            <div className="food-name flex-centered">
                <FoodName
                    foodName={foodName}
                    handleOnNameChange={handleOnNameChange}
                />
            </div>
            <div className="food-cost flex-centered">
                <FoodCost
                    foodCost={foodCost}
                    foodId={foodId}
                    handleOnFoodCostChange={handleOnFoodCostChange}
                />
            </div>
            <div className="food-divided-value flex-centered">
                <FoodDividedValue
                    foodDividedValue={foodDividedValue}
                    foodId={foodId}
                    useUnits={useUnits}
                    unitsCost={unitsCost}
                />
            </div>
            <div className="food-toggle-type flex-centered">
                <FoodUnitsToggle
                    useUnits={useUnits}
                    handleOnToggleUnits={handleOnToggleUnits}
                    totalUnits={totalUnits}
                />
            </div>
        </div>
    );
};

import { FoodCost } from './FoodCost';
import { FoodDividedValue } from './FoodDividedValue';
import { FoodName } from './FoodName';

import './FoodDataTable.scss';
import { foodValues } from '../../Constants/interfaces';

export const FoodDataTable = ({
    foodName,
    foodCost,
    foodId,
    handleOnNameChange,
    handleOnFoodCostChange,
    foodDividedValue,
}: {
    foodName: foodValues;
    foodCost: number;
    foodId: number;
    handleOnNameChange: (e: any) => void;
    handleOnFoodCostChange: (e: any) => void;
    foodDividedValue: number;
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
                />
            </div>
            <div className="food-toggle-type flex-centered">
                <p>Future toggle</p>
            </div>
        </div>
    );
};

import { CustomInput } from '../CustomInput';
import './FoodCost.scss';

export const FoodCost = ({
    foodId,
    handleOnFoodCostChange,
    foodCost,
}: {
    foodId: number;
    handleOnFoodCostChange: (event: any) => void;
    foodCost: number;
}) => {
    return (
        <div className="food-cost">
            <p className="food-cost-title">Costo: </p>
            <div className="food-cost-input">
                <CustomInput
                    inputName={`foodCost-${foodId}`}
                    inputType="number"
                    onChange={handleOnFoodCostChange}
                    value={foodCost}
                    placeholderText="Free"
                />
            </div>
        </div>
    );
};

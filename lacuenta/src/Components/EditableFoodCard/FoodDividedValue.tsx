import './FoodDividedValue.scss';

export const FoodDividedValue = ({
    foodId,
    foodDividedValue,
}: {
    foodId: number;
    foodDividedValue: number;
}) => {
    return (
        <div className={`food-divided-value ${foodId}`}>
            <p className="food-divided-value-title">Dvidido:</p>
            <p className="food-divided-value-amount">{foodDividedValue}</p>
        </div>
    );
};

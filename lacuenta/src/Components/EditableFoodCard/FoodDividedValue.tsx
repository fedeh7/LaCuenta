import './FoodDividedValue.scss';

export const FoodDividedValue = ({
    foodId,
    foodDividedValue,
    useUnits,
    unitsCost,
}: {
    foodId: number;
    foodDividedValue: number;
    unitsCost: number;
    useUnits: boolean;
}) => {
    const labelText = useUnits ? 'Por unidad' : 'Por persona';
    const valueToShow = Number(
        (useUnits ? unitsCost : foodDividedValue).toFixed(2),
    );
    return (
        <div className={`food-divided-value ${foodId}`}>
            <p className="food-divided-value-title">{labelText}</p>
            <p className="food-divided-value-amount">{valueToShow}</p>
        </div>
    );
};

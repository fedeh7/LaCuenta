import './FoodUnitsToggle.scss';

export const FoodUnitsToggle = ({
    useUnits,
    handleOnToggleUnits,
    totalUnits,
}: {
    useUnits: boolean;
    handleOnToggleUnits: (e: any) => void;
    totalUnits: number;
}) => {
    const buttonText = useUnits ? 'ON' : 'OFF';
    return (
        <div className="food-units-toggle-container">
            <div
                className="food-units-toggle-button"
                onClick={handleOnToggleUnits}>
                {buttonText}
            </div>
            <div className="food-units-total">{totalUnits}</div>
        </div>
    );
};

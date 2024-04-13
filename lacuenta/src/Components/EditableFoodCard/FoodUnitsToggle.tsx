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
    const totalUnitsText = `Unidades: ${totalUnits}`;
    return (
        <div className="food-units-toggle-container">
            <div
                className={`food-units-toggle-button ${
                    useUnits ? 'on' : 'off'
                }`}
                onClick={handleOnToggleUnits}>
                {buttonText}
            </div>
            <div className="food-units-total">{totalUnitsText}</div>
        </div>
    );
};

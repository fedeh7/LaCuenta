import { foodValues } from '../../Constants/interfaces';
import { IconSelector } from '../IconSelector';

export const FoodName = ({
    foodName,
    handleOnNameChange,
}: {
    foodName: foodValues;
    handleOnNameChange: (event: any) => void;
}) => {
    return (
        <IconSelector
            foodIcon={foodName}
            handleOnIconChange={handleOnNameChange}
        />
    );
};

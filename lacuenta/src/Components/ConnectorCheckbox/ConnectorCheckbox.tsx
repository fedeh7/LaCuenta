import { useContext, useEffect, useState } from 'react';
import './ConnectorCheckbox.scss';
import { GlobalContext } from '../../Context/GlobalContext';
import { FoodIconRenderer } from '../Icons';
import { foodValues } from '../../Constants/interfaces';
import { useLongPress } from '../../Utils';

export const ConnectorCheckbox = ({
    foodId,
    userId,
    checkboxText,
    showFoodIcon = false,
}: {
    foodId: number;
    userId: number;
    checkboxText: string | foodValues;
    showFoodIcon: boolean;
}) => {
    const { handleToggleUserConsumesFood, foods, handleToggleBuyer } =
        useContext(GlobalContext);

    const isChecked = foods[foodId].peoplePaying.includes(userId);

    const toggleChecked = () => {
        handleToggleUserConsumesFood({
            userId,
            foodId,
            currentStatus: isChecked,
        });
    };

    const toggleBuyerOnLongPress = () => {
        const foodCost = foods[foodId].foodCost;
        handleToggleBuyer({ foodId, userId, foodCost });
    };

    const longPressAttributes = useLongPress({
        onLongPress: toggleBuyerOnLongPress,
        onStart: toggleChecked,
    });

    const ChildComponent = showFoodIcon ? (
        // @ts-ignore
        <FoodIconRenderer icon={checkboxText} />
    ) : (
        <p className={`connector-checkbox`}>{checkboxText}</p>
    );

    return (
        <div
            className={`connector-checkbox-container ${
                isChecked ? 'checked' : ''
            } ${showFoodIcon ? 'foodIcon' : 'userName'}`}
            {...longPressAttributes}>
            {ChildComponent}
        </div>
    );
};

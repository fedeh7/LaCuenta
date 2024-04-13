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
    const isBuyer = foods[foodId].buyer === userId;

    const specialCssClasses = `${isChecked ? 'checked' : ''} ${
        showFoodIcon ? 'foodIcon' : 'userName'
    }  ${isBuyer ? 'buyer' : ''}`;

    const toggleChecked = () => {
        handleToggleUserConsumesFood({
            userId,
            foodId,
            currentStatus: isChecked,
        });
    };

    const toggleBuyerOnLongPress = () => {
        const foodCost = foods[foodId].foodCost;
        const previousBuyerUserId = foods[foodId].buyer;
        handleToggleBuyer({
            newBuyerUserId: userId,
            previousBuyerUserId,
            foodId,
            foodCost,
        });
    };

    const longPressAttributes = useLongPress({
        onLongPress: toggleBuyerOnLongPress,
        // onStart: toggleChecked,
        onCancel: toggleChecked,
    });

    const ChildComponent = showFoodIcon ? (
        // @ts-ignore
        <FoodIconRenderer icon={checkboxText} />
    ) : (
        <p className={`connector-checkbox`}>{checkboxText}</p>
    );

    // TODO: Quizas este elemento deberia ser un boton que abre un menu radial, si solo apreto lo consumo, si mantengo apretado abro el menu radial, puedo soltar en consumir, o soltar en comprar o soltar quizas en algo mas como setear unidades nose
    return (
        <div
            className={`connector-checkbox-container ${specialCssClasses}`}
            onContextMenu={(e: any) => e.preventDefault()}
            {...longPressAttributes}>
            {ChildComponent}
        </div>
    );
};

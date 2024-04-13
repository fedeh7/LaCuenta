import { useContext, useEffect, useState } from 'react';
import './ConnectorCheckbox.scss';
import { GlobalContext } from '../../Context/GlobalContext';
import { FoodIconRenderer } from '../Icons';
import { foodValues } from '../../Constants/interfaces';
import { useLongPress } from '../../Utils';
import { ConnectorCheckboxContent } from './ConnectorCheckboxContent';

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
    const {
        handleToggleUserConsumesFood,
        foods,
        handleToggleBuyer,
        handleSetNewUnitsAmount,
    } = useContext(GlobalContext);

    const isChecked = !!foods[foodId].peoplePaying[userId];
    const isBuyer = foods[foodId].buyer === userId;
    const isUsingUnits = foods[foodId].useUnits;
    const unitsConsumed = isChecked ? foods[foodId].peoplePaying[userId] : 0;

    const specialCssClasses = `${isChecked ? 'checked' : ''}  ${
        isBuyer ? 'buyer' : ''
    }`;

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

    const handleOnUnitsChange = (newUnits: string) => {
        const unitsAmount = Number(newUnits);
        const shouldConnectUserAndFood = !isChecked;
        handleSetNewUnitsAmount({
            foodId,
            userId,
            unitsAmount,
            shouldConnectUserAndFood,
        });
    };
    const longPressAttributes = useLongPress({
        onLongPress: toggleBuyerOnLongPress,
        // onStart: toggleChecked,
        onCancel: !isUsingUnits ? toggleChecked : undefined,
    });

    // TODO: Quizas este elemento deberia ser un boton que abre un menu radial, si solo apreto lo consumo, si mantengo apretado abro el menu radial, puedo soltar en consumir, o soltar en comprar o soltar quizas en algo mas como setear unidades nose
    return (
        <div
            className={`connector-checkbox-container ${specialCssClasses}`}
            onContextMenu={(e: any) => e.preventDefault()}>
            <ConnectorCheckboxContent
                checkboxText={checkboxText}
                isUsingUnits={isUsingUnits}
                showFoodIcon={showFoodIcon}
                unitsConsumed={unitsConsumed!}
                longPressControls={longPressAttributes}
                handleSetNewUnitsAmount={handleOnUnitsChange}
            />
        </div>
    );
};

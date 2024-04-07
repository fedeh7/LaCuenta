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
    const {
        connectUserAndFood,
        disconnectUserAndFood,
        foods,
        handleToggleBuyer,
    } = useContext(GlobalContext);

    const [checked, setChecked] = useState<boolean>(
        foods[foodId].peoplePaying.includes(userId),
    );

    useEffect(() => {
        const newState = foods[foodId].peoplePaying.includes(userId);
        setChecked(newState);
    }, [foods[foodId].peoplePaying.includes(userId)]);

    const toggleChecked = () => {
        console.log('checked');
        const newState = !checked;
        setChecked(newState); // TODO: This probably can be deleted, since the useEffect can update and set the state properly

        // This logic should be in the context, and not here, create a toogleUserBuysFood function or something like that
        if (newState) {
            connectUserAndFood({ userId, foodId });
        } else {
            disconnectUserAndFood({ userId, foodId });
        }
    };

    const setBuyerOnLongPress = () => {
        console.log('set buyer');
        const foodCost = foods[foodId].foodCost;
        handleToggleBuyer({ foodId, userId, foodCost });
    };

    const longPressAttributes = useLongPress({
        onLongPress: setBuyerOnLongPress,
        onStart: toggleChecked,
        onCancel: () => console.log('cancel'),
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
                checked ? 'checked' : ''
            } ${showFoodIcon ? 'foodIcon' : 'userName'}`}
            {...longPressAttributes}>
            {ChildComponent}
        </div>
    );
};

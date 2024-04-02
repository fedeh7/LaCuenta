import { memo, useContext, useEffect, useState } from 'react';
import './ConnectorCheckbox.scss';
import { GlobalContext } from '../../Context/GlobalContext';
import { IconRenderer } from '../Icons';
import { foodValues } from '../../Constants/interfaces';

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
    const { connectUserAndFood, disconnectUserAndFood, foods } =
        useContext(GlobalContext);

    const [checked, setChecked] = useState<boolean>(
        foods[foodId].peoplePaying.includes(userId),
    );

    useEffect(() => {
        const newState = foods[foodId].peoplePaying.includes(userId);
        setChecked(newState);
    }, [foods[foodId].peoplePaying.includes(userId)]);

    const toggleChecked = () => {
        const newState = !checked;
        setChecked(newState);

        if (newState) {
            connectUserAndFood({ userId, foodId });
        } else {
            disconnectUserAndFood({ userId, foodId });
        }
    };

    const ChildComponent = showFoodIcon ? (
        // @ts-ignore
        <IconRenderer icon={checkboxText} />
    ) : (
        <p className={`connector-checkbox`}>{checkboxText}</p>
    );

    return (
        <div
            className={`connector-checkbox-container ${
                checked ? 'checked' : ''
            } ${showFoodIcon ? 'foodIcon' : 'userName'}`}
            onClick={toggleChecked}>
            {ChildComponent}
        </div>
    );
};

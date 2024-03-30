import { memo, useContext, useEffect, useState } from 'react';
import './ConnectorCheckbox.scss';
import { GlobalContext } from '../../Context/GlobalContext';

export const ConnectorCheckbox = ({
    foodId,
    userId,
    checkboxText,
}: {
    foodId: number;
    userId: number;
    checkboxText: string;
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

    return (
        <p
            className={`food-checkbox ${checked && 'checked'}`}
            onClick={toggleChecked}>
            {checkboxText}
        </p>
    );
};

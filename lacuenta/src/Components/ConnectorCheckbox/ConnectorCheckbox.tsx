import { useContext, useEffect, useState } from 'react';
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
        if (checked !== foods[foodId].peoplePaying.includes(userId)) {
            const newState = !checked;
            setChecked(newState);
        }
    }, [foods]);

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

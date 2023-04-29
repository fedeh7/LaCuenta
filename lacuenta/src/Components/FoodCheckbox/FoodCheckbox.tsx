import { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContextProvider';
import './FoodCheckbox.scss';
export const FoodCheckbox = ({
    foodName,
    userName,
}: {
    foodName: string;
    userName: string;
}) => {
    const {
        connectUserAndFood,
        disconnectUserAndFood,

        users,
    } = useContext(UserContext);
    const [checked, setChecked] = useState<boolean>(
        Object.keys(users[userName].foods).includes(foodName),
    );

    const toggleChecked = () => {
        const newState = !checked;
        setChecked(newState);

        if (newState) {
            connectUserAndFood({ userName, foodName });
        } else {
            disconnectUserAndFood({ userName, foodName });
        }
    };

    return (
        <p
            className={`food-checkbox ${checked && 'checked'}`}
            onClick={toggleChecked}>
            {foodName}
        </p>
    );
};

import { useContext } from 'react';
import { UserContext } from '../../Context/UserContextProvider';
import './FoodDataContainer.scss';

export const FoodDataContainer = () => {
    const { foodList, foods } = useContext(UserContext);

    return (
        <div className="food-data-container">
            <h1 className="food-data-title">Comidas</h1>
            {foodList.map((name: any, index: any) => {
                return (
                    <p key={index}>
                        {name} {foods[name].value} {foods[name].dividedValue}
                    </p>
                );
            })}
        </div>
    );
};

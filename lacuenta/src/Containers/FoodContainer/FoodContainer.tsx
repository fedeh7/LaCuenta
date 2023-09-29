import { useContext } from 'react';
import './FoodContainer.scss';
import { GlobalContext } from '../../Context/GlobalContext';
import { AddFoodButton } from '../../Components/AddFoodButton';
import { EditableFoodCard } from '../../Components/EditableFoodCard';

export const FoodContainer = () => {
    const { foodList, foods } = useContext(GlobalContext);
    return (
        <div className="food-container">
            <h1 className="food-title">Comidas</h1>
            <div className="food-card-container">
                {foodList.map((foodId: string, index: any) => {
                    const food = foods[foodId];
                    return <EditableFoodCard key={index} food={food} />;
                })}
            </div>
            <AddFoodButton />
        </div>
    );
};

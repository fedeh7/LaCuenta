import { useContext } from 'react';
import './EditableFoodCard.scss';
import { GlobalContext } from '../../Context/GlobalContext';
import { ConnectorCheckbox } from '../ConnectorCheckbox';
import { foodInterface } from '../../Context/Interfaces';
import { Card } from '../Card';
import { IconSelector } from '../IconSelector';
import { FOOD_TYPE } from '../../Constants';
import { FoodName } from './FoodName';
import { FoodCost } from './FoodCost';
import { FoodDividedValue } from './FoodDividedValue';

export const EditableFoodCard = ({ food }: { food: foodInterface }) => {
    const { userList, users, editFoodValues, deleteFood } =
        useContext(GlobalContext);
    const { foodId, foodName, foodCost, dividedValue } = food;

    const handleOnDeleteItem = () => {
        deleteFood({ foodId });
    };
    const handleOnNameChange = (e: string) => {
        updateFoodData({
            newFoodName: e,
        });
    };

    const handleOnCostChange = (e: any) => {
        updateFoodData({
            newFoodCost: e.target.value,
        });
    };

    const updateFoodData = ({
        newFoodName,
        newFoodCost,
    }: {
        newFoodName?: any;
        newFoodCost?: any;
    }) => {
        editFoodValues({
            foodId,
            newFoodName,
            newFoodCost,
        });
    };

    const checkboxList = userList.map((userId, index) => {
        return (
            <div className="food-users-checkbox" key={index}>
                <ConnectorCheckbox
                    userId={Number(userId)}
                    foodId={foodId}
                    checkboxText={users[userId].userName}
                    showFoodIcon={false}
                />
            </div>
        );
    });

    const nameIconSelector = (
        <IconSelector
            foodIcon={foodName}
            handleOnIconChange={handleOnNameChange}
        />
    );
    const itemTitle = (
        <FoodName foodName={foodName} handleOnNameChange={handleOnNameChange} />
    );
    const itemFirstValue = (
        <FoodCost
            foodCost={foodCost}
            foodId={foodId}
            handleOnFoodCostChange={handleOnCostChange}
        />
    );
    const itemSecondValue = (
        <FoodDividedValue foodDividedValue={dividedValue} foodId={foodId} />
    );
    return (
        <Card
            itemTitle={itemTitle}
            itemFirstValue={itemFirstValue}
            itemSecondValue={itemSecondValue}
            checkboxList={checkboxList}
            handleOnDeleteItem={handleOnDeleteItem}
        />
    );
};

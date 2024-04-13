import { useContext } from 'react';
import './EditableFoodCard.scss';
import { GlobalContext } from '../../Context/GlobalContext';
import { ConnectorCheckbox } from '../ConnectorCheckbox';
import { foodInterface } from '../../Context/Interfaces';
import { Card } from '../Card';
import { FoodDataTable } from './FoodDataTable';
import { foodValues } from '../../Constants/interfaces';

export const EditableFoodCard = ({ food }: { food: foodInterface }) => {
    const {
        userList,
        users,
        editFoodValues,
        deleteFood,
        handleToggleFoodUnitsStatus,
    } = useContext(GlobalContext);
    const {
        foodId,
        foodName,
        foodCost,
        dividedValue,
        useUnits,
        unitsConsumedTotal,
        unitsCost,
    } = food;

    const handleOnDeleteItem = () => {
        deleteFood({ foodId });
    };
    const handleOnNameChange = (newName: foodValues) => {
        updateFoodData({
            newFoodName: newName,
        });
    };

    const handleOnCostChange = (newCost: number) => {
        updateFoodData({
            newFoodCost: newCost,
        });
    };

    const handleOnToggleUnits = (e: any) => {
        handleToggleFoodUnitsStatus({ foodId });
    };

    const updateFoodData = ({
        newFoodName,
        newFoodCost,
    }: {
        newFoodName?: foodValues;
        newFoodCost?: number;
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

    const dataTable = (
        <FoodDataTable
            foodCost={foodCost}
            foodDividedValue={dividedValue}
            foodId={foodId}
            foodName={foodName}
            handleOnFoodCostChange={handleOnCostChange}
            handleOnNameChange={handleOnNameChange}
            useUnits={useUnits}
            handleOnToggleUnits={handleOnToggleUnits}
            totalUnits={unitsConsumedTotal}
            unitsCost={unitsCost}
        />
    );
    return (
        <Card
            dataTable={dataTable}
            checkboxList={checkboxList}
            handleOnDeleteItem={handleOnDeleteItem}
        />
    );
};

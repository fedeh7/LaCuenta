import { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContextProvider';
import { FoodCheckbox } from '../FoodCheckbox';
import './EditableFoodCard.scss';
import { CustomInput } from '../CustomInput';
import { GlobalContext } from '../../Context/GlobalContext';
import { ConnectorCheckbox } from '../ConnectorCheckbox';
import { foodInterface } from '../../Context/Interfaces';

export const EditableFoodCard = ({ food }: { food: foodInterface }) => {
    const { userList, users, editFoodValues } = useContext(GlobalContext);
    const { foodId, foodName, foodCost, dividedValue } = food;

    const handleOnNameChange = (e: any) => {
        updateFoodData({
            newFoodName: e.target.value,
        });
    };

    const handleOnCostChange = (e: any) => {
        const valueToSend = e.target.value ? e.target.value : 0;
        updateFoodData({
            newFoodCost: valueToSend,
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

    return (
        <div className="food-card">
            <div className="food-data">
                <div className="food-name">
                    <CustomInput
                        inputName={`foodName-${foodId}`}
                        inputType="text"
                        onChange={handleOnNameChange}
                        value={foodName}
                        placeholderText="Unknown"
                    />
                </div>

                <div className="food-money-spent">
                    <p className="food-money-spent-title">Costo:</p>
                    <div className="food-money-spent-input">
                        <CustomInput
                            inputName={`foodCost-${foodId}`}
                            inputType="number"
                            onChange={handleOnCostChange}
                            value={foodCost}
                            placeholderText="Unknown"
                        />
                    </div>
                </div>
                <div className="food-divided-value-container">
                    <p className="food-divided-value-title">Valor dividido</p>
                    <p className="food-divided-value">{dividedValue}</p>
                </div>
            </div>
            <div className="food-users-checklist">
                {userList.map((userId, index) => {
                    return (
                        <div className="food-users-checkbox" key={index}>
                            <ConnectorCheckbox
                                userId={Number(userId)}
                                foodId={foodId}
                                checkboxText={users[userId].userName}
                            />
                        </div>
                    );
                })}
            </div>
            <p>{food.peoplePaying}</p>
        </div>
    );
};

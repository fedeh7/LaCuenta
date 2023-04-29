import { useContext, useState } from 'react';
import { CustomButton } from '../../Components/CustomButton';
import { InputWithLabel } from '../../Components/InputWithLabel';
import { ModalContext } from '../../Context/ModalContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import './AddFoodForm.scss';

export const AddFoodForm = () => {
    const [foodName, setFoodName] = useState('');
    const [value, setValue] = useState();

    const { addFood, canAddFood } = useContext(UserContext);
    const { closeAllModals } = useContext(ModalContext);

    // const disabled = !userName;
    const handleAddFood = () => {
        if (foodName && canAddFood({ foodName }) && value && value > 0) {
            addFood({
                foodName,
                value,
            });
            closeAllModals();
        }
    };
    const handleOnNameChange = (e: any) => {
        setFoodName(e.target.value);
    };
    const handleOnMoneyChange = (e: any) => {
        setValue(e.target.value);
    };

    return (
        <div className="add-food-form">
            <h1 className="add-food-title">Agregar nueva comida</h1>

            <InputWithLabel
                inputType="text"
                inputName="addFoodName"
                labelText="Nombre de la comida"
                value={foodName}
                onChange={handleOnNameChange}
            />

            <InputWithLabel
                inputType="number"
                inputName="foodCost"
                labelText="Costo total de la comida"
                value={value}
                onChange={handleOnMoneyChange}
            />

            <CustomButton
                onClick={handleAddFood}
                text="Agregar"
                // disabled={disabled}
            />
        </div>
    );
};

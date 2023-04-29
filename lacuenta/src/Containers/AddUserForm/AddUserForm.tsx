import { useContext, useState } from 'react';
import { CustomButton } from '../../Components/CustomButton';
import { InputWithLabel } from '../../Components/InputWithLabel';
import { ModalContext } from '../../Context/ModalContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import './AddUserForm.scss';

export const AddUserForm = () => {
    const [userName, setUserName] = useState('');
    const [initialMoneySpent, setInitialMoneySpent] = useState();

    const { addUser, canAddUser } = useContext(UserContext);
    const { closeAllModals } = useContext(ModalContext);

    // const disabled = !userName;
    const handleAddUser = () => {
        if (userName && canAddUser(userName)) {
            addUser({
                userName,
                initialMoneySpent: initialMoneySpent ?? 0,
            });
            closeAllModals();
        }
    };
    const handleOnNameChange = (e: any) => {
        setUserName(e.target.value);
    };
    const handleOnMoneyChange = (e: any) => {
        setInitialMoneySpent(e.target.value);
    };

    return (
        <div className="add-user-form">
            <h1 className="add-user-title">Agregar nuevo comensal</h1>

            <InputWithLabel
                inputType="text"
                inputName="addUserName"
                labelText="Nombre del comensal"
                value={userName}
                onChange={handleOnNameChange}
            />

            <InputWithLabel
                inputType="number"
                inputName="userMoney"
                labelText="Cantidad de dinero ya gastada"
                value={initialMoneySpent}
                onChange={handleOnMoneyChange}
            />

            <CustomButton
                onClick={handleAddUser}
                text="Agregar"
                // disabled={disabled}
            />
        </div>
    );
};

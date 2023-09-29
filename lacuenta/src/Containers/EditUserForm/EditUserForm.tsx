import { useContext, useState } from 'react';
import { CustomButton } from '../../Components/CustomButton';
import { InputWithLabel } from '../../Components/InputWithLabel';
import { ModalContext } from '../../Context/ModalContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import './EditUserForm.scss';

export const EditUserForm = ({
    currentName,
    currentMoneySpent,
}: {
    currentName: string;
    currentMoneySpent: number;
}) => {
    const [userName, setUserName] = useState(currentName);
    const [moneySpent, setMoneySpent] = useState(currentMoneySpent);

    const { editUser, canEditUser } = useContext(UserContext);
    const { closeAllModals } = useContext(ModalContext);

    const handleEditUser = () => {
        if (
            userName &&
            canEditUser({ previousName: currentName, newName: userName })
        ) {
            editUser({
                previousName: currentName,
                newName: userName,
                newAmountOfMoneySpent: moneySpent ?? 0,
            });
            closeAllModals();
        }
    };
    const handleOnNameChange = (e: any) => {
        setUserName(e.target.value);
    };
    const handleOnMoneyChange = (e: any) => {
        setMoneySpent(e.target.value);
    };

    return (
        <div className="edit-user-form">
            <h1 className="edit-user-title">Editar comensal</h1>

            <InputWithLabel
                inputType="text"
                inputName="editUserName"
                labelText="Nombre del comensal"
                value={userName}
                onChange={handleOnNameChange}
            />

            <InputWithLabel
                inputType="number"
                inputName="userMoney"
                labelText="Cantidad de dinero ya gastada"
                value={moneySpent}
                onChange={handleOnMoneyChange}
            />

            <CustomButton onClick={handleEditUser} text="Editar" />
        </div>
    );
};

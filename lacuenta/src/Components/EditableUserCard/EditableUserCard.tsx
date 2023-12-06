import { useContext } from 'react';
import { CustomInput } from '../CustomInput';
import { GlobalContext } from '../../Context/GlobalContext';
import { ConnectorCheckbox } from '../ConnectorCheckbox';
import './EditableUserCard.scss';
import { userInterface } from '../../Context/Interfaces';
import { Card } from '../Card';

export const EditableUserCard = ({ user }: { user: userInterface }) => {
    const { editUser, foodList, foods } = useContext(GlobalContext);

    const { userId, userName, initialMoneySpent, expectedPay } = user;

    const handleOnNameChange = (e: any) => {
        updateUserData({
            newUserName: e.target.value,
        });
    };

    const handleOnMoneyChange = (e: any) => {
        updateUserData({
            newInitialMoneySpent: e.target.value,
        });
    };

    const updateUserData = ({
        newUserName,
        newInitialMoneySpent,
    }: {
        newUserName?: any;
        newInitialMoneySpent?: any;
    }) => {
        editUser({
            userId,
            newUserName,
            newInitialMoneySpent,
        });
    };

    const checkboxList = foodList.map((foodId, index) => {
        return (
            <div className="user-foods-checkbox" key={index}>
                <ConnectorCheckbox
                    foodId={Number(foodId)}
                    userId={userId}
                    checkboxText={foods[foodId].foodName}
                />
            </div>
        );
    });

    const moneyToPayTitle = expectedPay >= 0 ? 'Paga: ' : 'Recibe: ';
    const moneyToPayAmount = expectedPay >= 0 ? expectedPay : expectedPay * -1;
    const cssClassSpecialValue = expectedPay >= 0 ? 'red' : 'green';

    return (
        <Card
            itemType="user"
            Id={userId}
            handleOnItemNameChange={handleOnNameChange}
            itemName={userName}
            itemMoneyTitle="Ya gastado:"
            handleOnItemMoneyChange={handleOnMoneyChange}
            itemMoneyValue={initialMoneySpent}
            itemMoneyPlaceholderValue="No money"
            itemSpecialValueTitle={moneyToPayTitle}
            itemSpecialValueAmount={moneyToPayAmount}
            checkboxList={checkboxList}
            cssClassSpecialValue={cssClassSpecialValue}
        />
    );
};

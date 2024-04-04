import { useContext } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import { ConnectorCheckbox } from '../ConnectorCheckbox';
import './EditableUserCard.scss';
import { Card } from '../Card';
import { USER_TYPE } from '../../Constants';

export const EditableUserCard = ({ userId }: { userId: number }) => {
    const { editUser, foodList, foods, users, deleteUser } =
        useContext(GlobalContext);
    const { userName, initialMoneySpent, expectedPay } = users[userId];

    const handleOnDeleteItem = () => {
        deleteUser({ userId });
    };
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
                    showFoodIcon={true}
                />
            </div>
        );
    });

    const moneyToPayTitle = expectedPay >= 0 ? 'Paga: ' : 'Recibe: ';
    const moneyToPayAmount = expectedPay >= 0 ? expectedPay : expectedPay * -1;
    const cssClassSpecialValue = expectedPay >= 0 ? 'red' : 'green';

    return (
        <Card
            itemType={USER_TYPE}
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
            handleOnDeleteItem={handleOnDeleteItem}
        />
    );
};

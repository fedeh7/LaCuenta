import { useContext } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import { ConnectorCheckbox } from '../ConnectorCheckbox';
import { Card } from '../Card';
import './EditableUserCard.scss';
import { UserDataTable } from './UserDataTable';

export const EditableUserCard = ({ userId }: { userId: number }) => {
    const { editUser, foodList, foods, users, deleteUser } =
        useContext(GlobalContext);
    const {
        userName,
        initialMoneySpent,
        expectedPay,
        moneySpentOnBoughtFoods,
    } = users[userId];

    const handleOnDeleteItem = () => {
        deleteUser({ userId });
    };
    const handleOnNameChange = (newName: string) => {
        updateUserData({
            newUserName: newName,
        });
    };

    const handleOnMoneyChange = (newMoney: number) => {
        updateUserData({
            newInitialMoneySpent: newMoney,
        });
    };

    const updateUserData = ({
        newUserName,
        newInitialMoneySpent,
    }: {
        newUserName?: string;
        newInitialMoneySpent?: number;
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

    const UserTable = (
        <UserDataTable
            expectedPay={expectedPay}
            handleOnMoneyChange={handleOnMoneyChange}
            handleOnNameChange={handleOnNameChange}
            moneySpentOnBoughtFoods={moneySpentOnBoughtFoods}
            userId={userId}
            userMoneySpent={initialMoneySpent}
            userName={userName}
        />
    );
    return (
        <Card
            dataTable={UserTable}
            checkboxList={checkboxList}
            handleOnDeleteItem={handleOnDeleteItem}
        />
    );
};

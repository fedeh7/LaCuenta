import { UserCustomMoneySpent } from './UserCustomMoneySpent';
import { UserExpectedPay } from './UserExpectedPay';
import { UserMoneySpentOnBoughtFoods } from './UserMoneySpentOnBoughtFoods';
import { UserName } from './UserName';
import './UserDataTable.scss';

export const UserDataTable = ({
    userId,
    userName,
    handleOnNameChange,
    expectedPay,
    moneySpentOnBoughtFoods,
    userMoneySpent,
    handleOnMoneyChange,
}: {
    userId: number;
    userName: string;
    handleOnNameChange: (e: any) => void;
    expectedPay: number;
    moneySpentOnBoughtFoods: number;
    userMoneySpent: number;
    handleOnMoneyChange: (e: any) => void;
}) => {
    return (
        <div className="user-data-table-container">
            <div className="user-name flex-centered">
                <UserName
                    userId={userId}
                    userName={userName}
                    handleOnNameChange={handleOnNameChange}
                />
            </div>
            <div className="user-expected-pay flex-centered">
                <UserExpectedPay
                    userId={userId}
                    userExpectedPay={expectedPay}
                />
            </div>
            <div className="user-money-spent-buying flex-centered">
                <UserMoneySpentOnBoughtFoods
                    moneySpentOnBoughtFoods={moneySpentOnBoughtFoods}
                />
            </div>
            <div className="user-money-spent-extra flex-centered">
                <UserCustomMoneySpent
                    userId={userId}
                    userMoneySpent={userMoneySpent}
                    handleOnUserSpentMoneyChange={handleOnMoneyChange}
                />
            </div>
        </div>
    );
};

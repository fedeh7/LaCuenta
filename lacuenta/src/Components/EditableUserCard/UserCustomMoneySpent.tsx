import { CustomInput } from '../CustomInput';
import './UserCustomMoneySpent.scss';

export const UserCustomMoneySpent = ({
    userMoneySpent,
    userId,
    handleOnUserSpentMoneyChange,
}: {
    userMoneySpent: number;
    userId: number;
    handleOnUserSpentMoneyChange: (e: any) => void;
}) => {
    return (
        <div className="user-spent-money">
            <p className="user-spent-money-title">Extra</p>
            <div className="user-spent-money-value">
                <CustomInput
                    inputName={`userMoneySpent-${userId}`}
                    inputType="number"
                    onChange={handleOnUserSpentMoneyChange}
                    value={userMoneySpent}
                    placeholderText="No changes"
                />
            </div>
        </div>
    );
};

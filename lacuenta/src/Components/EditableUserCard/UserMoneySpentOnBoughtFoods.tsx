import { CustomInput } from '../CustomInput';
import './UserMoneySpentOnBoughtFoods.scss';

export const UserMoneySpentOnBoughtFoods = ({
    moneySpentOnBoughtFoods,
}: {
    moneySpentOnBoughtFoods: number;
}) => {
    return (
        <div className="user-money-spent-buying">
            <p className="user-money-spent-buying-title">Gastado</p>
            <p className="user-money-spent-buying-value">
                {moneySpentOnBoughtFoods}
            </p>
        </div>
    );
};

import { useContext } from 'react';
import { UserContext } from '../../Context/UserContextProvider';
import { AddFoodToUserButton } from '../AddFoodToUserButton';
import { FoodCheckbox } from '../FoodCheckbox';
import './UserCard.scss';

export const UserCard = ({ userName }: { userName: string }) => {
    const { foodList, users } = useContext(UserContext);
    const { initialMoneySpent, foods, expectedPay } = users[userName];

    return (
        <div className="user-card">
            <div className="user-data">
                <p className="user-name">{userName}</p>
                <p className="user-money-spent">{initialMoneySpent}</p>
                {/* <p className="user-foods">{foods}</p> */}
                <p className="user-to-pay">{expectedPay}</p>
            </div>
            <div className="user-foods-checklist">
                {/* <AddFoodToUserButton /> */}
                {foodList.map((foodName, index) => {
                    return (
                        <div className="user-foods-checkbox" key={index}>
                            <FoodCheckbox
                                foodName={foodName}
                                userName={userName}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

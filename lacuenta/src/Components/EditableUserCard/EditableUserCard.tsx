import { useContext, useState } from 'react';
import { CustomInput } from '../CustomInput';
import { GlobalContext } from '../../Context/GlobalContext';
import { ConnectorCheckbox } from '../ConnectorCheckbox';
import './EditableUserCard.scss';
import { userInterface } from '../../Context/Interfaces';

export const EditableUserCard = ({ user }: { user: userInterface }) => {
    const { editUser, foodList, foods } = useContext(GlobalContext);

    const { userId, userName, initialMoneySpent, expectedPay } = user;

    const handleOnNameChange = (e: any) => {
        updateUserData({
            newUserName: e.target.value,
        });
    };

    const handleOnMoneyChange = (e: any) => {
        const valueToSend = e.target.value ? e.target.value : 0;
        updateUserData({
            newInitialMoneySpent: valueToSend,
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

    return (
        <div className="user-card">
            <div className="user-data">
                <div className="user-name">
                    <CustomInput
                        inputName={`userName-${userId}`}
                        inputType="text"
                        onChange={handleOnNameChange}
                        value={userName}
                        placeholderText="Unknown"
                    />
                </div>

                <div className="user-money-spent">
                    <p className="user-money-spent-title">Ya gastado:</p>
                    <div className="user-money-spent-input">
                        <CustomInput
                            inputName={`userInitialMoney-${userId}`}
                            inputType="number"
                            onChange={handleOnMoneyChange}
                            value={initialMoneySpent}
                            placeholderText="Unknown"
                        />
                    </div>
                </div>
                <div className="user-expected-pay">
                    <p className="user-expected-pay-title">
                        {expectedPay >= 0 ? 'Paga: ' : 'Recibe: '}
                    </p>

                    <span
                        className={`user-expected-pay-number ${
                            expectedPay >= 0 ? 'red' : 'green'
                        }`}>
                        {expectedPay >= 0 ? expectedPay : expectedPay * -1}
                    </span>
                </div>
            </div>
            <div className="user-foods-checklist">
                {foodList.map((foodId, index) => {
                    return (
                        <div className="user-foods-checkbox" key={index}>
                            <ConnectorCheckbox
                                foodId={Number(foodId)}
                                userId={userId}
                                checkboxText={foods[foodId].foodName}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

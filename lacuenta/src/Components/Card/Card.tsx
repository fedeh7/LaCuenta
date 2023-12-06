import './Card.scss';
import { CustomInput } from '../CustomInput';

export const Card = ({
    itemType,
    Id,
    handleOnItemNameChange,
    itemName,
    itemMoneyTitle,
    handleOnItemMoneyChange,
    itemMoneyValue,
    itemMoneyPlaceholderValue,
    itemSpecialValueTitle,
    itemSpecialValueAmount,
    checkboxList,
    cssClassSpecialValue,
}: {
    itemType: string;
    Id: number;
    handleOnItemNameChange: any;
    itemName: string;
    itemMoneyTitle: string;
    handleOnItemMoneyChange: (e: any) => void;
    itemMoneyValue: number;
    itemMoneyPlaceholderValue: string;
    itemSpecialValueTitle: string;
    itemSpecialValueAmount: number;
    checkboxList: JSX.Element[];
    cssClassSpecialValue?: string;
}) => {
    return (
        <div className="card-container">
            <div className="card-data">
                <div className="card-data-name">
                    <CustomInput
                        inputName={`${itemType}Name-${Id}`}
                        inputType="text"
                        onChange={handleOnItemNameChange}
                        value={itemName}
                        placeholderText="Unknown"
                    />
                </div>

                <div className="card-data-money">
                    <p className="card-data-money-title">{itemMoneyTitle}</p>
                    <div className="card-data-money-input">
                        <CustomInput
                            inputName={`${itemType}Cost-${Id}`}
                            inputType="number"
                            onChange={handleOnItemMoneyChange}
                            value={itemMoneyValue}
                            placeholderText={itemMoneyPlaceholderValue}
                        />
                    </div>
                </div>
                <div className="card-data-special-value">
                    <p className="card-data-special-value-title">
                        {itemSpecialValueTitle}
                    </p>
                    <p
                        className={`card-data-special-value-amount ${cssClassSpecialValue}`}>
                        {itemSpecialValueAmount}
                    </p>
                </div>
            </div>
            <div className="card-checklist">{checkboxList}</div>
        </div>
    );
};

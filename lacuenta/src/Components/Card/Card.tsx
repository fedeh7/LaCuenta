import './Card.scss';
import { TrashIcon } from '../Icons';

export const Card = ({
    itemTitle,
    itemFirstValue,
    itemSecondValue,

    checkboxList,
    handleOnDeleteItem,
}: {
    itemTitle: any;
    itemFirstValue: any;
    itemSecondValue: any;
    checkboxList: JSX.Element[];
    handleOnDeleteItem: () => void;
}) => {
    return (
        <div className="card-container">
            <div
                className="card-container-delete-button"
                onClick={handleOnDeleteItem}>
                <TrashIcon />
            </div>
            <div className="card-first-row">
                <div className="card-item-title">
                    {/* {nameIconSelector ? (
                        nameIconSelector
                    ) : (
                        <CustomInput
                            inputName={`${itemType}Name-${Id}`}
                            inputType="text"
                            onChange={handleOnItemNameChange}
                            value={itemName}
                            placeholderText="Unknown"
                        />
                    )} */}
                    {itemTitle}
                </div>
            </div>
            <div className="card-second-row">
                <div className="card-item-first-value">
                    {/* <p className="card-data-money-title">{itemMoneyTitle}</p>
                    <div className="card-data-money-input">
                        <CustomInput
                            inputName={`${itemType}Cost-${Id}`}
                            inputType="number"
                            onChange={handleOnItemMoneyChange}
                            value={itemMoneyValue}
                            placeholderText={itemMoneyPlaceholderValue}
                        />
                    </div> */}
                    {itemFirstValue}
                </div>
                <div className="card-item-second-value">
                    {/* <p className="card-data-special-value-title">
                        {itemSpecialValueTitle}
                    </p>
                    <p
                        className={`card-data-special-value-amount ${cssClassSpecialValue}`}>
                        {itemSpecialValueAmount}
                    </p> */}
                    {itemSecondValue}
                </div>
            </div>
            <div className="card-third-row">{checkboxList}</div>
        </div>
    );
};

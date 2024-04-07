import './Card.scss';
import { TrashIcon } from '../Icons';

export const Card = ({
    firstRowItems,
    secondRowItems,

    checkboxList,
    handleOnDeleteItem,

    dataTable,
}: {
    firstRowItems?: JSX.Element;
    secondRowItems?: JSX.Element;

    checkboxList: JSX.Element[];
    handleOnDeleteItem: () => void;

    dataTable: JSX.Element;
}) => {
    return (
        <div className="card-container">
            <div
                className="card-container-delete-button"
                onClick={handleOnDeleteItem}>
                <TrashIcon />
            </div>
            <div className="card-data">{dataTable}</div>
            <div className="card-checkbox-list">{checkboxList}</div>
        </div>
    );
};

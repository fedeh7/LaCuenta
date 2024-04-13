import { INPUT_NUMBER } from '../../Constants';
import { foodValues } from '../../Constants/interfaces';
import { CustomInput } from '../CustomInput';
import { FoodIconRenderer } from '../Icons';
import './ConnectorCheckboxContent.scss';

export const ConnectorCheckboxContent = ({
    checkboxText,
    showFoodIcon,
    isUsingUnits,
    unitsConsumed,
    longPressControls,
    handleSetNewUnitsAmount,
}: {
    checkboxText: string | foodValues;
    showFoodIcon: boolean;
    isUsingUnits: boolean;
    unitsConsumed: number;
    longPressControls: {};
    handleSetNewUnitsAmount: (e: any) => void;
}) => {
    const hideUnitsClass = !isUsingUnits ? 'hidden' : '';
    const addPaddingRight = showFoodIcon && isUsingUnits ? 'padding-right' : '';
    const contentName = showFoodIcon ? (
        <div className={`connector-checkbox-icon`}>
            {/* @ts-ignore */}
            <FoodIconRenderer icon={checkboxText} />
        </div>
    ) : (
        <p className={`connector-checkbox-text`}>{checkboxText}</p>
    );

    return (
        <div
            className="connector-checkbox-content flex-centered"
            {...longPressControls}>
            <div className="connector-checkbox-content-name">{contentName}</div>
            <div
                className={`connector-checkbox-content-units flex-centered ${hideUnitsClass} ${addPaddingRight}`}>
                <p className="connector-checkbox-content-units-divider">:</p>
                <CustomInput
                    inputName="units"
                    inputType={INPUT_NUMBER}
                    value={unitsConsumed}
                    onChange={handleSetNewUnitsAmount}
                    placeholderText="0"
                />
            </div>
        </div>
    );
};

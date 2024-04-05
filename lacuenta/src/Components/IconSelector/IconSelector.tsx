import { useState } from 'react';
import { foodNameValues } from '../../Constants';
import './IconSelector.scss';
import { useCloseWhenClickingOutside } from '../../Utils';

import { foodValues } from '../../Constants/interfaces';
import { FoodIconRenderer } from '../Icons';

export const IconContainer = ({
    showIcons,
    selectIcon,
}: {
    showIcons: boolean;
    selectIcon: (icon: string) => void;
}) => {
    return (
        <div className={`icon-tooltip ${!showIcons ? 'hidden' : ''}`}>
            {foodNameValues.map((value: any, index: number) => {
                return (
                    <div
                        className="icon-wrapper"
                        key={index}
                        onClick={() => {
                            selectIcon(value);
                        }}>
                        <FoodIconRenderer icon={value} />
                    </div>
                );
            })}
        </div>
    );
};
export const IconSelector = ({
    foodIcon,
    handleOnIconChange,
}: {
    foodIcon: foodValues;
    handleOnIconChange: (icon: string) => void;
}) => {
    const [showIcons, setShowIcons] = useState(false);

    const closeiconsContainer = () => {
        setShowIcons(false);
    };
    const selectIcon = (icon: string) => {
        handleOnIconChange(icon);
        closeiconsContainer();
    };

    const toogleIconsContainer = () => {
        setShowIcons(!showIcons);
    };

    const ref = useCloseWhenClickingOutside(null, closeiconsContainer);

    return (
        <>
            <div className="icon-selector" ref={ref}>
                <div
                    className="icon-selector-selected-icon"
                    onClick={toogleIconsContainer}>
                    <FoodIconRenderer icon={foodIcon} />
                </div>

                <IconContainer showIcons={showIcons} selectIcon={selectIcon} />
            </div>
        </>
    );
};

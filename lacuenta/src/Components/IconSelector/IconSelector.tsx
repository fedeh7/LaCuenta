import { useState } from 'react';
import { foodIcons } from '../../Constants';
import './IconSelector.scss';
import { useCloseWhenClickingOutside } from '../../Utils';

const IconWrapper = ({ icon }: { icon: string }) => {
    return <span className="icon">{icon}</span>;
};
const IconContainer = ({
    showIcons,
    selectIcon,
}: {
    showIcons: boolean;
    selectIcon: (icon: string) => void;
}) => {
    return (
        <div className={`icon-tooltip ${!showIcons ? 'hidden' : ''}`}>
            {foodIcons.map((icon) => {
                return (
                    <div
                        onClick={() => {
                            selectIcon(icon);
                        }}>
                        <IconWrapper icon={icon} />
                    </div>
                );
            })}
        </div>
    );
};
export const IconSelector = ({
    foodIcon = foodIcons[0],
    handleOnIconChange,
}: {
    foodIcon: string;
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
                    <IconWrapper icon={foodIcon} />
                </div>

                <IconContainer showIcons={showIcons} selectIcon={selectIcon} />
            </div>
        </>
    );
};

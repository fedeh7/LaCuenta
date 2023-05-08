import { AddFoodModalButton } from '../../Components/AddFoodModalButton';
import { AddUserModalButton } from '../../Components/AddUserModalButton';
import './NavbarButtonsContainer.scss';

export const NavbarButtonsContainer = () => {
    return (
        <div className="navbar-buttons-container">
            <AddUserModalButton />
            <AddFoodModalButton />
        </div>
    );
};

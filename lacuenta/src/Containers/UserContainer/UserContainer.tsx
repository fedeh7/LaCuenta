import { memo, useContext } from 'react';
import './UserContainer.scss';
import { GlobalContext } from '../../Context/GlobalContext';
import { EditableUserCard } from '../../Components/EditableUserCard';
import { AddNewItemButton } from '../../Components/AddNewItemButton';

export const UserContainer = () => {
    const { userList, addUser } = useContext(GlobalContext);

    const handleAddUser = () => {
        addUser();
    };
    return (
        <div className="user-container">
            <h1 className="user-title">Comensales</h1>
            <div className="user-card-container">
                {userList.map((userId: string, index: any) => {
                    return (
                        <EditableUserCard key={index} userId={Number(userId)} />
                    );
                })}
            </div>
            <AddNewItemButton onClick={handleAddUser} />
        </div>
    );
};

import { useContext } from 'react';
import './UserContainer.scss';
import { GlobalContext } from '../../Context/GlobalContext';
import { EditableUserCard } from '../../Components/EditableUserCard';
import { AddNewItemButton } from '../../Components/AddNewItemButton';

export const UserContainer = () => {
    const { userList, users, addUser } = useContext(GlobalContext);

    const handleAddUser = () => {
        addUser();
    };
    return (
        <div className="user-container">
            <h1 className="user-title">Comensales</h1>
            <div className="user-card-container">
                {userList.map((userId: string, index: any) => {
                    const user = users[userId];
                    return <EditableUserCard key={index} user={user} />;
                })}
            </div>
            <AddNewItemButton onClick={handleAddUser} />
        </div>
    );
};

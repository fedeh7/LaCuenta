import { useContext } from 'react';
import { UserCard } from '../../Components/UserCard';
import { UserContext } from '../../Context/UserContextProvider';
import './UserContainer.scss';
import { AddUserButton } from '../../Components/AddUserButton';
import { GlobalContext } from '../../Context/GlobalContext';
import { EditableUserCard } from '../../Components/EditableUserCard';

export const UserContainer = () => {
    const { userList, users } = useContext(GlobalContext);

    return (
        <div className="user-container">
            <h1 className="user-title">Comensales</h1>
            <div className="user-card-container">
                {userList.map((userId: string, index: any) => {
                    const user = users[userId];
                    return <EditableUserCard key={index} user={user} />;
                })}
            </div>
            <AddUserButton />
        </div>
    );
};

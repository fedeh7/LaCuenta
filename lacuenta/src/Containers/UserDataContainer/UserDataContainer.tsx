import { useContext } from 'react';
import { UserCard } from '../../Components/UserCard';
import { UserContext } from '../../Context/UserContextProvider';
import './UserDataContainer.scss';

export const UserDataContainer = () => {
    const { userList } = useContext(UserContext);

    return (
        <div className="user-data-container">
            <h1 className="user-data-title">Comensales</h1>
            {userList.map((userName: string, index: any) => {
                return <UserCard key={index} userName={userName} />;
            })}
        </div>
    );
};

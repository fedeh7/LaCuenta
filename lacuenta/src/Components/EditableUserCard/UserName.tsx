import { CustomInput } from '../CustomInput';
import './UserName.scss';

export const UserName = ({
    userId,
    handleOnNameChange,
    userName,
}: {
    userId: number;
    handleOnNameChange: (e: any) => void;
    userName: string;
}) => {
    return (
        <div className={`user-name ${userId}`}>
            <CustomInput
                inputName={`userName-${userId}`}
                inputType="text"
                onChange={handleOnNameChange}
                value={userName}
                placeholderText="Unknown"
            />
        </div>
    );
};

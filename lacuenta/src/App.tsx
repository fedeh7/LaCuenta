import './App.scss';
import { FoodContainer } from './Containers/FoodContainer';
import { UserContainer } from './Containers/UserContainer';
import { GlobalContextProvider } from './Context/GlobalContext';

export const App = () => {
    return (
        <div className="App">
            <GlobalContextProvider>
                <UserContainer />
                <FoodContainer />
            </GlobalContextProvider>
        </div>
    );
};

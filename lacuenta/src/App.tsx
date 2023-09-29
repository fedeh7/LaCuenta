import './App.scss';
import { FoodContainer } from './Containers/FoodContainer';

import { FoodDataContainer } from './Containers/FoodDataContainer';

import { Modal } from './Containers/Modal';
import { NavbarButtonsContainer } from './Containers/NavbarButtonsContainer';
import { UserContainer } from './Containers/UserContainer';

import { UserDataContainer } from './Containers/UserDataContainer';
import { GlobalContextProvider } from './Context/GlobalContext';
import { ModalProvider } from './Context/ModalContextProvider';
import { UserProvider } from './Context/UserContextProvider';

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

// OLD SYSTEM
// export const App = () => {
//     return (
//         <div className="App">
//             <UserProvider>
//                 <ModalProvider>
//                     <NavbarButtonsContainer />

//                     <UserDataContainer />
//                     <FoodDataContainer />

//                     <Modal />
//                 </ModalProvider>
//             </UserProvider>
//         </div>
//     );
// };

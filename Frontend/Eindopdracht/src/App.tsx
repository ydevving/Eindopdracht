import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import Login from './components/pages/login/Login';
import Admin from './components/pages/admin/Admin';
import User from './components/pages/user/User';
import Transactions from './components/common/Transactions';
import ItemDetails from './components/common/ItemDetails';
import Navbar from './components/common/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState, useContext, createContext, useRef } from 'react'
import Session from './utilities/Session';
import CarInfoModal from './components/common/CarInfoModal';
import type { Item, Transaction } from './utilities/types';



export const GlobalContext: React.Context<any> = createContext<any>(false);

type ItemDisplayType = Item | Transaction | null;

function App() {

  useEffect(() => {
    // Session.instance.testInitialize();
  }, []);

  const itemDisplay = useRef(null);
  const [itemModal, setItemModal]: [boolean, React.Dispatch<boolean>] = useState<boolean>(false);

  return (
    <>
      <BrowserRouter>
        <GlobalContext value={[itemModal, setItemModal, itemDisplay]}>
          <Routes>
            <Route element={
              <>
                <Navbar />
                {(itemModal) ? (<CarInfoModal _item={itemDisplay.current} />) : null}
                <Outlet />
              </>
            }>
              <Route path="/login?" element={<Login />} />
              <Route path="user" element={<User />}>
                <Route path="item/:itemID"
                  element={<ItemDetails
                    item={{
                      image: "/src/assets/placeholderCar.jpg",
                      name: "Toyota 1000-THR Earthmover",
                      price: 50,
                      seats: 10000,
                      storage: 25000000,
                      type: "Supreme Machine",
                      isAutomatic: true
                    }} />
                  }
                />
              </Route>
              <Route path="/admin" element={<Admin />}>
                {/* <Route path="./transactions/:userID/:itemID?" element={<Transactions />} /> */}
              </Route>
            </Route>
          </Routes>
        </GlobalContext>
      </BrowserRouter>
    </>
  )
}

export default App

import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import Login from './components/pages/login/Login';
import Admin from './components/pages/admin/Admin';
import User from './components/pages/user/User';
import Transactions from './components/common/Transactions';
import ItemDetails from './components/common/ItemDetails';
import Navbar from './components/common/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={
            <>
              <Navbar />
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
      </BrowserRouter>
    </>
  )
}

export default App

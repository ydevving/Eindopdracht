import {BrowserRouter, Outlet, Route, Routes} from 'react-router';
import Login from './components/pages/login/Login';
import Admin from './components/pages/admin/Admin';
import User from './components/pages/user/User';
import Transactions from './components/common/Transactions';
import Item from './components/common/Item';
import Navbar from './components/common/Navbar';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<>
            <Navbar/>
            <Outlet/>
            </>}>
            <Route path="/login?" element={<Login/>}/>
            <Route path="/user" element={<User/>}>
              <Route path="/item/:itemID" element={<Item/>}/>
              <Route path="/transactions/:itemID?" element={<Transactions/>}/>
            </Route>
            <Route path="/admin" element={<Admin/>}>
              <Route path="/transactions/:userID/:itemID?" element={<Transactions/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

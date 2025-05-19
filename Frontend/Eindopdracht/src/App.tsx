import {BrowserRouter, Outlet, Route, Routes} from 'react-router';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user?/:" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

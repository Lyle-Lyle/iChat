import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/ichat/login' element={<Login />} />
          <Route path='/ichat/register' element={<Register />} />
          <Route path='/' element={<App />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

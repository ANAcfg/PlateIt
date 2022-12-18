import LoginPage from './Login';
import Main from './main';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    
    return (
      <BrowserRouter>
          <Routes>
            <Route exact path="" element={<LoginPage/>} />  
            <Route exact path="/Main" element={<Main/>} />                
          </Routes>
      </BrowserRouter>
    );
  }
  export default App;
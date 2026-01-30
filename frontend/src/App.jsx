import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./Pages/UserList";
import AddUser from "./Pages/AddUser";
import EditUser from "./Pages/EditUser";
import ViewUser from "./Pages/ViewUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/view/:id" element={<ViewUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

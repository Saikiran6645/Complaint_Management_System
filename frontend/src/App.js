import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavBar/NavigatorBar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ComplaintForm from "./components/ComplaintsForm/complaintsForm";
import ComplaintTable from "./components/ComplaintsTable/complaintsTable";
import UserComplaints from "./components/UserComplaints/UserComplaints";

function App() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <BrowserRouter>
      {userInfo ? <NavigationBar /> : " "}
      <Routes>
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/" element={<ComplaintForm />} exact />
        <Route path="/complaints" element={<ComplaintTable />} />
        <Route path="/userComplaints" element={<UserComplaints />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

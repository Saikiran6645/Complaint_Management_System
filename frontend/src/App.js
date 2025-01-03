import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ComplaintForm from "./components/ComplaintsForm/complaintsForm";
import ComplaintTable from "./components/ComplaintsTable/complaintsTable";
import UserComplaints from "./components/UserComplaints/UserComplaints";
import AuthComponent from "./components/AuthMiddleware";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route element={<AuthComponent />}>
          <Route path="/" element={<ComplaintForm />} exact />
          <Route path="/complaints" element={<ComplaintTable />} />
          <Route path="/userComplaints" element={<UserComplaints />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

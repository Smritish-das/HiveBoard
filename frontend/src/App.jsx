import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Dashboard from "./pages/Dashboard";
import Houshold from "./pages/Houshold";
import Settings from "./pages/Settings";
import UserProtectedWraper from "./pages/UserProtectedWraper";
import Prac from "./pages/Prac";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/prac" element={<Prac />} />
      <Route
        path="/dashboard"
        element={
          <UserProtectedWraper>
            <Dashboard />
          </UserProtectedWraper>
        }
      />
      <Route
        path="/household"
        element={
          <UserProtectedWraper>
            <Houshold />
          </UserProtectedWraper>
        }
      />
      <Route
        path="/settings"
        element={
          <UserProtectedWraper>
            <Settings />
          </UserProtectedWraper>
        }
      />
    </Routes>
  );
}

export default App;

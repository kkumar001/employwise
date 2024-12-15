import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EditUser, Login, UserList } from './components';
import Cookies from 'js-cookie';
import { ProtectedRoute } from './ProtectedRoute';

const isAuthenticated = () => !!Cookies.get("accesstoken");

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated() ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

import { LoginPages } from "./auth/pages/LoginPages";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useSelector } from "react-redux";

export const AppRoutes = () => {
  
    const { isAuth } = useSelector(state => state.auth);

    return (
      <Routes>
        {isAuth ?
          (
            <>
              <Route path="/*" element={<UserRoutes />} />
            </>
          )
          : <>
              <Route path="/login" element={<LoginPages />} />
              <Route path="/*" element={ <Navigate to="/login" />} />
            </>}
      </Routes>
    );
}

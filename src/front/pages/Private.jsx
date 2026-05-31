import { Navigate, useNavigate } from "react-router-dom";

export const Private = () => {

    const navigate = useNavigate();

    const token = sessionStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    const logout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="container mt-5">

            <h1>Private Page</h1>

            <p>
                Solo pueden acceder usuarios autenticados.
            </p>

            <button
                className="btn btn-danger"
                onClick={logout}
            >
                Logout
            </button>

        </div>
    );
};
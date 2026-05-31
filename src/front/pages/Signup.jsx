import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("BACKEND URL:", import.meta.env.VITE_BACKEND_URL);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            console.log("STATUS:", response.status);

            const data = await response.json();

            console.log("DATA:", data);

            if (response.ok) {
                sessionStorage.setItem("token", data.token);
                navigate("/private");
            } else {
                alert(data.msg || "Error");
            }
        } catch (error) {
            console.error("ERROR:", error);
            alert("Error conectando con el backend");
        }
    };

    return (
        <div className="container mt-5">
            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};
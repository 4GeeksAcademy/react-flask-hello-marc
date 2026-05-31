import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {

	const navigate = useNavigate();

	const token = sessionStorage.getItem("token");

	const logout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">

				<Link to="/">
					<span className="navbar-brand mb-0 h1">
						Authentication App
					</span>
				</Link>

				<div>

					{!token ? (
						<>
							<Link to="/login">
								<button className="btn btn-success me-2">
									Login
								</button>
							</Link>

							<Link to="/signup">
								<button className="btn btn-primary">
									Signup
								</button>
							</Link>
						</>
					) : (
						<>
							<Link to="/private">
								<button className="btn btn-warning me-2">
									Private
								</button>
							</Link>

							<button
								className="btn btn-danger"
								onClick={logout}
							>
								Logout
							</button>
						</>
					)}

				</div>

			</div>
		</nav>
	);
};
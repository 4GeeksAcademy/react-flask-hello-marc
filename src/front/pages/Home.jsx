import React from "react";

export const Home = () => {
	return (
		<div className="container text-center">

			<div className="py-5 mt-5">
				<h1 className="display-1 fw-bold">
					🔐 Authentication App
				</h1>

				<p className="lead mt-4">
					Sistema de autenticación desarrollado con
					React, Flask y JWT.
				</p>

				<p className="text-secondary">
					Registro, inicio de sesión y rutas protegidas mediante tokens JWT.
				</p>
			</div>

			<div className="row mt-5 g-4">

				<div className="col-md-4">
					<div className="card h-100 shadow">
						<div className="card-body">
							<h3>🔒 Seguridad</h3>
							<p>
								Protección de rutas mediante JWT y validación de usuarios.
							</p>
						</div>
					</div>
				</div>

				<div className="col-md-4">
					<div className="card h-100 shadow">
						<div className="card-body">
							<h3>⚡ React</h3>
							<p>
								Interfaz rápida y moderna construida con React.
							</p>
						</div>
					</div>
				</div>

				<div className="col-md-4">
					<div className="card h-100 shadow">
						<div className="card-body">
							<h3>🐍 Flask</h3>
							<p>
								Backend REST API desarrollado con Flask y SQLAlchemy.
							</p>
						</div>
					</div>
				</div>

			</div>

			<div className="mt-5">
				<p className="text-muted">
					Developed by Marc
				</p>
			</div>

		</div>
	);
};
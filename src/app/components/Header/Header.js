'use client';

import Link from "next/link";
import {useEffect, useState} from "react";
import {isAdmin} from "../../../core/auth";

export default function Header() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        setLoggedIn(!!token);

        if (token) {
            setAdmin(isAdmin());
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        setLoggedIn(false);
        setAdmin(false);

        window.location.href = "/login";
    };

    return (
        <header>
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">

                <Link
                    href="/"
                    className="d-flex align-items-center text-dark text-decoration-none"
                >
                    <h1>Vinyl rental store</h1>
                </Link>

                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">

                    {loggedIn ? (
                        <button
                            className="btn btn-link me-3 py-2 text-dark text-decoration-none"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="me-3 py-2 text-dark text-decoration-none"
                        >
                            Login
                        </Link>
                    )}

                    {admin && (
                        <Link
                            href="/vinyl/create"
                            className="me-3 py-2 text-dark text-decoration-none"
                        >
                            Create Vinyl
                        </Link>
                    )}

                </nav>

            </div>
        </header>
    );
}
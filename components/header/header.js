// Import NextJS image tag
import Image from 'next/image'

// The functional component Header receives the property of the global component in _app.js
export default function Header({ titleApp }) {
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <span className="container-brand">
                        <Image src="/favicon.ico" alt="Logo" width="45" height="45" />
                        <a className="navbar-brand">{ titleApp }</a>
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link">My jobs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">My resume</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Career research</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">About us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <style jsx>{`
                .header {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    z-index: 1000;
                }

                .container-brand {
                    display: flex;
                    align-items: center;
                }

                .container-brand a {
                    margin: 0 0 0 .25em;
                    padding: 0;
                }

                .navbar-collapse { flex-grow: 0; }

                .header a { cursor: pointer; }
            `}</style>
        </header>
    )
}
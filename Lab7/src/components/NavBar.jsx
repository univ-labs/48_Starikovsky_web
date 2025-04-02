import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-red-500 text-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <NavLink to="/">
                    <h1 className="text-xl text-white font-bold">hihi</h1>
                </NavLink>
                <NavLink to="/contact">
                    Контакты
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
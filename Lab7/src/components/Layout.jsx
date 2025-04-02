// components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ThemeToggle from './ThemeToggle';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <main className="container mx-auto p-4">
                <Outlet />
            </main>
            <ThemeToggle />
        </div>
    );
};

export default Layout;
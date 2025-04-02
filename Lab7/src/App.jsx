import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from "./pages/HomePages.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";
// import ErrorPage from './pages/ErrorPage'; // Создайте простой компонент для ошибок

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'contact',
                element: <ContactsPage />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
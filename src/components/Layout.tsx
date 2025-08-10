import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className='bg-gray-50 dark:bg-gray-900 min-h-screen font-sans transition-colors duration-300 flex flex-col'>
            <Navbar />
            <main className="flex-grow w-full px-4 sm:px-6 lg:px-12 py-8">
                <Outlet /> {/* This is where the specific page component witll be rendered */}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
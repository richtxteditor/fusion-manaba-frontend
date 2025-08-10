const Navbar = () => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-gray-800 dark:text-white">Fusion Manaba 🇪🇨</a>
                <div>
                    {/* this is where our Cart icon will go! */}
                    <p className="text-gray-600 dark:text-gray-300">Cart (0)</p>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
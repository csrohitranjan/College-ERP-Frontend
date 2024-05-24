import React from 'react';
import { FaTools } from 'react-icons/fa';

const MaintenancePage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?maintenance')" }}></div>
            <div className="relative z-10 p-10 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg max-w-md text-center">
                <FaTools className="mx-auto mb-4 text-5xl text-yellow-500 animate-pulse" />
                <h1 className="text-5xl font-bold mb-4">We'll be back soon!</h1>
                <p className="text-lg mb-8">
                    Sorry for the inconvenience. We're performing some maintenance at the moment. We'll be back up shortly!
                </p>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="text-blue-400 hover:text-blue-300 transition">Contact Us</a>
                    <a href="#" className="text-blue-400 hover:text-blue-300 transition">Twitter</a>
                    <a href="#" className="text-blue-400 hover:text-blue-300 transition">Facebook</a>
                </div>
            </div>
        </div>
    );
};

export default MaintenancePage;

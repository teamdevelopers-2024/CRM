import React from 'react';
import './Skelton.css'; // Import the CSS file for styles

const SkeletonLoader = () => {
    return (
        <div className="bg-gray-900 border border-gray-700 mb-6 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
                <div className="bg-gray-700 skeleton-loader rounded-full w-14 h-14 mr-4"></div>
                <div className="flex w-full flex-col">
                    <div className="flex justify-between items-center">
                        <div className="bg-gray-700 h-5 w-32 skeleton-loader rounded-md"></div>
                        <div className="bg-gray-700 h-8 w-24 skeleton-loader rounded-md"></div>
                    </div>
                    <div className="bg-gray-700 skeleton-loader h-4 w-48 rounded-md mb-1"></div>
                    <div className="bg-gray-700 skeleton-loader h-4 w-48 rounded-md mb-1"></div>
                    <div className="bg-gray-700 skeleton-loader h-4 w-32 rounded-md"></div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="bg-gray-700 skeleton-loader h-8 w-40 rounded-md"></div>
                <div className="flex space-x-2">
                    <div className="bg-gray-700 skeleton-loader rounded-full w-10 h-10"></div>
                    <div className="bg-gray-700 skeleton-loader rounded-full w-10 h-10"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;

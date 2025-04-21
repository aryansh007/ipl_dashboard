'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MatchLoading() {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-6">
            <button
                onClick={() => router.back()}
                className="mb-6 flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
            >
                <ArrowLeft size={16} className="mr-1" />
                Back
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="bg-gray-100 dark:bg-gray-700 p-4">
                    <div className="h-6 w-32 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>

                <div className="p-6">
                    <div className="flex justify-center items-center space-x-8 py-4">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full mb-2"></div>
                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        </div>
                        <div className="text-xl font-bold">vs</div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full mb-2"></div>
                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flex space-x-2 mb-4">
                            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
                            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
                            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        </div>

                        <div className="space-y-4">
                            <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
                            <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
                            <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
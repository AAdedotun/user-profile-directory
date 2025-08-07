import React, { useState } from "react";

export default function UserCard({ user }) {
    const [showMore, setShowMore] = useState(false);


    return (
        <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
            <p className="mt-1">{user.email}</p>
            <p className="italic">{user.company.name}</p>
            <p>{user.address.city}</p>

            <button
                onClick={() => setShowMore(prev => !prev)} className="mt-4 text-blue-600 hover:underline">
                {showMore ? 'Hide Details' : 'View More'}
            </button>

            {showMore && (
                <div className="mt-2 space-y-1 text-sm">
                    <p><strong>Phone:</strong>{user.phone}</p>
                    <p><strong>Website:</strong>{user.website}</p>
                    <p><strong>Address:</strong>{user.address.street}, {user.address.zipcode}</p>
                </div>
            )}
        </div>
    );
}
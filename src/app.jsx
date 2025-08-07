import React, { useState, useEffect } from "react";
import UserCard from './components/UserCard';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    },
        []);

    // derive city and company lists
    const cities = Array.from(new Set(users.map(u => u.address.city)));
    const companies = Array.from(new Set(users.map(u => u.company.name)));

    // Apply search + filters
    const filteredUsers = users
        .filter(u =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.username.toLowerCase().includes(search.toLowerCase()))
        .filter(u => (cityFilter ? u.address.city === cityFilter : true))
        .filter(u => (companyFilter ? u.company.name === companyFilter : true));

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
                <header className="flex flex-col sm:flex-row items-center justify-between p-6 space-y-4 sm:space-y-0">
                    <h1 className="text-3xl font-bold">User Profile Directory</h1>

                    <div className="flex flex-wrap items-center gap-4">
                        <input type="text" placeholder="Search name or username..." className="px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />

                        <select className="px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:outline-none" value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
                            <option value="">All Cities</option>
                            {cities.map(city => (
                                <option value={city} key={city}>{city}</option>
                            ))}
                        </select>

                        <select value={companyFilter} onChange={e => setCompanyFilter(e.target.value)} className="px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:outline-none">
                            <option value="">All Companies</option>
                            {companies.map(comp => (
                                <option key={comp} value={comp}>{comp}</option>
                            ))}
                        </select>

                        <button onClick={() => setDarkMode(prev => !prev)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                </header>


                {loading && <p className="text-center p-6">Loading users...</p>}
                {error && <p className="text-center p-6 text-red-500">Error: {error} </p>}

                {!loading && !error && (
                    <main className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredUsers.map(user => (
                            <UserCard key={user.id} user={user} />
                        ))}

                        {filteredUsers.length === 0 && (
                            <p className="col-span-full text-center">No users match your criteria</p>
                        )}
                    </main>
                )}
            </div>
        </div>
    );
}

export default App;
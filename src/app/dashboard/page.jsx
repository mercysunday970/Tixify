"use client";
import { useEffect, useState } from 'react';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react'
import { House } from 'lucide-react'
import { BadgeCheck } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { useRouter } from 'next/navigation';
// Import necessary icons
// ⚠️ NOTE: Replace these with your actual component imports (Card, Button, Dialog, etc.)
// and your icon imports (e.g., from 'lucide-react').
// Assuming: Card, CardHeader, CardTitle, CardContent, Button, Tag, CheckSquare, LogOut, Home are available. 

// --- Helper Function to Calculate Stats ---
const calculateStats = (tickets) => {
    // Assuming 'Sold Out' and 'In Progress' count as closed/resolved for display purposes.
    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'Open').length;
    const resolved = tickets.filter(t => t.status === 'Sold Out').length;
    const inProgress = tickets.filter(t => t.status === 'In Progress').length;

    return { total, open, resolved, inProgress };
};

// --- Dashboard Component ---
export default function Dashboard() {
    
    const router = useRouter();

    const [tickets, setTickets] = useState([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const saved = localStorage.getItem("tickets"); // 👈 Must use the correct key: "tickets"
        if (saved) {
            setTickets(JSON.parse(saved));
        } else {
            // OPTIONAL: If localStorage is empty, ensure state defaults to an empty array
            setTickets([]); 
        }
    }, []);
    // Redefine the functions to use routing
    const onLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("tickets"); 
        router.push('/login'); // Redirects to your login page
    };

    const navigateToTickets = () => {
        router.push('/tickets'); // Redirects to the Ticket Management page
    };
    
    // ... rest of your DashboardView logic ...
    // Calculate statistics
    const stats = calculateStats(tickets);

    // Define the data for the statistics cards
    const statsData = [
        { 
            title: "Total Tickets", 
            value: stats.total, 
            icon: Ticket, 
            color: "text-indigo-500" 
        },
        { 
            title: "Open Tickets", 
            value: stats.open, 
            // Replace 'Home' with your actual icon component
            icon: House, 
            color: "text-red-500" 
        },
        { 
            title: "In Progress", 
            value: stats.inProgress, 
            // Replace 'CheckSquare' with your actual icon component
            icon: BadgeCheck, 
            color: "text-yellow-500" 
        },
        { 
            title: "Sold Out/Resolved", 
            value: stats.resolved, 
            // Replace 'CheckSquare' with your actual icon component
            icon: BadgeCheck, 
            color: "text-green-500" 
        },
    ];

    return (
        // 1. Main Layout Container (Adheres to the gradient and full screen)
        // Note: I'm using max-w-7xl here, which is 1280px. If you need 1440px exactly, use a custom utility class.
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-600 to-blue-600 text-white overflow-hidden">

            {/* Header & Logout Button Section */}
            <header className="px-8 py-6 flex justify-between items-center max-w-7xl w-full mx-auto">
                <h1 className="text-4xl font-extrabold">TIXIFY Dashboard</h1>
                
                {/* 2. Visible Logout Button */}
                <Button 
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold flex items-center gap-2 transition duration-300"
                    onClick={onLogout} // This function must clear session/storage and redirect
                >
                    {/* Replace 'LogOut' with your actual icon component */}
                    <LogOut className="w-5 h-5" /> 
                    Logout
                </Button>
            </header>

            {/* --- Main Content Area (Max-width and Centered) --- */}
            <div className="flex-grow p-6 max-w-7xl w-full mx-auto">
                
                <p className="mb-12 text-lg text-center">
                    A snapshot of your current ticket status.
                </p>

                {/* 3. Summary Statistics Grid */}
                {/* Grid now shows 4 stats, adjusting based on screen size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statsData.map((stat) => (
                        <Card key={stat.title} className="bg-white text-gray-900 shadow-xl border-t-4 border-indigo-400">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">{stat.value}</div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {stat.title === 'Total Tickets' ? 'Overall Count' : 'Current Status'}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* 4. Navigation Link to Ticket Management Screen */}
                <div className="text-center mt-12">
                    <Button 
                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-8 text-lg rounded-lg shadow-xl transition duration-300"
                        onClick={navigateToTickets} // This function redirects to the ticket list (homepage)
                    >
                        Go to Ticket Management Screen
                    </Button>
                </div>

            </div>
            
            {/* Footer remains the same */}
            
        </div>
    );
}
        <footer className="flex flex-col md:flex-row justify-between items-center gap-6 bg-gray-200 text-black w-full px-8 py-6 mt-8 text-center">
            <p className="flex items-center gap-2 text-2xl font-extrabold">
                <Ticket className="w-6 h-6 text-blue-500" />
                TIXIFY
            </p>

            
            <p className="text-gray-600 text-sm">
                © 2024 <span className="font-semibold">TIXIFY</span>. All rights reserved.
            </p>

            
            <div className="flex gap-4 text-gray-500">
                <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
                <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-500 transition-colors" />
                <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-700 transition-colors" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-sky-500 transition-colors" />
            </div>
        </footer>
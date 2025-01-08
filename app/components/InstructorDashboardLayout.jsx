"use client"

import { useState } from "react";

import InstructorHeader from './DashboardHeaders/InstructorHeader'
import InstructorSidebar from './InstructorSidebar'

export const InstructorDashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <div className='bg-neutral-100'>
            <InstructorHeader toggleSidebar={toggleSidebar} />
            <InstructorSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
    )
}

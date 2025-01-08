"use client"

import { useState } from "react";


import StudentHeader from "./DashboardHeaders/StudentHeader";
import StudentSidebar from "./StudentSidebar";

export const StudentDashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <div className='bg-neutral-100'>
            <StudentHeader toggleSidebar={toggleSidebar} />
            <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
    )
}

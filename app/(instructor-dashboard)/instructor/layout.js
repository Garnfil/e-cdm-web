import 'bootstrap-icons/font/bootstrap-icons.css';
import "../../globals.css";
import cdmLogo from '../../../public/cdm-logo.webp';
import Image from 'next/image';
import InstructorSidebar from '@/app/components/InstructorSidebar';
import InstructorHeader from '@/app/components/DashboardHeaders/InstructorHeader';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { InstructorDashboardLayout } from '@/app/components/InstructorDashboardLayout';

export const metadata = {
    title: "E-CDM - Instructor Dashboard",
    description: "Web Portal for Students and Instructors",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
                <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet"></link>

            </head>
            <body
                className={`font-manrope antialiased bg-neutral-100`}
            >
                <ToastContainer />
                <InstructorDashboardLayout />
                <main className='content-compact px-4 lg:px-6 py-4 relative mt-20 lg:ms-64 transition-all duration-500 ease-in-out overflow-y-auto'>
                    {children}
                </main>
            </body>
        </html>
    );
}

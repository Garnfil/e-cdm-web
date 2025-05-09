import 'bootstrap-icons/font/bootstrap-icons.css';
import "../globals.css";
import cdmLogo from '../../public/cdm-logo.webp';
import Image from 'next/image';
import StudentSidebar from '../components/StudentSidebar';
import StudentHeader from '../components/DashboardHeaders/StudentHeader';
import { StudentDashboardLayout } from '../components/StudentDashbaordLayout';

export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
                <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet"></link>

            </head>
            <body className='font-manrope antialiased bg-neutral-100'>
                <StudentDashboardLayout />
                <main className='content-compact px-4 lg:px-6 py-4 relative mt-20 lg:ms-64 transition-all duration-500 ease-in-out overflow-y-auto'>
                    {children}
                </main>
            </body>
        </html>
    )
}

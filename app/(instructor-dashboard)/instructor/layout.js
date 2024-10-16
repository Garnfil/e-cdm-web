import 'bootstrap-icons/font/bootstrap-icons.css';
import "../../globals.css";
import cdmLogo from '../../../public/cdm-logo.webp';
import Image from 'next/image';
import InstructorSidebar from '@/app/components/InstructorSidebar';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

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
                <div className='bg-neutral-100'>
                    <ToastContainer />
                    <header className='fixed z-10 top-0 inset-x-0 lg:ms-64 py-3 px-4 lg:px-6 bg-neutral-100 flex justify-between items-center border-b border-black'>
                        <div className='flex items-center gap-3'>
                            <div className="flex flex-wrap items-stretch w-full relative">
                                <input type="text" className="flex-shrink flex-grow max-w-full leading-5 relative text-sm py-3 px-6 border border-black rounded focus:outline-none hover-shadow bg-white/60  focus:ring-0" placeholder="Search…" aria-label="Search" />
                                <div className="raiytahskcn top-1 end-0 -me-px">
                                    <button className="flex items-center py-2 px-4 -ms-1 rtl:-me-1 rounded-r rtl:rounded-l leading-5 hover:ring-0 focus:outline-none focus:ring-0" type="button">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='relative'>
                                <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow">
                                    <i className="bi bi-gear-fill"></i>
                                </button>
                            </div>
                            <div className='relative'>
                                <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow">
                                    <i className="bi bi-bell-fill"></i>
                                </button>
                            </div>
                            <div className='relative'>
                                <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow">
                                    <Image src={cdmLogo} className="w-10 h-10 flex-none rounded-full bg-white pointer-events-none" alt="cdm-logo" />
                                </button>
                            </div>
                        </div>
                    </header>
                    <InstructorSidebar />
                </div>
                <main className='content-compact px-4 lg:px-6 py-4 relative mt-20 lg:ms-64 transition-all duration-500 ease-in-out overflow-y-auto'>
                    {children}
                </main>
            </body>
        </html>
    );
}

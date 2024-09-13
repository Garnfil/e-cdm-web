import 'bootstrap-icons/font/bootstrap-icons.css';
import "../../globals.css";
import cdmLogo from '../../../public/cdm-logo.webp';
import Image from 'next/image';
import Link from 'next/link';
// import "../../layout.css";

export const metadata = {
    title: "E-CDM - Instructor Dashboard",
    description: "Web Portal for Students and Instructors",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
                <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet"></link>

            </head>
            <body
                className={`font-manrope antialiased bg-neutral-100`}
            >
                <div className='bg-neutral-100'>
                    <header className='fixed z-10 top-0 inset-x-0 lg:ms-64 py-3 px-4 lg:px-6 bg-neutral-100 flex justify-between items-center border-b border-black'>
                        <div className='flex items-center gap-3'>
                            <div class="flex flex-wrap items-stretch w-full relative">
                                <input type="text" class="flex-shrink flex-grow max-w-full leading-5 relative text-sm py-3 px-6 border border-black rounded focus:outline-none hover-shadow bg-white/60  focus:ring-0" placeholder="Search…" aria-label="Search" />
                                <div class="raiytahskcn top-1 end-0 -me-px">
                                    <button class="flex items-center py-2 px-4 -ms-1 rtl:-me-1 rounded-r rtl:rounded-l leading-5 hover:ring-0 focus:outline-none focus:ring-0" type="button">
                                        <i class="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='relative'>
                                <button class="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow">
                                    <i class="bi bi-gear-fill"></i>
                                </button>
                            </div>
                            <div className='relative'>
                                <button class="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow">
                                    <i class="bi bi-bell-fill"></i>
                                </button>
                            </div>
                            <div className='relative'>
                                <button class="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow">
                                    <Image src={cdmLogo} class="w-10 h-10 flex-none rounded-full bg-white pointer-events-none" />
                                </button>
                            </div>
                        </div>
                    </header>
                    <aside className='fixed justify-start items-center flex-col inset-y-0 start-0 sidebar gap-6 w-64 lg:min-w-64 lg:[&.show]:min-w-[0px] h-screen overflow-auto scrollbars bg-neutral-100 border-e border-black transition-all duration-500 ease-in-out -translate-x-full lg:translate-x-0 [&.show]:translate-x-0 max-lg:z-50 rtl:translate-x-full lg:rtl:translate-x-0'>
                        <div className='flex justify-center items-center flex-col gap-6'>
                            <div className='text-2xl font-black mx-7 flex justify-center items-center pt-4 gap-2'>
                                <Image src={cdmLogo} width={60} />
                                <h3 className='font-bold'>CDM</h3>
                            </div>

                            <ul className='flex flex-col gap-2 w-full px-4 instructor-sidebar-list'>
                                <li>
                                    <Link href={'/instructor/dashboard'}>
                                        <span class="flex-grow"><i class="bi bi-house-door-fill mr-2"></i> Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/instructor/classes'}>
                                        <span class="flex-grow"><i class="bi bi-collection-fill mr-2"></i> Classes</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/instructor/schedules'}>
                                        <span class="flex-grow"><i class="bi bi-calendar-event-fill mr-2"></i> Schedules</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <span class="flex-grow"><i class="bi bi-1-square-fill mr-2"></i> Grades</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <span class="flex-grow"><i class="bi bi-camera-video-fill mr-2"></i> Live Class</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <span class="flex-grow"><i class="bi bi-bar-chart-fill mr-2"></i> Analytics Report</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
                <main className='content-compact px-4 lg:px-6 py-4 relative mt-20 lg:ms-64 transition-all duration-500 ease-in-out overflow-y-auto'>
                    {children}
                </main>
            </body>
        </html>
    );
}

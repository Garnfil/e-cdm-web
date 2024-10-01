import "../globals.css";
import Image from "next/image";
import cdmLogo from "../../public/cdm-logo.webp";
import Link from "next/link";
import 'bootstrap-icons/font/bootstrap-icons.css';

export const metadata = {
    title: "E-CDM",
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
                className={`font-manrope antialiased`}
            >
                <nav className="nav-section h-24 max-width-container">
                    <div className="w-full h-full">
                        <div className="flex justify-between items-center h-full">
                            {/* Logo Section */}
                            <div className="w-[15%] border-black flex justify-center items-center py-2 h-full box-border">
                                <Image src={cdmLogo} width={65} height={65} />
                            </div>

                            {/* Menu Section */}
                            <div className="w-[70%] border-black flex justify-center items-center py-2 h-full box-border">
                                <ul className="flex space-x-6">
                                    <li className="">
                                        <Link className='font-normal' href={'/'}>Home</Link>
                                    </li>
                                    <li>
                                        <Link className='font-normal' href={'/school-calendar'}>School Calendar</Link>
                                    </li>
                                    <li>Institutes</li>
                                    <li>
                                        <Link className='font-normal' href={'/discussion-forum'}>Discussions</Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Button Section */}
                            <div className="xl:w-[30%] flex justify-center gap-2 items-center py-2 h-full box-border">
                                <Link href={'/instructor-login'} className="btn btn-primary">
                                    Instructor Login
                                </Link>
                                <Link href={'/student-login'} className="btn btn-secondary">
                                    Student Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
                {children}
            </body>
        </html>
    );
}

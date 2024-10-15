import localFont from "next/font/local";
import "../globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: "E-CDM",
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
                className={`font-manrope antialiased`}
            >
                <ToastContainer />
                {children}
            </body>
        </html>
    );
}

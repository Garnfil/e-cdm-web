
import "../globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { cookies } from 'next/headers'
import HomeNavbar from "../components/HomeNavbar";

export const metadata = {
    title: "E-CDM",
    description: "Web Portal for Students and Instructors",
};

export default function RootLayout({ children }) {
    const cookieStore = cookies();
    const session = cookieStore.get('session').value;
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
                <HomeNavbar />
                {children}
            </body>
        </html >
    );
}

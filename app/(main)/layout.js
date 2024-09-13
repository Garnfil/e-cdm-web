import localFont from "next/font/local";
import "../globals.css";

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
                {children}
            </body>
        </html>
    );
}

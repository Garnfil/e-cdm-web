import Image from "next/image";
import cdmLogo from '../../public/cdm-logo.webp';
import student from '../../public/student.png';
import Link from "next/link";

export default function Home() {
    return (
        <main className="bg-main">

            <nav className="nav-section h-24">
                <div className="w-full h-full">
                    <div className="flex justify-between items-center h-full">
                        {/* Logo Section */}
                        <div className="w-[15%] border-r-2 border-black flex justify-center items-center py-2 h-full box-border">
                            <Image src={cdmLogo} width={65} height={65} />
                        </div>

                        {/* Menu Section */}
                        <div className="w-[70%] border-r-2 border-black flex justify-center items-center py-2 h-full box-border">
                            <ul className="flex space-x-6">
                                <li className="font-bold">Home</li>
                                <li>School Calendar</li>
                                <li>Institutes</li>
                                <li>Contact Us</li>
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

            <section className="hero-section py-5" style={{ height: "calc(100vh - 6rem)", }}>
                <div className="max-width-container h-full">
                    <div className="flex justify-between items-center h-full border-2 border-black">
                        <div className="bg-[#FFC900] w-[60%] h-full px-10 border-r-2 border-black">
                            <div className="flex justify-center items-start gap-2 h-full w-[80%] flex-col">
                                <h1 className="text-[45px] font-[600]">Welcome to Colegio De Montalban – Shaping Minds, Building Futures</h1>
                                <p>Empowering students with quality education and values for a brighter tomorrow.</p>
                                <Link href={'/'} className="btn btn-primary mt-3">
                                    Register Now
                                </Link>
                            </div>
                        </div>
                        <div className="bg-[#0b4d10] w-[40%] h-full flex justify-center items-center">
                            <Image src={student} width={0} height={0} className="ml-[-60%]" />
                        </div>
                    </div>
                </div>
            </section>


        </main>


    );
}

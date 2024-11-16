import Image from "next/image";
import cdmLogo from '../../public/cdm-logo.webp';
import student from '../../public/student.png';
import Link from "next/link";

export default function Home() {
    return (
        <main className="bg-main">
            <section className="hero-section py-5" style={{ height: "calc(100vh - 6rem)", }}>
                <div className="max-width-container h-full">
                    <div className="flex justify-between items-center h-full border-2 border-black">
                        <div className="bg-[#FFC900] w-[60%] h-full px-10 border-r-2 border-black">
                            <div className="flex justify-center items-start gap-2 h-full w-[80%] flex-col">
                                <h1 className="text-[45px] font-[600]">Welcome to Colegio De Montalban – Shaping Minds, Building Futures</h1>
                                <p>Empowering students with quality education and values for a brighter tomorrow.</p>

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

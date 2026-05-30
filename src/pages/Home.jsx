import profileImg from '../assets/images/profile.png';
import { useState } from 'react';

export default function Home() {

    const [active, setActive] = useState(null);

    const handleClick = (e) => {
        setActive(e);
        setTimeout(() => setActive(null), 100);
    };

    return (
        <div className="
            flex flex-col-reverse items-center justify-center h-[80vh] gap-10 px-4
            sm:flex-col-reverse sm:gap-10 sm:pt-28 sm:pb-16 sm:px-10
            md:flex-row md:items-center md:justify-between md:gap-10 md:py-5 md:px-10
            lg:gap-16 lg:px-25 xl:px-45 xl:pt-10
            xl:gap-20 2xl:px-60
            md:min-h-[60vh]
        ">
            {/* Text Content */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left w-full md:w-auto">
                <div className="inline-block space-y-0 md:space-y-1">
                    <h2 className="text-gray-700 font-semibold text-2xl sm:text-xl md:text-2xl lg:text-4xl">
                        Hello mate!
                    </h2>
                    <h1 className="text-gray-700 font-semibold text-3xl sm:text-2xl md:text-3xl lg:text-5xl">
                        I am John Rey
                    </h1>
                    <h1 className="text-[#007acc] font-semibold text-3xl sm:text-2xl md:text-3xl lg:text-5xl">
                        Web Developer
                    </h1>
                    <p className="text-gray-700 text-base sm:text-md md:text-lg xl:text-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                        Aspiring Full-Stack Web Developer, I design and develop complete web solutions with clean code,
                        responsive design, high performance, and secure system architecture.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 sm:gap-4 mt-6 w-full justify-center md:justify-start">
                    <button
                        className={`flex-1 sm:flex-none sm:w-38 border border-[#007acc]/70 font-semibold text-gray-700
                            text-base sm:text-xl px-2 py-3 rounded-lg cursor-pointer
                            transition-all duration-300 ease-in-out
                            shadow-[0px_4px_0px_0px_rgb(0,122,204)]
                            ${active === "cv" ? "shadow-none translate-y-2" : ""}`}
                        onClick={() => handleClick("cv")}
                    >
                        Download CV
                    </button>
                    <button
                        className={`flex-1 sm:flex-none sm:w-38 border border-[#007acc]/70 font-semibold text-gray-700
                            text-base sm:text-xl px-2 py-3 rounded-lg cursor-pointer
                            transition-all duration-300 ease-in-out
                            shadow-[0px_4px_0px_0px_rgb(0,122,204)]
                            ${active === "git" ? "shadow-none translate-y-2" : ""}`}
                        onClick={() => handleClick("git")}
                    >
                        Github Project
                    </button>
                </div>
            </div>

            {/* Profile Image */}
            <div className="flex items-center justify-center shrink-0
                w-48 h-48
                sm:w-56 sm:h-56
                md:w-72 md:h-72
                lg:w-80 lg:h-80
                xl:w-104 xl:h-104
            ">
                <div
                    className="blob w-full h-full bg-[#007acc]/70 flex items-center justify-center overflow-hidden"
                    style={{ borderRadius: '73% 27% 57% 43% / 43% 57% 43% 57%' }}
                >
                    <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}

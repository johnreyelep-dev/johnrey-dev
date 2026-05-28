import { useState } from 'react';
import React from 'react';
import profile from '../assets/images/profile-image2.png';
import cplusplusCert from '../assets/certficate/C++_cert.jpg';
import hack4Gov from '../assets/certficate/Hack4Gov.jpg';
import Cert_Fundamentals from '../assets/certficate/Cert_Fundamentals.png';

const items = [
    { imgSrc: hack4Gov, description: "Hack4Gov Competition" },
    { imgSrc: cplusplusCert, description: "Mastering C++ Fundamentals" },
    { imgSrc: Cert_Fundamentals, description: " " }
];

function ShowImage({ imgSrc, description, onClose }) {
    if (!imgSrc) return null;

    return (
        <div
            className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4'
            onClick={onClose}
        >
            <div
                className='relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl'
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={imgSrc}
                    alt={description || "certificate"}
                    className='w-full h-full object-contain'
                />
                {description?.trim() && (
                    <div className='absolute bottom-0 w-full bg-black/50 text-white text-center py-3 text-base sm:text-xl font-semibold'>
                        {description}
                    </div>
                )}
                <button
                    className='absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-800 rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold shadow transition'
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

function Item({ items, onShowImage }) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {items.map((item, index) => (
                <div
                    key={index}
                    className='flex flex-col shadow-xl rounded-2xl overflow-hidden transition-all duration-300
                        ease-in-out cursor-pointer 
                        hover:border-[#007acc] hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md'
                    onClick={() => onShowImage(item)}
                >
                    <div className='w-full h-30 sm:h-28 lg:h-35 xl:h-45 flex items-center justify-center p-1 overflow-hidden'>
                        <img
                            src={item.imgSrc}
                            alt={item.description || "certificate"}
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='text-center p-1 sm:p-5 lg:p-3'>
                        <span className='text-gray-700 text-base sm:text-sm md:text-sm font-semibold'>{item.description}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function About() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="flex flex-col w-full pb-0 px-4 md:px-10 lg:px-35 xl:px-45 2xl:px-60">
            <ShowImage
                imgSrc={selectedImage?.imgSrc}
                description={selectedImage?.description}
                onClose={() => setSelectedImage(null)}
            />

            <div className='flex flex-col lg:flex-row w-full justify-between gap-10 lg:gap-16'>
                {/* Text & Certificates */}
                <div className="w-full lg:w-1/2">
                    <h1 className="text-gray-700 font-semibold text-2xl sm:text-3xl xl:text-4xl mb-3">About me</h1>
                    <p className="text-gray-700 text-base sm:text-md md:text-lg xl:text-xl text-justify leading-relaxed">
                        Aspiring Full-Stack Web Developer focused on building secure, scalable, and responsive web applications. With experience in HackForGov Capture-The-Flag competitions, I have hands-on exposure to cybersecurity challenges such as SQL injection, OSINT, and web exploitation that strengthening my ability to develop secure and reliable systems.
                    </p>
                </div>
                <div>
                    <h3 className="text-gray-700 font-semibold text-xl sm:text-2xl mb-3 mt-3 sm:mt-3 lg:mt-5">Certificate</h3>
                    <Item items={items} onShowImage={setSelectedImage} />
                </div>

                {/* Profile */}
                {/*<div className='flex flex-col invisible md:visible items-center justify-center text-center gap-4 lg:gap-5'>*/}
                {/*    <div className='flex items-center justify-center w-48 h-48 sm:w-64 sm:h-64 lg:w-75 lg:h-75 xl:w-96 xl:h-96 bg-[#007acc]/70 border-10 border-[#007acc] rounded-full overflow-hidden'>*/}
                {/*        <img src={profile} alt="profile" className='w-full h-full object-cover' />*/}
                {/*    </div>*/}
                {/*    <h3 className='text-gray-700 text-xl sm:text-2xl font-semibold'>John Rey Icaro Elep</h3>*/}
                {/*    <div className='flex items-center justify-between gap-5'>*/}
                {/*        <span className='text-gray-700 sm:text-md'>Full-Stack Developer </span>*/}
                {/*        <div className='w-1 h-1 bg-gray-700 rounded-full'></div>*/}
                {/*        <span className='text-gray-700 sm:text-md'>Security Enthusiast</span>*/}
                {/*    </div>*/}
                {/*    <div className='flex items-center justify-center shadow-[0px_0px_10px_rgba(0,122,204,0.8)] rounded-2xl'>*/}
                {/*        <div className='border-r border-[#007acc]/40 p-3 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10'>{items.length}+</div>*/}
                {/*        <div className='border-r border-[#007acc]/40 p-3 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10'>CTF Completed</div>*/}
                {/*        <div className='p-3 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 '>FS Dev</div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
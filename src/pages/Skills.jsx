import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ── Brand icons (npm i @fortawesome/free-brands-svg-icons) ──────────────────
import {
    faHtml5,
    faCss3Alt,   // "faCss" doesn't exist → faCss3Alt
    faJs,
    faReact,
    faPython,
    faPhp,
} from "@fortawesome/free-brands-svg-icons";

// ── Solid icons (npm i @fortawesome/free-solid-svg-icons) ───────────────────
import {
    faDatabase,   // used for MySQL fallback
    faShieldHalved,
    faLock,
    faGlobe,
    faMagnifyingGlass,
    faScroll,
    faTerminal,
} from "@fortawesome/free-solid-svg-icons";

// Tailwind, PostgreSQL, MongoDB have NO Font Awesome icon.
// We use Simple Icons SVGs via CDN instead (imported as <img>).
const SIMPLE_ICON_BASE = "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons";

const skills = [
    {
        category: "Cybersecurity",
        items: [
            {
                title: "Network Security",
                tools: ["nmap", "wireshark", "sniffing"],
                level: 30,
                progress: "Beginner",
                faIcon: faShieldHalved,
                iconColor: "#60A5FA",
            },
            {
                title: "Web Exploitation",
                tools: ["SQLi", "XSS", "IDOR", "SSRF"],
                level: 30,
                progress: "Beginner",
                faIcon: faGlobe,
                iconColor: "#F87171",
            },
            {
                title: "Forensics",
                tools: ["steganography", "log analysis"],
                level: 30,
                progress: "Beginner",
                faIcon: faMagnifyingGlass,
                iconColor: "#A78BFA",
            },
            {
                title: "OSINT",
                tools: ["recon", "google dorks"],
                level: 30,
                progress: "Beginner",
                faIcon: faScroll,
                iconColor: "#34D399",
            },
            {
                title: "Cryptography",
                tools: ["RSA", "hashing", "encoding"],
                level: 30,
                progress: "Beginner",
                faIcon: faLock,
                iconColor: "#FBBF24",
            },
            {
                title: "Scripting",
                tools: ["python", "bash", "automation"],
                level: 30,
                progress: "Beginner",
                faIcon: faTerminal,
                iconColor: "#4ADE80",
            },
        ],
    },
    {
        category: "Web Development",
        items: [
            {
                title: "HTML",
                level: 75,
                progress: "Advance",
                faIcon: faHtml5,        // ✅ correct
                iconColor: "#E34F26",
                tools: ["semantic", "accessibility"]
            },
            {
                title: "CSS",
                level: 70,
                progress: "Intermediate",
                faIcon: faCss3Alt,      // ✅ faCss → faCss3Alt
                iconColor: "#264DE4",
                tools: ["flexbox", "grid", "animation"]
            },
            {
                title: "TailwindCSS",
                level: 50,
                progress: "Intermediate",
                imgSrc: `${SIMPLE_ICON_BASE}/tailwindcss.svg`, // ✅ no FA icon exists
                iconColor: "#38BDF8",
                tools: ["responsive", "flexboxd", "grid"]
            },
            {
                title: "JavaScript",
                level: 55,
                progress: "Intermediate",
                faIcon: faJs,           // ✅ fixed typo: icons → icon, "faJs" → faJs
                iconColor: "#F7DF1E",
                tools: ["ES6+", "DOM", "async/await"]
            },
            {
                title: "React",
                level: 40,
                progress: "Beginner",
                faIcon: faReact,        // ✅ correct
                iconColor: "#61DAFB",
                tools: ["hooks", "state", "component"]
            },
            {
                title: "Python",
                level: 30,
                progress: "Beginner",
                faIcon: faPython,       // ✅ correct
                iconColor: "#3776AB",
                tools: ["scripting", "automation"]
            },
            {
                title: "PHP",
                level: 20,
                progress: "Beginner",
                faIcon: faPhp,          // ✅ correct
                iconColor: "#777BB4",
                tools: ["backend"]
            },
        ],
    },
    {
        category: "Database",
        items: [
            {
                title: "MySQL",
                level: 40,
                progress: "Beginner",
                imgSrc: `${SIMPLE_ICON_BASE}/mysql.svg`,       // ✅ no FA icon → Simple Icons
                iconColor: "#4479A1",
                tools: ["queries", "join", "indexing"]
            },
            {
                title: "PostgreSQL",
                level: 40,
                progress: "Beginner",
                imgSrc: `${SIMPLE_ICON_BASE}/postgresql.svg`,  // ✅ faPostgresql doesn't exist
                iconColor: "#336791",
                tools: ["advance queries", "relations"]
            },
            {
                title: "MongoDB",
                level: 40,
                progress: "Beginner",
                imgSrc: `${SIMPLE_ICON_BASE}/mongodb.svg`,     // ✅ faMdb doesn't exist
                iconColor: "#47A248",
                tools: ["NoSQL", "aggregation"]
            },
        ],
    },
];

function SkillsItem({ title, tools, level, progress, imgSrc, iconColor, faIcon }) {

    return (
        <div className={`shadow-[0px_5px_15px_0px_rgba(0,0,0,0.20)] rounded-2xl p-5 space-y-2 transition-all duration-300 ease-in-out
             hover:border-[#007acc] hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md`}>
            <div className="flex gap-3">
                {imgSrc ? (
                    <img src={imgSrc} alt={imgSrc} className='w-8 h-8' />
                ) : (
                    <FontAwesomeIcon icon={faIcon} style={{ color: iconColor }} size="xl" />
                )}
                <span className="text-gray-700 text-base lg:text-lg xl:text-xl font-semibold">{title}</span>
            </div>
            <div className="flex items-center gap-3">
                {tools && tools.length > 0 && (
                    tools.map((item, index) => (
                        <React.Fragment key={item}>
                            <span className="dot text-gray-700 text-sm ">{item}</span>
                            {index < tools.length - 1 && (
                                <div className="w-1 h-1 rounded-full bg-gray-700"></div>
                            )}
                        </React.Fragment>
                    ))
                )}
            </div>
            <div>
                <div style={{ width: `${level}%` }} className="bg-[#007acc] h-0.75 rounded-md"></div>
            </div>
            <div className="flex gap-3 items-center">
                <span className="text-[#007acc] text-sm font-semibold">{progress}</span>
                <div className="w-1 h-1 rounded-full bg-[#007acc]"></div>
                <span className="text-[#007acc] text-sm font-semibold">{level}%</span>
            </div>
        </div>
    );
}

function SkillsCategory({ category, items, num }) {

    return (
        <div>
            <div className="flex justify-end mt-8 mb-3">
                <span className="text-[14px] text-gray-700 font-semibold px-2 shadow-[0px_5px_15px_0px_rgba(0,0,0,0.20)] border-blue-100 rounded-md whitespace-nowrap">{category}</span>
            </div>
            {/* {items.length > 3 ? <div className={`grid grid-cols-3 gap-y-3 gap-x-3`}>
                {items.map((item) => (
                    <SkillsItem key={item.title} {...item} />
                ))}
            </div>
                : <div className={`grid grid-cols-3 grid-rows-1 gap-y-3 gap-x-3`}>
                    {items.map((item) => (
                        <SkillsItem key={item.title} {...item} />
                    ))}
                </div>} */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-3`}>
                {items.map((item) => (
                    <SkillsItem key={item.title} {...item}/>
                ))}
            </div>
        </div>
    );
}


export default function Skills() {

    return (
        <div className="flex flex-col w-full pb-0 px-4 md:px-10 lg:px-25 xl:px-45 2xl:px-60">
            <h1 className="text-gray-700 font-semibold text-2xl sm:text-3xl xl:text-4xl mb-3">Skills & Technologies</h1>
            <p className="text-gray-700 text-base lg:text-lg xl:text-xl">
                Passionate about breaking things ethically and building things beautifully. <br /> From CTF challenges to pixel-perfect UIs - security, code, and design in one place.
            </p>
            <div className="pt-10 pb-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                    <div className="flex flex-col justify-center shadow-[0px_5px_15px_0px_rgba(0,0,0,0.20)] rounded-lg p-2 transition-all duration-300 ease-in-out
                         hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md">
                        <h3 className="text-xl md:text-2xl lg:text-3xl text-[#007acc] font-bold">3+</h3>
                        <p className="text-[11px] lg:text-base text-gray-700 font-semibold">CTF Events</p>
                    </div>
                    <div className="flex flex-col justify-center shadow-[0px_5px_15px_0px_rgba(0,0,0,0.20)] rounded-lg p-2 transition-all duration-300 ease-in-out
                         hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md">
                        <h3 className="text-xl md:text-2xl lg:text-3xl text-[#007acc] font-bold">12</h3>
                        <p className="text-[11px] lg:text-base text-gray-700 font-semibold">Technologies</p>
                    </div>
                    <div className="flex flex-col justify-center shadow-[0px_5px_15px_0px_rgba(0,0,0,0.20)] rounded-lg p-2 transition-all duration-300 ease-in-out
                         hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md">
                        <h3 className="text-xl md:text-2xl lg:text-3xl text-[#007acc] font-bold">4</h3>
                        <p className="text-[11px] lg:text-base text-gray-700 font-semibold">Domains</p>
                    </div>
                    <div className="flex flex-col justify-center shadow-[0px_5px_15px_0px_rgba(0,0,0,0.20)] rounded-lg p-2 transition-all duration-300 ease-in-out
                         hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md">
                        <h3 className="text-xl md:text-2xl lg:text-3xl text-[#007acc] font-bold">PH</h3>
                        <p className="text-[11px] lg:text-base text-gray-700 font-semibold">Bicol region PH</p>
                    </div>
                </div>
            </div>
            <div>
                {skills.map((item) => (
                    <SkillsCategory key={item.category} {...item} />
                ))}
            </div>
        </div>
    );
}
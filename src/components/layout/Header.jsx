import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHouse, faUser, faFolderOpen, faCode, faEnvelope, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const navItems = [
    { icon: faHouse, label: "Home", href: "#Home" },
    { icon: faUser, label: "About", href: "#About" },
    { icon: faFolderOpen, label: "Project", href: "#Project" },
    { icon: faCode, label: "Skills", href: "#Skills" },
    { icon: faEnvelope, label: "Contact", href: "#Contact" },
];

function NavItem({ icon, label, href, isActive, onClick }) {
    const [hovered, setHovered] = useState(false);

    return (
        <li
            className="flex items-center cursor-pointer"
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <a href={href} className="relative flex items-center gap-2 transition-all duration-300">
                <FontAwesomeIcon icon={icon} style={{ color: "#007acc" }} className='md:text-md lg:text-lg'/>
                <span className=" md:text-sm lg:text-md font-semibold text-gray-700">{label}</span>
                <span
                    className={`absolute h-0.5 bg-[#007acc] bottom-0 left-1/2 -translate-x-1/2 top-6.25 md:top-6 transition-all duration-300 ease-in-out rounded-sm
                        ${hovered || isActive ? "w-full" : "w-0"}`}
                />
            </a>
        </li>
    );
}

function MobileNavItem({ icon, label, href, isActive, onClick }) {
    return (
        <li>
            <a
                href={href}
                onClick={onClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive
                        ? "bg-[#007acc]/10 text-[#007acc]"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
            >
                <FontAwesomeIcon icon={icon} size="lg" style={{ color: "#007acc" }} />
                <span className="font-semibold text-base">{label}</span>
            </a>
        </li>
    );
}

export default function Header() {
    const [active, setActive] = useState("Home");
    const [logoHovered, setLogoHovered] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    // IntersectionObserver for active section
    useEffect(() => {
        const sectionIds = navItems.map((item) => item.label);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-40% 0px -60% 0px", threshold: 0 }
        );
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Main Header */}
            <header
                ref={menuRef}
                className="flex justify-between items-center h-16 sm:h-18 w-full fixed top-0 left-0
                    px-4 sm:px-10 md:px-10 lg:px-25 xl:px-45 2xl:px-60
                    bg-white/80 backdrop-blur-md shadow-md z-50"
            >
                {/* Logo */}
                <a href="#Home" onClick={() => { setActive("Home"); setMenuOpen(false); }}>
                    <h1
                        className={`font-semibold text-[#007acc] text-2xl md:text-3xl cursor-pointer transition-all duration-300 ease-in-out
                            ${logoHovered ? "scale-125 [text-shadow:0_0_50px_#007acc]" : "scale-100"}`}
                        onMouseEnter={() => setLogoHovered(true)}
                        onMouseLeave={() => setLogoHovered(false)}
                    >
                        Toton
                    </h1>
                </a>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center md:gap-5 lg:gap-6">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.label}
                            {...item}
                            isActive={active === item.label}
                            onClick={() => setActive(item.label)}
                        />
                    ))}
                </ul>

                {/* Hamburger Button (mobile/tablet) */}
                <button
                    className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg
                        text-[#007acc] hover:bg-[#007acc]/10 transition-colors duration-200"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} size="xl" />
                </button>
            </header>

            {/* Mobile Drawer Overlay */}
            <div
                className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300
                    ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Drawer */}
            <nav
                className={`fixed top-16 right-0 h-[calc(100dvh-4rem)] w-64 bg-white/95 backdrop-blur-md
                    shadow-xl z-40 md:hidden flex flex-col
                    transition-transform duration-300 ease-in-out
                    ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <ul className="flex flex-col gap-1 p-4 mt-2">
                    {navItems.map((item) => (
                        <MobileNavItem
                            key={item.label}
                            {...item}
                            isActive={active === item.label}
                            onClick={() => {
                                setActive(item.label);
                                setMenuOpen(false);
                            }}
                        />
                    ))}
                </ul>
            </nav>
        </>
    );
}

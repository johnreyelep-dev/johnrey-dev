import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapLocation, faPaperPlane, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faFacebookF, faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

const INITIAL = { name: "", email: "", subject: "", platform: "", message: "" };

async function sendViaEmailsJS(form) {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            template_params: {
                from_name: form.name,
                from_email: form.email,
                subject: form.subject,
                platform: form.platform || "Not specified",
                message: form.message,
                reply_to: form.email,
            },
        }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to send. Please try again.");
    }
}

function validate(form) {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.subject) e.subject = "Please select a topic.";
    if (!form.message.trim()) e.message = "Message cannot be empty.";

    return e;
}

export default function Contact() {

    const [form, setForm] = useState(INITIAL);
    const [sending, setSending] = useState(false);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [apiError, setApiError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
        if (status) setStatus(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate(form);
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setSending(true);
        setStatus(null);

        try {
            await sendViaEmailsJS(form);
            setStatus("success");
            setForm(INITIAL);
        } catch (err) {
            setStatus("error");
            setApiError(err.message || "Something went wrong. Please try again.");
        } finally {
            setSending(false);
        }
    }
    return (
        <div className="w-full sm:px-10 md:px-20 lg:px-35 xl:px-45 2xl:px-60">
            <div>
                <h1 className="text-gray-700 font-semibold text-2xl sm:text-3xl xl:text-4xl mb-3">Contact & Reach out</h1>
                <p className="text-gray-700 text-base lg:text-lg xl:text-xl text-justify">Open to collaborations, CTF teams, and freelance opportunities.<br />
                    From Bicol Region PH — available remotely worldwide.</p>
            </div>
            <div className="pt-10 pb-5">
                <div className="grid grid-cols-3 gap-3 ">
                    <div className="flex flex-col justify-center shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)] rounded-lg p-3 transition-all duration-300 ease-in-out
                         hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md">
                        <h3 className="text-3xl text-[#007acc] font-bold">24h</h3>
                        <p className="text-gray-700 font-semibold">Response</p>
                    </div>
                    <div className="flex flex-col justify-center shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)] rounded-lg p-3 transition-all duration-300 ease-in-out
                         hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md">
                        <h3 className="text-3xl text-[#007acc] font-bold">3</h3>
                        <p className="text-gray-700 font-semibold">Platforms</p>
                    </div>
                    <div className="flex flex-col justify-center shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)] rounded-lg p-3 transition-all duration-300 ease-in-out
                         hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md">
                        <h3 className="text-3xl text-[#007acc] font-bold">Open</h3>
                        <p className="text-gray-700 font-semibold">To Collabs</p>
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-15 mb-5">
                    <span className="text-gray-700 font-semibold px-2 shadow-[0px_5px_15px_0px_rgba(0,0,0,0.20)] border-blue-100 rounded-md whitespace-nowrap">Send a Message</span>
                </div>
                <div className="flex justify-center md:gap-15 lg:gap-30 xl:gap-40">
                    <div className="w-1/2 ">
                        <div className="sm:space-y-1 lg:space-y-2 xl:space-y-3 w-full">
                            <span className="text-gray-700 text-base sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-sm font-semibold">GET IN TOUCH</span>
                            <h1 className="text-[#007acc] font-semibold sm:text-xl md:text-2xl lg:text-3xl">Let's build something great together...</h1>
                            <p className="text-gray-700 text-base lg:text-lg">Whether you have a project in mind or just want to say hello — we'd love to hear from you.</p>
                        </div>
                        <div className="flex flex-col md:gap-2 xl:gap-3 sm:mt-8 sm:mb-8 lg:mt-10 lg:mb-10 xl:mb-10 2xl:mt-20 2xl:mb-20">
                            <div className="flex gap-3 items-center">
                                <FontAwesomeIcon icon={faEnvelope} size='xl' style={{ color: "#007acc" }} className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.40)] rounded-sm p-1" />
                                <div className="flex flex-col">
                                    <span className="text-gray-700 text-md font-semibold" >Email</span>
                                    <span className="text-gray-700 text-md" >johnreyelep17@gmail.com</span>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <FontAwesomeIcon icon={faDiscord} size="xl" style={{ color: "#007acc", }} className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.40)] rounded-sm p-1" />
                                <div className="flex flex-col">
                                    <span className="text-gray-700 text-md font-semibold" >Discord</span>
                                    <span className="text-gray-700 text-md" >#totnn6</span>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <FontAwesomeIcon icon={faMapLocation} size="xl" style={{ color: "#007acc", }} className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.40)] rounded-sm p-1" />
                                <div className="flex flex-col">
                                    <span className="text-gray-700 text-md font-semibold" >Location</span>
                                    <span className="text-gray-700 text-md whitespace-nowrap" >Lubhag, Calangcawan Sur, Vinzons Camarines Norte</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <FontAwesomeIcon icon={faFacebookF} size="xl" style={{ color: "#007acc", }} className="border border-[#007acc] rounded-sm p-1 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md" />
                            <FontAwesomeIcon icon={faLinkedinIn} size="xl" style={{ color: "#007acc", }} className="border border-[#007acc] rounded-sm p-1 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md" />
                            <FontAwesomeIcon icon={faGithub} size="xl" style={{ color: "#007acc", }} className="border border-[#007acc] rounded-sm p-1 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md" />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}
                        className="w-1/2 shadow-[0px_0px_15px_3px_rgba(0,0,0,0.20)] rounded-2xl py-10 px-10">
                        <div className="flex gap-5 mb-5">
                            <div className="w-full flex flex-col">
                                <label htmlFor="" className="text-gray-700 text-lg font-semibold">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="px-2 border border-gray-400 h-10 rounded-md focus:outline-none" />
                                {errors.name && <span className="text-red-700">{errors.name}</span>}
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="" className="text-gray-700 text-lg font-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Your email"
                                    className="px-2 border border-gray-400 h-10 rounded-md focus:outline-none" />
                                {errors.email && <span className="text-red-700">{errors.email}</span>}
                            </div>
                        </div>
                        <div className="flex gap-5 mb-5">
                            <div className="w-full flex flex-col">
                                <label htmlFor="" className="text-gray-700 text-lg font-semibold">Subject</label>
                                <select name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    className="text-gray-700 px-1 border border-gray-400 h-10 rounded-md focus:outline-none"
                                >
                                    <option value="">Select a topic...</option>
                                    <option>CTF Collaboration</option>
                                    <option>Freelance Project</option>
                                    <option>Bug Bounty / Security</option>
                                    <option>Web Development</option>
                                    <option>Just saying hi 👋</option>
                                </select>
                                {errors.subject && <span className="text-red-700">{errors.subject}</span>}
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="" className="text-gray-700 text-lg font-semibold">Platform</label>
                                <select name="platform"
                                    value={form.platform}
                                    onChange={handleChange}
                                    className="text-gray-700 px-1 border border-gray-400 h-10 rounded-md focus:outline-none"
                                >
                                    <option value="">Optional...</option>
                                    <option>Email</option>
                                    <option>Discord</option>
                                    <option>LinkedIn</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full flex flex-col mb-5">
                            <label htmlFor="" className="text-gray-700 text-lg font-semibold">Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Enter your message..."
                                className="lg:h-32 xl:h-38 2xl:h-45 px-2 border border-gray-400 h-10 rounded-md
                                    focus:outline-none"
                            >
                            </textarea>
                        </div>
                        <div className="w-full">
                            {status === "success" && (
                                <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-300 text-green-700 text-sm font-semibold">
                                    ✅ Message sent! I'll get back to you within 24 hours.
                                </div>
                            )}
                            {status === "error" && (
                                <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-300 text-red-700 text-sm font-semibold">
                                    ❌ {apiError}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={sending}
                                className="flex items-center justify-center w-full gap-2 text-xl text-white font-semibold border border-[#007acc]/70 h-13 rounded-xl cursor-pointer transition-all duration-300 ease-in-out
                                shadow-[0px_4px_0px_0px_rgb(0,122,204)] active:translate-y-2 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {sending ? (
                                    <span className="text-[#007acc] text-xl font-semibold">Sending...</span>
                                ) : (
                                    <>
                                        <span className="text-[#007acc] text-xl font-semibold">Send message</span>
                                        <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#007acc" }} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
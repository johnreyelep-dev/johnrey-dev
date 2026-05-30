import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapLocation, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
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
        <div className="w-full px-4 md:px-10 lg:px-25 xl:px-45 2xl:px-60">
            <div>
                <h1 className="text-gray-700 font-semibold text-2xl sm:text-3xl xl:text-4xl mb-3">Contact & Reach out</h1>
                <p className="text-gray-700 text-base lg:text-lg xl:text-xl text-justify">Open to collaborations, CTF teams, and freelance opportunities.<br />
                    From Bicol Region PH — available remotely worldwide.</p>
            </div>
            <div className="pt-10 pb-5">
                <div className="grid grid-cols-3 gap-3 ">
                    <div className="flex flex-col justify-center shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)] rounded-lg p-2 md:p-3 transition-all duration-300 ease-in-out
                         hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md">
                        <h3 className="text-xl md:text-2xl lg:text-3xl text-[#007acc] font-bold">24h</h3>
                        <p className="text-[11px] lg:text-base text-gray-700 font-semibold">Response</p>
                    </div>
                    <div className="flex flex-col justify-center shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)] rounded-lg p-2 md:p-3 transition-all duration-300 ease-in-out
                         hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md">
                        <h3 className="text-xl md:text-2xl lg:text-3xl text-[#007acc] font-bold">3</h3>
                        <p className="text-[11px] lg:text-base text-gray-700 font-semibold">Platforms</p>
                    </div>
                    <div className="flex flex-col justify-center shadow-[0px_0px_15px_0px_rgba(0,0,0,0.20)] rounded-lg p-2 md:p-3 transition-all duration-300 ease-in-out
                         hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md">
                        <h3 className="text-xl md:text-2xl lg:text-3xl text-[#007acc] font-bold">Open</h3>
                        <p className="text-[11px] lg:text-base text-gray-700 font-semibold">To Collabs</p>
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-8 mb-5">
                    <span className="text-[14px] md:text-base text-gray-700 font-semibold px-2 shadow-[0px_5px_15px_0px_rgba(0,0,0,0.20)] border-blue-100 rounded-md whitespace-nowrap">Send a Message</span>
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-5 lg:gap-10 xl:gap-40">
                    <div className="w-full">
                        <div className="sm:space-y-1 lg:space-y-2 xl:space-y-3 w-full">
                            <span className="text-gray-700 text-[11px] md:text-[12px] lg:text-[13px] xl:text-sm font-semibold">GET IN TOUCH</span>
                            <h1 className="text-[#007acc] font-semibold text-xl md:text-2xl lg:text-3xl">Let's build something great together...</h1>
                            <p className="text-gray-700 text-base md:text-base lg:text-lg">Whether you have a project in mind or just want to say hello — we'd love to hear from you.</p>
                        </div>
                        <div className="flex flex-col gap-2 xl:gap-3 mt-5 mb-5 sm:mt-8 sm:mb-8 lg:mt-10 lg:mb-10 xl:mb-10 2xl:mt-20 2xl:mb-20">
                            <div className="flex gap-3 items-center">
                                <FontAwesomeIcon icon={faEnvelope} style={{ color: "#007acc" }} className="text-lg md:text-xl xl:text-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.40)] rounded-sm p-1" />
                                <div className="flex flex-col">
                                    <span className="text-gray-700 text-[14px] font-semibold" >Email</span>
                                    <span className="text-gray-700 text-[11px] " >johnreyelep17@gmail.com</span>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <FontAwesomeIcon icon={faDiscord} style={{ color: "#007acc", }} className="text-lg md:text-xl xl:text-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.40)] rounded-sm p-1" />
                                <div className="flex flex-col">
                                    <span className="text-gray-700 text-[14px] font-semibold" >Discord</span>
                                    <span className="text-gray-700 text-[11px]" >#totnn6</span>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <FontAwesomeIcon icon={faMapLocation} style={{ color: "#007acc", }} className="text-lg md:text-xl xl:text-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.40)] rounded-sm p-1" />
                                <div className="flex flex-col">
                                    <span className="text-gray-700 text-[14px] font-semibold" >Location</span>
                                    <span className="text-gray-700 text-[11px]" >Calangcawan Sur, Vinzons Camarines Norte</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mb-5 md:mb-0">
                            <FontAwesomeIcon icon={faFacebookF}  style={{ color: "#007acc", }} className="text-md md:text-xl xl:text-2xl border border-[#007acc] rounded-sm p-1 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md" />
                            <FontAwesomeIcon icon={faLinkedinIn}  style={{ color: "#007acc", }} className="text-md md:text-xl xl:text-2xl border border-[#007acc] rounded-sm p-1 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md" />
                            <FontAwesomeIcon icon={faGithub}  style={{ color: "#007acc", }} className="text-md md:text-xl xl:text-2xl border border-[#007acc] rounded-sm p-1 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[#007acc]/60 hover:shadow-md" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-full h-0.5 md:w-0.5 md:h-full bg-[#007acc]"></div>
                    </div>
                    <form onSubmit={handleSubmit}
                        className="w-full rounded-md pb-5 md:pt-5 md:pb-0 ">
                        <div className="flex justify-between gap-2 mb-3 md:gap-5 md:mb-5">
                            <div className="w-full flex flex-col">
                                <label htmlFor="" className="text-gray-700 text-[14px] lg:text-base font-semibold">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="w-full h-7 px-1 md:px-2 text-[12px] border border-gray-400 rounded-md focus:outline-none
                                               md:h-8 lg:h-10
                                               lg:text-[14px]" />
                                {errors.name && <span className="text-red-700">{errors.name}</span>}
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="" className="text-gray-700 text-[14px] lg:text-base font-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Your email"
                                    className="w-full h-7 px-1 md:px-2 text-[12px] border border-gray-400 rounded-md focus:outline-none
                                               md:h-8 lg:h-10
                                               lg:text-[14px] " />
                                {errors.email && <span className="text-red-700">{errors.email}</span>}
                            </div>
                        </div>
                        <div className="flex justify-between gap-2 mb-3 md:gap-5 md:mb-5">
                            <div className="w-full flex flex-col">
                                <label htmlFor="" className="text-gray-700 text-[14px] lg:text-base font-semibold">Subject</label>
                                <select name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    className="w-full h-7 text-[12px] text-gray-700 border border-gray-400 rounded-md focus:outline-none
                                               md:h-8 lg:h-10
                                               lg:text-[14px] lg:px-2"
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
                                <label htmlFor="" className="text-gray-700 text-[14px] lg:text-base font-semibold">Platform</label>
                                <select name="platform"
                                    value={form.platform}
                                    onChange={handleChange}
                                    className="w-full h-7 md:px-2 text-[12px] text-gray-700 border border-gray-400 rounded-md focus:outline-none
                                               md:h-8 lg:h-10
                                               lg:text-[14px]"
                                >
                                    <option value="">Optional...</option>
                                    <option>Email</option>
                                    <option>Discord</option>
                                    <option>LinkedIn</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full flex flex-col mb-5">
                            <label htmlFor="" className="text-gray-700 text-[14px] lg:text-base font-semibold">Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Enter your message..."
                                className="h-20 px-1 py-1 text-[12px] border border-gray-400 rounded-md
                                           focus:outline-none
                                           md:h-34 lg:h-36 xl:h-38 2xl:h-45
                                           lg:text-[14px] lg:px-2"
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
                                className="flex items-center justify-center w-full h-8 md:h-10 lg:h-12 gap-2 text-[11px] md:text-[14px] lg:text-base text-white font-semibold border border-[#007acc]/70 rounded-md cursor-pointer transition-all duration-300 ease-in-out
                                shadow-[0px_4px_0px_0px_rgb(0,122,204)] active:translate-y-2 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {sending ? (
                                    <span className="text-[#007acc] text-sm md:text-[14px] lg:text-base font-semibold">Sending...</span>
                                ) : (
                                    <>
                                        <span className="text-[#007acc] text-sm md:text-[14px] lg:text-base font-semibold">Send message</span>
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
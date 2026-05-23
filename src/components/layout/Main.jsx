import Home from '../../pages/Home';
import About from '../../pages/About';
import Skills from '../../pages/Skills';
import Contact from '../../pages/Contact';

export default function Main(){
    
    return (
        <div className="w-full mt-30 scroll-mt-18">
            <section id='Home'>
                <Home/>
            </section>
            <section id='About' className='mt-30 mb-20 scroll-mt-18'>
                <About/>
            </section>
            <section  id='Skills' className='mt-30 mb-20 scroll-mt-18'>
                <Skills/>
            </section>
            <section id='Contact' className='mt-30 mb-20 scroll-mt-18 '>
                < Contact/> 
            </section>
        </div>
    );
}
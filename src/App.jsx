import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/footer';

export default function App(){
  return (
    <div className='inline-block'>    
      <header>
          <Header/>
      </header>

      <main>
          <Main/>
      </main>
      
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}
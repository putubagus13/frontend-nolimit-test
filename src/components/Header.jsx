import {GiHamburgerMenu} from 'react-icons/gi';
import {MdDataExploration} from 'react-icons/md';
import { Link } from 'react-router-dom';

function Header() {
  const currentPath = window.location.pathname;

  return (
    <header className='z-20 fixed w-full h-14 flex justify-between items-center bg-gradient-to-r from-[#053B50] to-[#176B87] shadow-lg px-[10%] rounded-b-xl'>
      <Link to={'/'} className='flex text-secondary text-md md:text-xl font-semibold'>
        <MdDataExploration size={25} />
            Census Bureau
      </Link>
      <div className="dropdown dropdown-end">
        <button tabIndex={0}><GiHamburgerMenu className='md:hidden text-secondary' size={25} /></button>
        <ul 
          tabIndex={0} 
          className="dropdown-content z-[1] menu p-4 shadow 
            bg-primary flex flex-col gap-3 rounded-box w-52">
          {currentPath === '/' ? <Link to={'/'} className='navSelect'>Home</Link> : <Link to={'/'} className='nav'>Home</Link>}
          {currentPath === '/population-data' ? <Link to={'/'} className='navSelect'>Population Data</Link> :
            <Link to={'/population-data'} className='nav'>Population Data</Link>}
        </ul>
      </div>
      
      <nav className='hidden md:flex justify-between items-center gap-8'>
        {currentPath === '/' ? <Link to={'/'} className='navSelect'>Home</Link> : <Link to={'/'} className='nav'>Home</Link>}
        {currentPath === '/population-data' ? <Link to={'/'} className='navSelect'>Population Data</Link> :
          <Link to={'/population-data'} className='nav'>Population Data</Link>}
      </nav>
    </header>
  );
}

export default Header;
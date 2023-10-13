import {FaRegCopyright} from 'react-icons/fa';

function Footer() {
  return (
    <footer className='w-full h-[100px] flex justify-center items-center text-white bg-gradient-to-r from-[#053B50] to-[#176B87] text-[12px] gap-1`'>
      <FaRegCopyright size={15} />
        Copyright
    </footer>
  );
}

export default Footer;
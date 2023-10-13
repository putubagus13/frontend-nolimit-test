import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PropTypes from 'prop-types';

function Layout({children}) {
  return (
    <React.Fragment>
      <div className='h-full w-full bg-white text-black'>
        <Header />
        {children}
        <Footer />
      </div>
    </React.Fragment>
  );
}
Layout.propTypes = {
  children: PropTypes.element
};

export default Layout;
import React, { Fragment } from 'react';
// import png from './coin.png';
import coin from './icon.svg';
export default () => (
  <Fragment>
    <img
      src={coin}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);
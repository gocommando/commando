import React from 'react';

export function Media ({ children }) {
  return (
    <div className='media'>
      <div className='media-content'>
        { children }
      </div>
    </div>
  );
}

export function Body ({ children }) {
  return (
    <div className='content'>
      { children }
    </div>
  );
}

export function Content ({ children }) {
  return (
    <div className='card-content'>
      { children }
    </div>
  );
}

export default function Card ({ children, animation = 'bounceInRight', duration = 'short' }) {
  return (
    <div className={`card animated ${animation} animated-${duration}`}>
      { children }
    </div>
  );
}

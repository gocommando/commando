import React, { Component } from 'react';

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

export default function Card ({ children }) {
  return (
    <div className='card'>
      { children }
    </div>
  );
}

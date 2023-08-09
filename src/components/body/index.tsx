import text from '@/assets/img/text.jpg';
import { useEffect } from 'react';
import style from './index.module.scss';
import React from 'react';

export function Body() {
  useEffect(() => {
    const img = document.getElementById('img') as HTMLImageElement;
    img.src = text;
  }, []);
  return (
    <div className={`py-20px text-center ${style.body}`}>
      this is body
      <img src={text} alt="this is img" className="w-100px h-100px" />
      <img id="img" alt="this is img" className="w-100px h-100px" />
    </div>
  );
}

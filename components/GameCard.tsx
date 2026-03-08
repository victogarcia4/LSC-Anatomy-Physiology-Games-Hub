
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <a 
      href={game.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block relative overflow-hidden rounded-2xl p-6 transition-all hover:scale-[1.02] hover:shadow-xl dark:bg-slate-800 bg-white border border-slate-200 dark:border-slate-700"
    >
      <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 group-hover:bg-blue-600 transition-colors" />
      <h3 className="text-xl font-bold dark:text-white text-slate-800 mb-2">{game.title}</h3>
      <div className="flex flex-wrap gap-2 mt-4">
        {game.subjects.map((subject, index) => (
          <span 
            key={index} 
            className="text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900/30 dark:text-blue-300 bg-blue-100 text-blue-700 border border-blue-200 dark:border-blue-800 capitalize"
          >
            {subject}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center text-sm font-semibold text-blue-500 group-hover:text-blue-600">
        Play Game 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </a>
  );
};

export default GameCard;

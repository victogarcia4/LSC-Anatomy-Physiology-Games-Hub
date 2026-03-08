
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ExamType, Theme } from './types';
import { GAMES_DATA, GENERIC_SONG_URL } from './constants';
import GameCard from './components/GameCard';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState<Theme>('light');
  const [isMuted, setIsMuted] = useState(true);
  const [activeExam, setActiveExam] = useState<ExamType>(ExamType.EXAM_1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Filter logic: Only shows games matching search term and selected exam
  const filteredGames = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return GAMES_DATA.filter(game => {
      const matchesSearch = term === '' || 
        game.title.toLowerCase().includes(term) ||
        game.subjects.some(s => s.toLowerCase().includes(term));
      const matchesExam = game.exam === activeExam;
      return matchesSearch && matchesExam;
    });
  }, [searchTerm, activeExam]);

  // Dark Mode Toggle - Explicitly targeting document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Audio Playback Handling
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(GENERIC_SONG_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    
    const audio = audioRef.current;
    
    if (isMuted) {
      audio.pause();
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Audio playback failed:", error);
          setIsMuted(true);
        });
      }
    }

    return () => {
      audio.pause();
    };
  }, [isMuted]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-slate-950 bg-slate-50 selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold dark:text-white text-slate-900 leading-none">LSC A&P Game Hub</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest font-semibold">North Harris Campus</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleMute}
              className={`p-3 rounded-full transition-all border ${
                !isMuted 
                ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300' 
                : 'bg-white border-slate-200 text-slate-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isMuted ? "Enable Music" : "Mute Music"}
              aria-label="Toggle Background Music"
            >
              {!isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.984 3.984 0 00-1.172-2.828a1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-full transition-all border bg-white border-slate-200 text-slate-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707-.707M8 12a4 4 0 118 0 4 4 0 01-8 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
            Anatomy & Physiology <span className="text-blue-600 dark:text-blue-500 underline decoration-blue-500/20 underline-offset-8">Games</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Interactive student-built labs and games designed to master A&P concepts. Select an exam below and explore the topics gathered by Dr. Martinez.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-12 space-y-8">
          {/* Search bar */}
          <div className="relative max-w-2xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              placeholder="Search subjects (e.g. homeostasis, planes, cells)..."
              className="block w-full pl-12 pr-4 py-5 border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-600 text-slate-900 dark:text-white placeholder-slate-400 transition-all text-xl outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Exam Filters */}
          <div className="flex flex-wrap gap-3">
            {[ExamType.EXAM_1, ExamType.EXAM_2, ExamType.EXAM_3, ExamType.EXAM_4].map((exam) => (
              <button
                key={exam}
                onClick={() => setActiveExam(exam)}
                className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all transform active:scale-95 ${
                  activeExam === exam 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/40 border-transparent' 
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <div className="mb-6 inline-flex p-6 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-300 dark:text-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No matching games</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {activeExam !== ExamType.EXAM_1 
                  ? "Content for this exam module is under construction. Check back soon!" 
                  : "We couldn't find any games matching that keyword. Try searching for 'planes', 'cells', or 'atoms'."}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <p className="text-xl font-bold text-slate-900 dark:text-white mb-1">Gathered by Dr. Victor Garcia Martinez</p>
              <p className="text-slate-500 dark:text-slate-400">Lone Star College North Harris · Anatomy & Physiology Faculty</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2 text-slate-400 dark:text-slate-600">
              <p className="text-sm font-medium">Empowering Student Learning</p>
              <p className="text-xs">© {new Date().getFullYear()} LSC-North Harris. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

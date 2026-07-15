import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(targetDate.getHours() + 4);
    targetDate.setMinutes(targetDate.getMinutes() + 15);

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        targetDate.setDate(new Date().getDate() + 2);
      }
      return newTimeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div id="countdown-banner" className="bg-[#001426] text-white py-2.5 px-4 shadow-sm border-b border-white/5 relative z-40 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left text */}
        <div className="flex items-center gap-2.5 text-center md:text-left">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#01F9F2] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#01F9F2]"></span>
          </span>
          <p className="font-bold text-xs uppercase tracking-wider text-slate-300">
            OFERTA HCRED:{' '}
            <span className="text-[#01F9F2] font-extrabold">
              Avaliação gratuita do Raio-X Financeiro
            </span>{' '}
            liberada para sua região hoje!
          </p>
        </div>

        {/* Counter elements */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono bg-white/5 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase text-slate-400">
            <Clock className="w-3.5 h-3.5 text-[#01F9F2] animate-pulse" />
            <span className="hidden sm:inline">Expira em:</span>
          </div>

          <div id="counter" className="flex items-center gap-1">
            <div className="bg-[#071838] border border-white/10 text-white min-w-10 py-0.5 px-1 rounded-lg text-center shadow-xs">
              <span className="block font-mono text-xs font-bold leading-tight">{timeLeft.days}</span>
              <span className="text-[8px] uppercase tracking-wider text-[#01F9F2] font-semibold">d</span>
            </div>
            <span className="font-bold text-slate-700">:</span>
            <div className="bg-[#071838] border border-white/10 text-white min-w-10 py-0.5 px-1 rounded-lg text-center shadow-xs">
              <span className="block font-mono text-xs font-bold leading-tight">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[8px] uppercase tracking-wider text-[#01F9F2] font-semibold">h</span>
            </div>
            <span className="font-bold text-slate-700">:</span>
            <div className="bg-[#071838] border border-white/10 text-white min-w-10 py-0.5 px-1 rounded-lg text-center shadow-xs">
              <span className="block font-mono text-xs font-bold leading-tight">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[8px] uppercase tracking-wider text-[#01F9F2] font-semibold">m</span>
            </div>
            <span className="font-bold text-slate-700">:</span>
            <div className="bg-[#071838] border border-[#01F9F2]/20 text-white min-w-10 py-0.5 px-1 rounded-lg text-center shadow-xs">
              <span className="block font-mono text-xs font-bold leading-tight text-[#01F9F2]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[8px] uppercase tracking-wider text-[#01F9F2] font-semibold">s</span>
            </div>
          </div>

          <a
            href="#analise"
            className="bg-[#01F9F2] hover:bg-[#00e5dd] text-slate-950 text-[10px] font-black uppercase py-1.5 px-3 rounded-lg shadow-sm transition-all transform hover:-translate-y-0.5 ml-2 whitespace-nowrap"
          >
            Análise Grátis
          </a>
        </div>
      </div>
    </div>
  );
}

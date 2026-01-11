// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';

// --- DATA SAMPAH ---
type BinData = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  textColor: string;
  desc: string;
  items: string[];
  forbidden: string[];
  sound: string;
  danger?: boolean;
};

const bins: BinData[] = [
  {
    id: 'hijau',
    title: 'Organik',
    subtitle: 'Sisa Makhluk Hidup',
    icon: '🍃',
    gradient: 'from-emerald-400 to-green-600',
    textColor: 'text-emerald-800',
    desc: 'Sampah alami yang mudah membusuk dan terurai. Sangat bagus untuk dijadikan pupuk kompos bagi tanaman.',
    items: ['Sisa Sayuran & Buah', 'Daun Kering & Ranting', 'Tulang Ikan/Ayam', 'Nasi Basi'],
    forbidden: ['Plastik', 'Kaca', 'Kertas laminating'],
    sound: '/sounds/pop.mp3'
  },
  {
    id: 'kuning',
    title: 'Anorganik',
    subtitle: 'Daur Ulang',
    icon: '♻️',
    gradient: 'from-amber-300 to-yellow-500',
    textColor: 'text-amber-900',
    desc: 'Sampah buatan pabrik yang tahan lama. Sampah ini bernilai ekonomis karena bisa didaur ulang menjadi barang baru.',
    items: ['Botol Plastik Bersih', 'Kertas & Kardus', 'Kaleng Minuman', 'Koran Bekas'],
    forbidden: ['Tisu bekas (kotor)', 'Popok bayi', 'Sisa makanan'],
    sound: '/sounds/pop.mp3'
  },
  {
    id: 'merah',
    title: 'B3 (Bahaya)',
    subtitle: 'Beracun & Berbahaya',
    icon: '⚠️',
    gradient: 'from-red-500 to-rose-700',
    textColor: 'text-red-900',
    desc: 'Sampah yang mengandung racun atau benda tajam. Membahayakan kesehatan dan lingkungan jika dibuang sembarangan.',
    items: ['Baterai Bekas', 'Pecahan Kaca/Beling', 'Kaleng Obat Nyamuk', 'Masker Medis'],
    forbidden: ['Semua jenis sampah aman', 'Jangan dipegang tangan kosong!'],
    sound: '/sounds/warning.mp3',
    danger: true
  }
];

// --- EASTER EGG 1: NYAMUK TERBANG ---
const FlyingMosquito = () => {
  const [isDead, setIsDead] = useState(false);

  const killMosquito = () => {
    setIsDead(true);
    if (typeof window !== 'undefined') {
       const audio = new Audio('/sounds/pop.mp3'); 
       audio.play().catch(()=>{});
    }
    setTimeout(() => setIsDead(false), 8000); // Respawn lama dikit
  };

  if (isDead) return null;

  return (
    <motion.div
      className="fixed z-[999] cursor-pointer text-4xl select-none drop-shadow-lg"
      animate={{
        x: [0, 100, -200, 300, -50, 0],
        y: [0, -100, 50, -200, 100, 0],
        rotate: [0, 45, -45, 10, 0]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      style={{ top: '15%', left: '5%' }}
      onClick={killMosquito}
      title="Tangkap Nyamuknya!"
    >
      🦟
    </motion.div>
  );
};

// --- EASTER EGG 2: CLEANING MISSION ---
const CleaningMission = () => {
  const [trash, setTrash] = useState([
    { id: 1, icon: '🥤', x: 10, y: 20 },
    { id: 2, icon: '🍂', x: 80, y: 60 },
    { id: 3, icon: '🥡', x: 30, y: 70 },
    { id: 4, icon: '🥫', x: 60, y: 30 },
    { id: 5, icon: '🦟', x: 50, y: 50, move: true }
  ]);

  const clean = (id: number) => {
    setTrash(prev => prev.filter(t => t.id !== id));
    if (typeof window !== 'undefined') {
      const audio = new Audio('/sounds/pop.mp3');
      audio.play().catch(()=>{});
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-16 px-4">
       <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-1 shadow-2xl">
        <div className="bg-white rounded-[20px] p-8 text-center relative overflow-hidden min-h-[250px] flex flex-col items-center justify-center">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>

          {trash.length > 0 ? (
            <>
              <h3 className="text-xl font-bold text-slate-800 mb-2 relative z-10">Misi Rahasia: Lingkungan Sekolah Bersih</h3>
              <p className="text-slate-500 text-sm mb-6 relative z-10">Ada {trash.length} sampah berserakan. Klik untuk membuangnya!</p>
              {trash.map((item) => (
                <motion.button
                  key={item.id}
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => clean(item.id)}
                  className="absolute text-5xl cursor-pointer z-20 outline-none"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  animate={item.move ? { x: [0, 30, -30, 0], y: [0, -30, 30, 0] } : {}}
                  transition={item.move ? { repeat: Infinity, duration: 3 } : {}}
                >
                  {item.icon}
                </motion.button>
              ))}
            </>
          ) : (
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <div className="text-7xl mb-4">🏫✨</div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-2">Halaman Sekolah Bersih!</h3>
              <p className="text-slate-500">Kerja bagus, Siswa SD Negeri 2 Bandarejo!</p>
              <button 
                onClick={() => setTrash([{ id: 1, icon: '🥤', x: 10, y: 20 }, { id: 2, icon: '🍂', x: 80, y: 60 }, { id: 3, icon: '🥡', x: 30, y: 70 }, { id: 4, icon: '🥫', x: 60, y: 30 }])}
                className="mt-6 px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-bold hover:bg-slate-200"
              >
                Ulangi Misi ↻
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN PENGGANTI RUNNING TEXT (FACT CARDS) ---
const InfoCards = () => (
  <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20 grid md:grid-cols-3 gap-6">
     {[
       { icon: '⏳', title: '450 Tahun', desc: 'Waktu yang dibutuhkan botol plastik untuk terurai di tanah.', color: 'bg-orange-50 border-orange-100 text-orange-800' },
       { icon: '🌱', title: 'Pupuk Alami', desc: 'Sampah organik (daun/sisa makanan) bisa menyuburkan tanaman.', color: 'bg-green-50 border-green-100 text-green-800' },
       { icon: '🔥', title: 'Jangan Bakar', desc: 'Membakar sampah plastik menghasilkan asap beracun bagi paru-paru.', color: 'bg-red-50 border-red-100 text-red-800' },
     ].map((item, idx) => (
       <motion.div 
         key={idx}
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.5 + (idx * 0.2) }}
         className={`${item.color} border p-6 rounded-2xl shadow-lg flex items-start gap-4`}
       >
          <div className="text-4xl">{item.icon}</div>
          <div>
            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
            <p className="text-sm opacity-90 leading-snug">{item.desc}</p>
          </div>
       </motion.div>
     ))}
  </div>
);

// --- KOMPONEN UTAMA LAINNYA ---
const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm transition-all">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center text-white font-bold shadow-md">SD</div>
      <div className="flex flex-col">
        <span className="font-bold text-emerald-900 text-sm md:text-base leading-tight">SD Negeri 2 Bandarejo</span>
        <span className="text-[10px] text-emerald-600 font-medium tracking-wide">Natar, Lampung Selatan</span>
      </div>
    </div>
    <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500">
      <a href="#hero" className="hover:text-emerald-700 transition-colors">Beranda</a>
      <a href="#materi" className="hover:text-emerald-700 transition-colors">Ensiklopedia</a>
      <a href="#kuis" className="hover:text-emerald-700 transition-colors">Kuis</a>
    </div>
    <button onClick={() => document.getElementById('materi')?.scrollIntoView({behavior: 'smooth'})} className="px-5 py-2.5 bg-emerald-600 text-white text-xs md:text-sm font-bold rounded-full hover:bg-emerald-700 hover:shadow-lg transition-all">
      Mulai Belajar
    </button>
  </nav>
);

const DetailModal = ({ bin, onClose }: { bin: BinData; onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border-4 border-white"
    >
      <div className={`p-8 bg-gradient-to-r ${bin.gradient} text-white relative`}>
        <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors">✕</button>
        <div className="flex gap-6 items-center">
          <div className="text-6xl bg-white/20 p-4 rounded-2xl backdrop-blur-md shadow-inner">{bin.icon}</div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">{bin.title}</h2>
            <p className="opacity-90 font-medium text-lg mt-1">{bin.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-8 overflow-y-auto space-y-8">
        <div className="text-slate-600 text-lg leading-relaxed border-l-4 border-slate-200 pl-4">
           {bin.desc}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
               ✅ Boleh Masuk
            </h4>
            <ul className="space-y-2 text-slate-700">
              {bin.items.map((it, idx) => <li key={idx} className="flex gap-3 text-sm"><span>✔</span> {it}</li>)}
            </ul>
          </div>
          <div className="bg-red-50 p-5 rounded-2xl border border-red-100">
            <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
               ⛔ Dilarang Masuk
            </h4>
            <ul className="space-y-2 text-slate-700">
              {bin.forbidden.map((it, idx) => <li key={idx} className="flex gap-3 text-sm"><span>✖</span> {it}</li>)}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
        <button onClick={onClose} className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg">
          Saya Mengerti 👍
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const QuizSection = () => {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { q: "Kulit pisang & sisa sayur termasuk sampah...", options: ["Organik", "Anorganik", "B3"], ans: "Organik" },
    { q: "Botol plastik sebaiknya dibuang ke tong warna?", options: ["Hijau", "Kuning", "Merah"], ans: "Kuning" },
    { q: "Warna tong untuk sampah Baterai & Kaca pecah adalah?", options: ["Hijau", "Kuning", "Merah"], ans: "Merah" },
    { q: "Mengapa kita tidak boleh membakar sampah plastik?", options: ["Mahal", "Asapnya Beracun", "Susah"], ans: "Asapnya Beracun" },
  ];

  const handleAnswer = (val: string) => {
    if (val === questions[current].ans) setScore(score + 1);
    
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
      if (score >= 3) confetti();
    }
  };

  const resetQuiz = () => {
    setScore(0); setCurrent(0); setShowResult(false);
  };

  return (
    <div className="bg-white rounded-[30px] shadow-xl p-8 md:p-12 border border-emerald-100 max-w-4xl mx-auto mt-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-yellow-400"></div>
      
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-emerald-900 mb-2">🧠 Kuis Cepat</h3>
        <p className="text-slate-500">Seberapa paham kamu tentang pemilahan sampah?</p>
      </div>

      {!showResult ? (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6 text-sm font-bold text-emerald-600 uppercase tracking-widest">
             <span>Pertanyaan {current + 1} / {questions.length}</span>
             <span>Skor: {score}</span>
          </div>
          <h4 className="text-2xl font-medium text-slate-800 mb-8 text-center leading-snug">{questions[current].q}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {questions[current].options.map((opt) => (
              <button 
                key={opt} 
                onClick={() => handleAnswer(opt)}
                className="py-4 px-6 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all font-bold text-slate-600 text-lg shadow-sm"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-8xl mb-6 animate-bounce">{score === questions.length ? '🏆' : score > 2 ? '👏' : '📚'}</div>
          <h4 className="text-3xl font-bold mb-3 text-slate-800">Skor Akhir: {score} / {questions.length}</h4>
          <p className="text-slate-500 mb-8 text-lg">
            {score === questions.length ? "Luar Biasa! Kamu Juara Lingkungan SD Negeri 2 Bandarejo!" : "Jangan menyerah, coba pelajari materinya lagi ya!"}
          </p>
          <button onClick={resetQuiz} className="px-10 py-3 bg-emerald-600 text-white rounded-full font-bold shadow-lg hover:bg-emerald-700 transition-transform hover:-translate-y-1">Main Lagi</button>
        </div>
      )}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [activeBin, setActiveBin] = useState<BinData | null>(null);

  const handleOpenBin = (bin: BinData) => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(bin.sound);
      audio.play().catch(() => {});
      if (bin.danger && navigator.vibrate) navigator.vibrate(200);
    }
    setActiveBin(bin);
  };

  const triggerConfetti = () => {
     confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
     if (typeof window !== 'undefined') {
        const audio = new Audio('/sounds/pop.mp3'); 
        audio.play().catch(()=>{});
     }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-emerald-200">
      <Navbar />
      <FlyingMosquito />
      
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-yellow-400 z-[60]" style={{ scaleX }} />

      <AnimatePresence>
        {activeBin && <DetailModal bin={activeBin} onClose={() => setActiveBin(null)} />}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-36 pb-24 px-6 bg-[#0a2e23] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-20 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            
            {/* TAG LOKASI */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md mb-8">
              <span className="text-emerald-300">📍</span>
              <span className="text-xs md:text-sm font-bold tracking-wide text-emerald-50 uppercase">
                Desa Bandarejo, Natar, Lampung Selatan
              </span>
            </div>

            {/* JUDUL UTAMA */}
            <h1 
               onClick={triggerConfetti}
               className="text-5xl md:text-7xl font-bold leading-tight mb-6 cursor-pointer hover:text-emerald-200 transition-colors"
               title="Klik untuk kejutan!"
            >
              Pilah Sampah,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400">Jaga Sekolah Kita.</span>
            </h1>
            
            <p className="text-lg text-emerald-100/80 mb-10 leading-relaxed max-w-lg">
              Media edukasi interaktif untuk siswa <strong>SD Negeri 2 Bandarejo</strong>. Mari belajar membedakan sampah Organik, Anorganik, dan B3.
            </p>
            
            <div className="flex gap-4">
              <button onClick={() => document.getElementById('materi')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition-all hover:-translate-y-1">
                Mulai Belajar 🚀
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex justify-center relative"
          >
             <div className="relative text-[10rem] md:text-[12rem] animate-bounce">🌍</div>
             <div className="absolute bottom-0 text-8xl -right-4 animate-pulse delay-700">♻️</div>
             <div className="absolute top-0 -left-4 text-8xl animate-pulse delay-300">🌱</div>
          </motion.div>
        </div>
      </section>

      {/* INFO CARDS (PENGGANTI RUNNING TEXT) */}
      <InfoCards />

      {/* CLEANING MISSION */}
      <CleaningMission />

      {/* ENSIKLOPEDIA (BINS) */}
      <section id="materi" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">Ensiklopedia Sampah</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Klik kartu di bawah untuk membuka informasi rahasia tentang jenis sampah.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {bins.map((bin) => (
              <motion.div
                key={bin.id}
                whileHover={{ y: -10 }}
                onClick={() => handleOpenBin(bin)}
                className="group cursor-pointer relative bg-white rounded-[32px] p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${bin.gradient} opacity-10 rounded-bl-[100px] transition-opacity group-hover:opacity-20`}></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${bin.gradient} flex items-center justify-center text-5xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {bin.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-1 ${bin.textColor}`}>{bin.title}</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{bin.subtitle}</p>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-8 px-2">{bin.desc}</p>
                  
                  <div className="mt-auto px-6 py-2 rounded-full border-2 border-slate-100 text-slate-600 text-sm font-bold group-hover:bg-slate-800 group-hover:text-white group-hover:border-transparent transition-all">
                    Lihat Detail →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ */}
      <section id="kuis" className="py-20 px-6 bg-[#f0fdf4] border-t border-emerald-100">
        <QuizSection />
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f392b] border-t border-emerald-900 py-16 text-center text-emerald-100/80">
        <div className="max-w-4xl mx-auto px-6">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 backdrop-blur-md">🎓</div>
          
          <h4 className="text-white font-bold text-lg mb-2 tracking-wide">
            KKN TEMATIK 56 DESA BANDAREJO
          </h4>
          <p className="font-medium opacity-70 mb-8">
            INSTITUT TEKNOLOGI SUMATERA (ITERA)
          </p>
          
          <div className="h-px w-24 bg-emerald-700 mx-auto mb-8"></div>
          
          <p className="text-xs md:text-sm">
            © 2026 Program Kerja Sosialiasi Pemilahan Sampah. Dibuat dengan ❤️ untuk SD Negeri 2 Bandarejo.
          </p>
        </div>
      </footer>
    </main>
  );
}
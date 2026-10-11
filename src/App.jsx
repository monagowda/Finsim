import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Home, LayoutDashboard, Target, Users, AlertTriangle,
  CheckCircle, ChevronLeft, ChevronRight, Trophy, Sparkles, Wallet,
  PiggyBank, ShieldAlert, MessageSquare, ArrowRight,
  Search, TrendingUp, Calendar, Zap, CreditCard, Activity
} from 'lucide-react';

const DAYS_IN_MONTH = 30;
const TABS = ['home', 'manage', 'compete'];
const DRAG_THRESHOLD = 8; // px of movement before a press counts as a drag instead of a tap

const DEFAULT_BUCKETS = {
  daily: { id: 'daily', name: 'Daily Spend', icon: <Wallet className="w-5 h-5" aria-hidden="true"/>, amount: 4000, color: 'bg-indigo-500', desc: 'Everyday Needs' },
  savings: { id: 'savings', name: 'Savings', icon: <PiggyBank className="w-5 h-5" aria-hidden="true"/>, amount: 2500, color: 'bg-emerald-500', desc: 'Wealth Building' },
  emergency: { id: 'emergency', name: 'Emergency', icon: <ShieldAlert className="w-5 h-5" aria-hidden="true"/>, amount: 2000, color: 'bg-rose-500', desc: 'Safety Net' },
  subscriptions: { id: 'subscriptions', name: 'Subscriptions', icon: <CreditCard className="w-5 h-5" aria-hidden="true"/>, amount: 1500, color: 'bg-purple-500', desc: 'Netflix, Spotify, etc.' },
};

const CHIP_AMOUNTS = [100, 500, 1000];

const CAROUSEL_EVENTS = [
  { id: 1, title: 'Weekend Getaway', date: 'This Saturday', category: 'Travel', image: 'bg-blue-500/20' },
  { id: 2, title: 'Concert with Friends', date: 'Next Friday', category: 'Entertainment', image: 'bg-purple-500/20' },
  { id: 3, title: 'Cousin\'s Birthday Party', date: 'In 2 Weeks', category: 'Social', image: 'bg-pink-500/20' },
  { id: 4, title: 'Tech Meetup', date: 'End of Month', category: 'Networking', image: 'bg-indigo-500/20' }
];

// Sample data for demo purposes only. Not live rates.
const ALL_BANKS = [
  { id: 1, bank: 'Utkarsh Small Finance', rate: '8.50%', type: 'Savings A/C' },
  { id: 2, bank: 'Equitas Small Finance', rate: '8.50%', type: 'Savings A/C' },
  { id: 3, bank: 'Ujjivan Small Finance', rate: '7.50%', type: 'Savings A/C' },
  { id: 4, bank: 'IDFC First Bank', rate: '7.25%', type: 'Savings A/C' },
  { id: 5, bank: 'Kotak Mahindra Bank', rate: '7.10%', type: 'Savings A/C' },
  { id: 6, bank: 'ICICI Bank', rate: '7.10%', type: 'Savings A/C' },
  { id: 7, bank: 'Axis Bank', rate: '7.10%', type: 'Savings A/C' },
  { id: 8, bank: 'HDFC Bank', rate: '7.10%', type: 'Savings A/C' },
  { id: 9, bank: 'State Bank of India (SBI)', rate: '6.80%', type: 'Savings A/C' },
  { id: 10, bank: 'Punjab National Bank', rate: '6.50%', type: 'Savings A/C' }
];

/* ---------- Hash-based tab routing (back button + refresh keep your place) ---------- */
const getTabFromHash = () => {
  const h = window.location.hash.replace(/^#\/?/, '');
  return TABS.includes(h) ? h : 'home';
};

export default function App() {
  const [activeTab, setActiveTabState] = useState(getTabFromHash);
  const mainRef = useRef(null);

  useEffect(() => {
    const onHashChange = () => setActiveTabState(getTabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [activeTab]);

  const setActiveTab = (tab) => {
    if (tab === activeTab) return;
    window.location.hash = '/' + tab;
  };

  return (
    <div className="app-shell flex w-full overflow-hidden font-sans text-slate-100 selection:bg-white/30 relative bg-[#0f172a]">
      {/* Animated Deep Modern Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-700/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-pink-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r border-white/10 bg-slate-900/40 backdrop-blur-3xl z-10 p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-12 mt-4 px-2">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg shadow-indigo-500/20 border border-white/10">
            <Sparkles className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight leading-none">FinSim</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300">Gen Z Edition</span>
          </div>
        </div>
        <nav className="flex flex-col gap-3" aria-label="Main">
          <TabButton id="home" icon={<Home />} label="Home" activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="manage" icon={<LayoutDashboard />} label="Manage" activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="compete" icon={<Target />} label="Compete" activeTab={activeTab} onClick={setActiveTab} />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main
        ref={mainRef}
        className="flex-1 relative z-10 overflow-y-auto md:pb-0 h-full scroll-smooth custom-scrollbar pb-[calc(6rem+env(safe-area-inset-bottom))]"
      >
        <div className="max-w-5xl mx-auto p-4 md:p-8 min-h-full">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'manage' && <ManageTab />}
          {activeTab === 'compete' && <CompeteTab />}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="Main"
        className="md:hidden fixed bottom-0 left-0 right-0 min-h-[80px] border-t border-white/10 bg-slate-900/80 backdrop-blur-2xl z-50 flex justify-around items-center px-4 pt-2 shadow-2xl"
        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        <MobileTabButton id="home" icon={<Home />} label="Home" activeTab={activeTab} onClick={setActiveTab} />
        <MobileTabButton id="manage" icon={<LayoutDashboard />} label="Manage" activeTab={activeTab} onClick={setActiveTab} />
        <MobileTabButton id="compete" icon={<Target />} label="Compete" activeTab={activeTab} onClick={setActiveTab} />
      </nav>
    </div>
  );
}

function TabButton({ id, icon, label, activeTab, onClick }) {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => onClick(id)}
      aria-current={isActive ? 'page' : undefined}
      className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-left w-full group relative overflow-hidden
        ${isActive ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'hover:bg-white/5 text-slate-400 hover:text-white border border-transparent'}
      `}
    >
      {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full"></div>}
      {React.cloneElement(icon, { 'aria-hidden': true, className: `w-5 h-5 transition-transform duration-300 ${isActive ? 'text-indigo-400' : 'group-hover:scale-110 group-hover:text-indigo-300'}` })}
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </button>
  );
}

function MobileTabButton({ id, icon, label, activeTab, onClick }) {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => onClick(id)}
      aria-current={isActive ? 'page' : undefined}
      className="flex flex-col items-center gap-1.5 w-16 p-2 rounded-xl active:scale-95 transition-transform relative"
    >
      <div className={`p-2 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'text-slate-400'}`}>
        {React.cloneElement(icon, { 'aria-hidden': true, className: 'w-6 h-6' })}
      </div>
      <span className={`text-[10px] font-bold tracking-wide transition-colors ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>{label}</span>
    </button>
  );
}

/* ---------- Accessible modal: role=dialog, Escape to close, focus trap, focus restore ---------- */
function Modal({ labelledBy, describedBy, onClose, children, panelClassName }) {
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const node = panelRef.current;
    const getFocusable = () => Array.from(node.querySelectorAll('button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])'));

    const initial = node.querySelector('[data-autofocus]') || getFocusable()[0];
    if (initial) initial.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key === 'Tab') {
        const items = getFocusable();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className={panelClassName}
      >
        {children}
      </div>
    </div>
  );
}

function HomeTab() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const nextSlide = () => setSlideIdx((prev) => (prev + 1) % CAROUSEL_EVENTS.length);
  const prevSlide = () => setSlideIdx((prev) => (prev - 1 + CAROUSEL_EVENTS.length) % CAROUSEL_EVENTS.length);

  const filteredBanks = ALL_BANKS.filter(b => b.bank.toLowerCase().includes(searchTerm.trim().toLowerCase()));

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full">
      <header className="px-2 mt-4 md:mt-0">
        <h2 className="text-3xl font-black text-white tracking-tight mb-1">Dashboard</h2>
        <p className="text-sm text-slate-400 font-medium tracking-wide">Your daily financial pulse.</p>
      </header>

      {/* Greeting & Positive Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Chatbot Greeting Box */}
        <section className="glass-panel p-5 md:p-6 rounded-3xl relative overflow-hidden group flex gap-4 items-center border-l-4 border-l-indigo-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-400/30 shrink-0 shadow-inner">
            <MessageSquare className="w-6 h-6 text-indigo-300" aria-hidden="true" />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-black text-white mb-1 tracking-tight">Hello Alex 👋</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              Your financial health is looking steady today! You are well on track with your monthly goals.
            </p>
          </div>
        </section>

        {/* Positive Metrics Box */}
        <section className="glass-panel p-5 md:p-6 rounded-3xl relative overflow-hidden group flex gap-4 items-center border-l-4 border-l-emerald-500">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mb-10"></div>
          <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-400/30 shrink-0 shadow-inner">
            <TrendingUp className="w-6 h-6 text-emerald-300" aria-hidden="true" />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-black text-white mb-1 tracking-tight">Great job! 🚀</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              You saved <strong className="text-emerald-400">₹1,500</strong> last month, which is <strong className="text-emerald-400">15% more</strong> than your average. Keep it up!
            </p>
          </div>
        </section>
      </div>

      {/* Instagram-Style Carousel (No negative amounts) */}
      <section className="flex flex-col gap-3" aria-label="Upcoming events">
        <div className="px-2 flex justify-between items-end">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" aria-hidden="true" /> Upcoming Events
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Things to look forward to.</p>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden h-[180px] flex flex-col justify-center bg-gradient-to-br from-white/[0.05] to-transparent">
          <div className={`absolute inset-0 ${CAROUSEL_EVENTS[slideIdx].image} opacity-30 transition-colors duration-500`}></div>

          <div className="flex items-center justify-between z-10">
            <button onClick={prevSlide} aria-label="Previous event" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all border border-white/10 active:scale-90"><ChevronLeft className="w-5 h-5 text-white" aria-hidden="true" /></button>

            <div className="text-center flex flex-col items-center gap-3 animate-in fade-in zoom-in-95 duration-300 w-[60%]" key={slideIdx} aria-live="polite">
              <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-bold rounded-full border border-white/20 uppercase tracking-widest backdrop-blur-md">
                {CAROUSEL_EVENTS[slideIdx].category}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">{CAROUSEL_EVENTS[slideIdx].title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-indigo-300 font-bold text-xs bg-indigo-500/20 px-2 py-0.5 rounded-md border border-indigo-500/30">
                  {CAROUSEL_EVENTS[slideIdx].date}
                </span>
              </div>
            </div>

            <button onClick={nextSlide} aria-label="Next event" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all border border-white/10 active:scale-90"><ChevronRight className="w-5 h-5 text-white" aria-hidden="true" /></button>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {CAROUSEL_EVENTS.map((ev, i) => (
              <button
                key={ev.id}
                onClick={() => setSlideIdx(i)}
                aria-label={`Show event ${i + 1}: ${ev.title}`}
                aria-current={i === slideIdx ? 'true' : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-6 bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ROI Leaderboard (Scrollable with Search) */}
      <section className="flex flex-col gap-3 flex-1 min-h-[300px]" aria-label="Top yield accounts">
        <div className="px-2 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Top Yield Accounts</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Highest ROI available for savings. Sample data for demo.</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search your bank..."
              aria-label="Search your bank"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all w-full sm:w-64"
            />
          </div>
        </div>

        <div className="glass-panel rounded-3xl overflow-hidden flex flex-col p-2 h-[280px]">
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-1">
            {filteredBanks.length > 0 ? filteredBanks.map((item, i) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors group cursor-default">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-inner border border-white/10 shrink-0
                    ${i === 0 && !searchTerm ? 'bg-gradient-to-br from-amber-400 to-orange-500' : i === 1 && !searchTerm ? 'bg-gradient-to-br from-slate-300 to-slate-500' : i === 2 && !searchTerm ? 'bg-gradient-to-br from-amber-700 to-amber-900' : 'bg-slate-700'}`}
                  >
                    {!searchTerm && i < 3 ? `#${i + 1}` : <span className="text-xs">{item.bank.charAt(0)}</span>}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors line-clamp-1">{item.bank}</h5>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">{item.type}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0 pl-4">
                  <span className="text-emerald-400 font-black text-base md:text-lg">{item.rate}</span>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">p.a.</p>
                </div>
              </div>
            )) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-sm italic">
                No banks found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ManageTab() {
  const [buckets, setBuckets] = useState(DEFAULT_BUCKETS);
  const [dragState, setDragState] = useState({ active: false, source: null, amount: 0, x: 0, y: 0, startX: 0, startY: 0, moved: false });
  const [pickerModal, setPickerModal] = useState(null); // tap / keyboard "move to..." chooser
  const [warningModal, setWarningModal] = useState(null);
  const [celebrationModal, setCelebrationModal] = useState(null);

  const totalBudget = Object.values(buckets).reduce((acc, curr) => acc + curr.amount, 0);
  const dailyAllowance = Math.floor(buckets.daily.amount / DAYS_IN_MONTH);

  // Health Score calculation (higher savings + emergency relative to total = higher score)
  const safeFunds = buckets.savings.amount + buckets.emergency.amount;
  const healthPercentage = totalBudget > 0 ? Math.min(100, Math.max(0, (safeFunds / totalBudget) * 150)) : 0;

  let healthColor = 'bg-rose-500';
  if (healthPercentage > 40) healthColor = 'bg-amber-400';
  if (healthPercentage > 70) healthColor = 'bg-emerald-500';

  const handlePointerDown = (e, bucketId, amount) => {
    if (e.button !== undefined && e.button !== 0) return; // primary button / touch only
    if (buckets[bucketId].amount < amount) return;
    if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId);

    setDragState({
      active: true,
      source: bucketId,
      amount,
      x: e.clientX,
      y: e.clientY,
      startX: e.clientX,
      startY: e.clientY,
      moved: false
    });
  };

  const handlePointerMove = useCallback((e) => {
    setDragState(prev => {
      if (!prev.active) return prev;
      const moved = prev.moved || Math.hypot(e.clientX - prev.startX, e.clientY - prev.startY) > DRAG_THRESHOLD;
      return { ...prev, x: e.clientX, y: e.clientY, moved };
    });
  }, []);

  const resetDrag = () => setDragState({ active: false, source: null, amount: 0, x: 0, y: 0, startX: 0, startY: 0, moved: false });

  const handlePointerUp = useCallback((e) => {
    if (!dragState.active) return;

    if (!dragState.moved) {
      // It was a tap, not a drag: open the "move to..." chooser
      setPickerModal({ sourceId: dragState.source, amount: dragState.amount });
    } else {
      // The ghost has pointer-events: none, so it never blocks hit-testing
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const dropEl = elements.map(el => el.closest && el.closest('[data-bucket-id]')).find(Boolean);
      if (dropEl) {
        const targetId = dropEl.getAttribute('data-bucket-id');
        if (targetId && targetId !== dragState.source) {
          processTransfer(dragState.source, targetId, dragState.amount);
        }
      }
    }
    resetDrag();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragState, buckets]);

  const handlePointerCancel = useCallback(() => {
    resetDrag();
  }, []);

  const processTransfer = (sourceId, targetId, amount) => {
    // strict warning for BOTH savings and emergency withdrawals
    if (sourceId === 'savings' || sourceId === 'emergency') {
      setWarningModal({ sourceId, targetId, amount });
      return;
    }
    executeTransfer(sourceId, targetId, amount);
  };

  const executeTransfer = (sourceId, targetId, amount) => {
    // Never allow a bucket to go negative
    if (buckets[sourceId].amount < amount) {
      setWarningModal(null);
      return;
    }

    setBuckets(prev => ({
      ...prev,
      [sourceId]: { ...prev[sourceId], amount: prev[sourceId].amount - amount },
      [targetId]: { ...prev[targetId], amount: prev[targetId].amount + amount }
    }));

    if (targetId === 'savings') {
      setCelebrationModal({ amount });
    }
    setWarningModal(null);
  };

  const handleReset = () => {
    setBuckets(DEFAULT_BUCKETS);
    setWarningModal(null);
    setCelebrationModal(null);
    setPickerModal(null);
    resetDrag();
  };

  const showGhost = dragState.active && dragState.moved;

  return (
    <div
      className="flex flex-col h-full gap-5 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 select-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <header className="px-2 mt-4 md:mt-0 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight mb-1">Manage</h2>
          <p className="text-sm text-slate-400 font-medium">Drag or tap to move funds and simulate trade-offs.</p>
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 text-xs font-bold text-slate-300 flex items-center gap-1"
        >
          Reset
        </button>
      </header>

      {/* Dynamic Header: Allowance & Health Score */}
      <div className="glass-panel p-5 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[20%] w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Allowance Info */}
        <div className="border-l-4 border-l-indigo-500 pl-4">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" aria-hidden="true"></span> Daily Spend Limit
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              ₹{dailyAllowance}
            </span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">/ day</span>
          </div>
        </div>

        {/* Financial Health Progress */}
        <div className="flex flex-col justify-center">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
              <Activity className="w-3 h-3" aria-hidden="true"/> Financial Health
            </span>
            <span className="text-xs font-black text-white">{Math.round(healthPercentage)}/100</span>
          </div>
          <div
            className="h-3 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner border border-white/5"
            role="progressbar"
            aria-label="Financial health"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(healthPercentage)}
          >
            <div
              className={`h-full ${healthColor} transition-all duration-500 ease-out`}
              style={{ width: `${healthPercentage}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-1.5">Based on your safety net (Savings & Emergency).</p>
        </div>
      </div>

      {/* Drag & Drop Buckets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 content-start">
        {Object.values(buckets).map((bucket) => {
          const isDropTarget = showGhost && dragState.source !== bucket.id;
          return (
            <div
              key={bucket.id}
              data-bucket-id={bucket.id}
              className={`
                glass-panel rounded-3xl p-5 relative transition-all duration-300
                ${isDropTarget ? 'border-indigo-400/50 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)] scale-[1.02]' : 'border-white/5'}
              `}
            >
              <div className="flex justify-between items-start mb-5 pointer-events-none">
                <div className="flex gap-4 items-center">
                  <div className={`w-12 h-12 rounded-2xl ${bucket.color} flex items-center justify-center text-white shadow-lg shadow-black/20`}>
                    {bucket.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white tracking-tight">{bucket.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{bucket.desc}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl font-black text-white tracking-tight">₹{bucket.amount}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Balance</span>
                </div>
              </div>

              <div className="flex gap-2 relative z-10">
                {CHIP_AMOUNTS.map(amt => {
                  const disabled = bucket.amount < amt;
                  return (
                    <button
                      key={amt}
                      disabled={disabled}
                      aria-label={`Move ₹${amt} from ${bucket.name}`}
                      onPointerDown={(e) => handlePointerDown(e, bucket.id, amt)}
                      onClick={(e) => {
                        // Keyboard activation (Enter/Space) has detail === 0; pointer taps are handled on pointer up
                        if (e.detail === 0) setPickerModal({ sourceId: bucket.id, amount: amt });
                      }}
                      className={`
                        flex-1 py-2.5 rounded-xl text-xs font-black border transition-transform touch-none shadow-sm flex items-center justify-center gap-1
                        ${disabled
                          ? 'opacity-30 border-white/5 bg-black/20 text-slate-400 cursor-not-allowed'
                          : 'border-white/10 bg-white/5 hover:bg-white/10 text-white cursor-grab active:cursor-grabbing active:scale-95'}
                      `}
                    >
                      Move ₹{amt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Ghost Drag Element */}
      {showGhost && (
        <div
          id="drag-ghost"
          aria-hidden="true"
          style={{ position: 'fixed', left: dragState.x, top: dragState.y, transform: 'translate(-50%, -50%)', zIndex: 9999 }}
          className="bg-indigo-500 text-white font-black text-sm px-5 py-2.5 rounded-xl shadow-2xl border border-indigo-400 pointer-events-none flex items-center gap-2 animate-in zoom-in-75 duration-100"
        >
          <ArrowRight className="w-4 h-4" /> ₹{dragState.amount}
        </div>
      )}

      {/* Tap / keyboard chooser: pick where to move the money */}
      {pickerModal && (
        <Modal
          labelledBy="picker-title"
          describedBy="picker-desc"
          onClose={() => setPickerModal(null)}
          panelClassName="glass-panel max-w-sm w-full rounded-3xl p-6 md:p-8 border-indigo-500/40 bg-[#0f172a] shadow-2xl text-center relative overflow-hidden"
        >
          <div className="absolute top-[-20%] left-[20%] w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <h2 id="picker-title" className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">Move ₹{pickerModal.amount}</h2>
          <p id="picker-desc" className="text-slate-300 mb-6 text-sm leading-relaxed font-medium">
            From <strong>{buckets[pickerModal.sourceId].name}</strong> to:
          </p>
          <div className="flex flex-col gap-3 relative z-10">
            {Object.values(buckets).filter(b => b.id !== pickerModal.sourceId).map((b, i) => (
              <button
                key={b.id}
                data-autofocus={i === 0 ? true : undefined}
                onClick={() => {
                  const { sourceId, amount } = pickerModal;
                  setPickerModal(null);
                  processTransfer(sourceId, b.id, amount);
                }}
                className="w-full py-3.5 rounded-xl font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" /> {b.name}
              </button>
            ))}
            <button
              onClick={() => setPickerModal(null)}
              className="w-full py-3.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 transition-colors text-white border border-white/10"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {/* Custom Warning Modal (For Savings AND Emergency) */}
      {warningModal && (
        <Modal
          labelledBy="warning-title"
          describedBy="warning-desc"
          onClose={() => setWarningModal(null)}
          panelClassName="glass-panel max-w-sm w-full rounded-3xl p-6 md:p-8 border-rose-500/40 bg-[#0f172a] shadow-2xl text-center relative overflow-hidden"
        >
          <div className="absolute top-[-20%] left-[20%] w-32 h-32 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-rose-500/30">
            <AlertTriangle className="w-8 h-8 text-rose-500" aria-hidden="true" />
          </div>

          <h2 id="warning-title" className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">Hold up. Are you sure?</h2>
          <p id="warning-desc" className="text-slate-300 mb-8 text-sm leading-relaxed font-medium">
            You are pulling ₹{warningModal.amount} out of your <strong>{buckets[warningModal.sourceId].name}</strong> account.
            You might want to use this money later because it is reserved for your {warningModal.sourceId === 'savings' ? 'future goals' : 'safety net'}!
          </p>

          <div className="flex flex-col gap-3 relative z-10">
            <button
              onClick={() => executeTransfer(warningModal.sourceId, warningModal.targetId, warningModal.amount)}
              className="w-full py-3.5 rounded-xl font-bold bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/50 transition-all"
            >
              Yes, Withdraw Anyway
            </button>
            <button
              data-autofocus
              onClick={() => setWarningModal(null)}
              className="w-full py-3.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 transition-colors text-white border border-white/10"
            >
              Cancel Action
            </button>
          </div>
        </Modal>
      )}

      {/* Custom Celebration Modal (For Savings deposit) */}
      {celebrationModal && (
        <Modal
          labelledBy="celebration-title"
          describedBy="celebration-desc"
          onClose={() => setCelebrationModal(null)}
          panelClassName="glass-panel max-w-sm w-full rounded-3xl p-6 md:p-8 border-emerald-500/40 bg-[#0f172a] shadow-2xl text-center relative overflow-hidden"
        >
          <div className="absolute top-[-20%] left-[20%] w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-emerald-500/30">
            <CheckCircle className="w-8 h-8 text-emerald-400" aria-hidden="true" />
          </div>

          <h2 id="celebration-title" className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">Awesome job!</h2>
          <p id="celebration-desc" className="text-slate-300 mb-8 text-sm leading-relaxed font-medium">
            You moved ₹{celebrationModal.amount} into savings. Adding to your savings today builds a stronger financial future for tomorrow. Keep up the amazing work!
          </p>

          <button
            data-autofocus
            onClick={() => setCelebrationModal(null)}
            className="w-full py-3.5 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg relative z-10"
          >
            Continue
          </button>
        </Modal>
      )}
    </div>
  );
}

function CompeteTab() {
  const [mode, setMode] = useState('versus');

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full pb-20">
      <header className="px-2 mt-4 md:mt-0">
        <h2 className="text-3xl font-black text-white tracking-tight mb-1">Play & Save</h2>
        <p className="text-sm text-slate-400 font-medium tracking-wide">Gamify your financial journey with friends.</p>
      </header>

      {/* Mode Toggle Switch */}
      <div role="tablist" aria-label="Game mode" className="glass-panel p-1.5 rounded-2xl flex relative w-full bg-black/20 border-white/5 shrink-0">
        <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl bg-white/10 border border-white/20 transition-all duration-300 shadow-sm ${mode === 'versus' ? 'left-1.5' : 'left-[calc(50%+4px)]'}`}></div>
        <button role="tab" aria-selected={mode === 'versus'} onClick={() => setMode('versus')} className={`flex-1 py-3 text-sm font-bold z-10 transition-colors ${mode === 'versus' ? 'text-white' : 'text-slate-400 hover:text-white'}`}>Versus Mode</button>
        <button role="tab" aria-selected={mode === 'co-op'} onClick={() => setMode('co-op')} className={`flex-1 py-3 text-sm font-bold z-10 transition-colors ${mode === 'co-op' ? 'text-white' : 'text-slate-400 hover:text-white'}`}>Co-op Mode</button>
      </div>

      <div className="relative flex-1">
        {mode === 'versus' ? (
          <div className="flex flex-col gap-4 animate-in slide-in-from-left-8 fade-in duration-500 h-full">
            {/* Versus Main Card */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 text-center border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent relative overflow-hidden shrink-0">
              <Trophy className="w-40 h-40 text-indigo-500/10 absolute -top-10 -right-10" aria-hidden="true" />
              <h3 className="text-xl font-black mb-1 text-white relative z-10 tracking-tight">Savings Clash (April)</h3>
              <p className="text-xs text-slate-300 font-medium mb-8 relative z-10">First to save ₹5,000 wins!</p>

              <div className="flex justify-between items-center relative z-10 max-w-sm mx-auto">
                {/* Player 1 (User) */}
                <div className="flex flex-col items-center w-1/3">
                  <div className="relative mb-3">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-indigo-500 flex items-center justify-center text-2xl border border-indigo-400 shadow-lg z-10 relative" aria-hidden="true">😎</div>
                    <div className="absolute -top-2 -right-2 bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full z-20 shadow-md">1st</div>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Alex (You)</span>
                  <span className="font-black text-white text-lg tracking-tight mt-1">₹3,400</span>
                </div>

                <div className="w-1/3 flex flex-col items-center">
                  <div className="text-lg md:text-xl font-black text-slate-400 italic mb-2">VS</div>
                  <div className="text-[10px] text-slate-400 font-bold bg-black/30 px-2 py-1 rounded-md">4 Days Left</div>
                </div>

                {/* Player 2 */}
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-slate-700 flex items-center justify-center text-2xl border border-slate-600 shadow-lg opacity-80 mb-3" aria-hidden="true">🤓</div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sam</span>
                  <span className="font-bold text-slate-300 text-lg tracking-tight mt-1">₹2,850</span>
                </div>
              </div>

              {/* Individual Progress Bars */}
              <div className="mt-8 space-y-3 max-w-sm mx-auto relative z-10">
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span className="text-indigo-300">Alex's Progress</span>
                    <span className="text-white">68%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-label="Alex's progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={68}>
                    <div className="h-full bg-indigo-500 rounded-full w-[68%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span className="text-slate-400">Sam's Progress</span>
                    <span className="text-white">57%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-label="Sam's progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={57}>
                    <div className="h-full bg-slate-500 rounded-full w-[57%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="flex-1 glass-panel rounded-3xl p-5 flex flex-col min-h-[200px]">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" aria-hidden="true" /> Recent Activity
              </h4>
              <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-lg" aria-hidden="true">😎</div>
                  <div className="flex-1">
                    <p className="text-xs text-white"><span className="font-bold text-indigo-300">You</span> added to Savings.</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">2 hours ago</p>
                  </div>
                  <span className="text-xs font-black text-emerald-400">+₹500</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-lg" aria-hidden="true">🤓</div>
                  <div className="flex-1">
                    <p className="text-xs text-white"><span className="font-bold text-slate-300">Sam</span> skipped a coffee run.</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">Yesterday</p>
                  </div>
                  <span className="text-xs font-black text-emerald-400">+₹200</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-lg" aria-hidden="true">😎</div>
                  <div className="flex-1">
                    <p className="text-xs text-white"><span className="font-bold text-indigo-300">You</span> reached a mini-milestone!</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">2 days ago</p>
                  </div>
                  <Trophy className="w-4 h-4 text-amber-400" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 animate-in slide-in-from-right-8 fade-in duration-500 h-full">
            {/* Co-op Main Card */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 text-center border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-transparent relative overflow-hidden shrink-0">
              <Users className="w-40 h-40 text-pink-500/10 absolute -top-10 -left-10" aria-hidden="true" />
              <h3 className="text-xl font-black mb-1 text-white relative z-10 tracking-tight">Goa Trip Fund 🌴</h3>
              <p className="text-xs text-slate-300 font-medium mb-8 relative z-10">Collaborating with Sam for summer vacation.</p>

              <div className="relative glass-panel p-5 md:p-6 rounded-2xl bg-black/40 border border-white/10 z-10">
                <div className="flex justify-between text-sm font-black mb-3 text-white">
                  <span className="flex flex-col items-start">
                    ₹12,000 <span className="text-[10px] text-pink-300 uppercase tracking-widest mt-0.5">Raised Together</span>
                  </span>
                  <span className="flex flex-col items-end">
                    ₹20,000 <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Target Goal</span>
                  </span>
                </div>

                {/* Stacked Progress Bar */}
                <div className="h-6 md:h-8 bg-slate-800 rounded-full overflow-hidden flex shadow-inner border border-white/5 relative" role="progressbar" aria-label="Goa trip fund" aria-valuemin={0} aria-valuemax={100} aria-valuenow={60}>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTAgNDAgTDRwIDAiLz48L2c+PC9zdmc+')] opacity-20"></div>

                  {/* User Contribution */}
                  <div className="h-full bg-indigo-500 w-[35%] relative flex items-center justify-center border-r border-black/20">
                    <span className="text-[10px] font-black text-white shadow-sm">You (35%)</span>
                  </div>
                  {/* Friend Contribution */}
                  <div className="h-full bg-pink-500 w-[25%] relative flex items-center justify-center">
                    <span className="text-[10px] font-black text-white shadow-sm">Sam (25%)</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-medium mt-4">Only <strong className="text-white">₹8,000</strong> left to go! Almost there!</p>
              </div>
            </div>

            {/* Contribution Breakdown List */}
            <div className="flex-1 glass-panel rounded-3xl p-5 flex flex-col min-h-[200px]">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-emerald-400" aria-hidden="true" /> Top Contributors
              </h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-xl shadow-lg" aria-hidden="true">😎</div>
                    <div>
                      <p className="text-sm font-bold text-white">Alex (You)</p>
                      <p className="text-[10px] text-indigo-300 font-medium mt-0.5">Last added ₹1000 on Mon</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-white">₹7,000</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">Total</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-xl shadow-lg opacity-90" aria-hidden="true">🤓</div>
                    <div>
                      <p className="text-sm font-bold text-white">Sam</p>
                      <p className="text-[10px] text-pink-300 font-medium mt-0.5">Last added ₹500 yesterday</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-white">₹5,000</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">Total</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

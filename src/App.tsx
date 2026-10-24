import { useState, useCallback, useEffect } from 'react';
import { translations, type Lang } from './i18n';
import VisionScreen from './components/VisionScreen';
import PlanScreen from './components/PlanScreen';
import QualificationScreen from './components/QualificationScreen';
import EconomicsScreen from './components/EconomicsScreen';
import DecisionScreen from './components/DecisionScreen';

type Screen = 'vision' | 'plan' | 'qualification' | 'economics' | 'decision';

function App() {
  const [lang, setLang] = useState<Lang>('es');
  const [screen, setScreen] = useState<Screen>('vision');
  const [presentationMode, setPresentationMode] = useState(false);
  const t = translations[lang];

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'es' ? 'en' : 'es');
  }, []);

  const togglePresentation = useCallback(() => {
    setPresentationMode(prev => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && presentationMode) {
        setPresentationMode(false);
      }
      if (e.key === 'F5' || (e.key === 'F5' && e.ctrlKey)) {
        // Allow default browser behavior
      }
      if (e.altKey && e.key >= '1' && e.key <= '5') {
        const screens: Screen[] = ['vision', 'plan', 'qualification', 'economics', 'decision'];
        setScreen(screens[parseInt(e.key) - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode]);

  const screens: { key: Screen; label: string }[] = [
    { key: 'vision', label: t.nav.vision },
    { key: 'plan', label: t.nav.plan },
    { key: 'qualification', label: t.nav.qualification },
    { key: 'economics', label: t.nav.economics },
    { key: 'decision', label: t.nav.decision },
  ];

  if (presentationMode) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col" role="application" aria-label={t.presentation.mode}>
        <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
          <span className="text-sm font-medium text-slate-300">{t.presentation.mode} — ESC {t.presentation.exit}</span>
          <div className="flex gap-2">
            {screens.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setScreen(s.key)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  screen === s.key ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
                aria-pressed={screen === s.key}
              >
                {s.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPresentationMode(false)}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm text-white transition-colors"
          >
            {t.presentation.exit}
          </button>
        </div>
        <div className="flex-1 overflow-auto p-8">
          {screen === 'vision' && <VisionScreen lang={lang} />}
          {screen === 'plan' && <PlanScreen lang={lang} />}
          {screen === 'qualification' && <QualificationScreen lang={lang} />}
          {screen === 'economics' && <EconomicsScreen lang={lang} />}
          {screen === 'decision' && <DecisionScreen lang={lang} />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col" role="application" aria-label={t.appTitle}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{t.appTitle}</h1>
              <p className="text-xs text-gray-500">{t.appSubtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={togglePresentation}
                className="hidden sm:inline-flex items-center px-3 py-1.5 text-sm bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors"
                aria-label={t.presentation.mode}
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t.presentation.mode}
              </button>
              <button
                onClick={toggleLang}
                className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                aria-label={`${t.common.language}: ${lang === 'es' ? 'English' : 'Español'}`}
              >
                {lang === 'es' ? 'EN' : 'ES'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200" role="alert">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-xs text-amber-800 flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{t.disclaimer}</span>
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2" role="tablist">
            {screens.map((s, i) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={screen === s.key}
                onClick={() => setScreen(s.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  screen === s.key
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                tabIndex={screen === s.key ? 0 : -1}
              >
                <span className="mr-1.5 text-xs opacity-70">Alt+{i + 1}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8" role="tabpanel">
        {screen === 'vision' && <VisionScreen lang={lang} />}
        {screen === 'plan' && <PlanScreen lang={lang} />}
        {screen === 'qualification' && <QualificationScreen lang={lang} />}
        {screen === 'economics' && <EconomicsScreen lang={lang} />}
        {screen === 'decision' && <DecisionScreen lang={lang} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500 text-center">
            {lang === 'es'
              ? 'Propuesta no solicitada · Sin relación contractual · Datos públicos de iren.com · Sin resultados inventados'
              : 'Unsolicited proposal · No contractual relationship · Public data from iren.com · No invented results'}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

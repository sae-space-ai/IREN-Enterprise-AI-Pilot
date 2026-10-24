import { useState, useCallback } from 'react';
import { translations, type Lang } from '../i18n';

interface Props {
  lang: Lang;
}

type CriterionState = 'unevaluated' | 'pending' | 'verified';

const stateColors: Record<CriterionState, string> = {
  unevaluated: 'bg-gray-100 text-gray-700 border-gray-300',
  pending: 'bg-amber-50 text-amber-800 border-amber-300',
  verified: 'bg-green-50 text-green-800 border-green-300',
};

const stateIcons: Record<CriterionState, string> = {
  unevaluated: '○',
  pending: '◐',
  verified: '●',
};

export default function QualificationScreen({ lang }: Props) {
  const t = translations[lang].qualification;
  const [states, setStates] = useState<CriterionState[]>(
    Array(7).fill('unevaluated') as CriterionState[]
  );

  const cycleState = useCallback((index: number) => {
    setStates(prev => {
      const next = [...prev];
      const order: CriterionState[] = ['unevaluated', 'pending', 'verified'];
      const currentIdx = order.indexOf(next[index]);
      next[index] = order[(currentIdx + 1) % order.length];
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setStates(Array(7).fill('unevaluated') as CriterionState[]);
  }, []);

  const verifiedCount = states.filter(s => s === 'verified').length;
  const pendingCount = states.filter(s => s === 'pending').length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">{t.description}</p>
      </div>

      {/* Score Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {verifiedCount} <span className="text-lg text-gray-400">/ 7</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">{t.score} ({t.states.verified})</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {pendingCount}
              </div>
              <div className="text-xs text-gray-500 mt-1">{t.states.pending}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">
                {7 - verifiedCount - pendingCount}
              </div>
              <div className="text-xs text-gray-500 mt-1">{t.states.unevaluated}</div>
            </div>
          </div>
          <button
            onClick={resetAll}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {t.reset}
          </button>
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${(verifiedCount / 7) * 100}%` }}
            role="progressbar"
            aria-valuenow={verifiedCount}
            aria-valuemin={0}
            aria-valuemax={7}
            aria-label={`${verifiedCount} ${t.of} 7 ${t.states.verified}`}
          />
        </div>
      </div>

      {/* Criteria */}
      <div className="space-y-3">
        {t.criteria.map((criterion, i) => (
          <div
            key={criterion.id}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center text-sm font-bold">
                    {criterion.id}
                  </span>
                  <h3 className="font-semibold text-gray-900">{criterion.name}</h3>
                </div>
                <p className="mt-1 ml-11 text-sm text-gray-500">{criterion.description}</p>
              </div>
              <button
                onClick={() => cycleState(i)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${stateColors[states[i]]}`}
                aria-label={`${criterion.name}: ${t.states[states[i]]}. ${lang === 'es' ? 'Clic para cambiar estado' : 'Click to change state'}`}
              >
                <span className="mr-1.5">{stateIcons[states[i]]}</span>
                {t.states[states[i]]}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          {lang === 'es' ? 'Leyenda de estados' : 'State legend'}
        </h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-gray-100 border border-gray-300 flex items-center justify-center text-xs">○</span>
            <span className="text-sm text-gray-600">{t.states.unevaluated}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-amber-50 border border-amber-300 flex items-center justify-center text-xs">◐</span>
            <span className="text-sm text-gray-600">{t.states.pending}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-green-50 border border-green-300 flex items-center justify-center text-xs">●</span>
            <span className="text-sm text-gray-600">{t.states.verified}</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          {lang === 'es'
            ? 'Nota: No se marca automáticamente encaje con IREN. Cada criterio requiere evidencia verificable.'
            : 'Note: No automatic fit with IREN is marked. Each criterion requires verifiable evidence.'}
        </p>
      </div>
    </div>
  );
}

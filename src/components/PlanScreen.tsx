import { translations, type Lang } from '../i18n';

interface Props {
  lang: Lang;
}

export default function PlanScreen({ lang }: Props) {
  const t = translations[lang].plan;
  const phaseColors = ['border-blue-500', 'border-amber-500', 'border-green-500'];
  const phaseBgs = ['bg-blue-50', 'bg-amber-50', 'bg-green-50'];
  const phaseIcons = [
    <svg key="1" className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    <svg key="2" className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    <svg key="3" className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">{t.description}</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
        <div className="space-y-6">
          {t.phases.map((phase, i) => (
            <div key={i} className={`relative md:ml-16 bg-white rounded-xl border-l-4 ${phaseColors[i]} border border-gray-200 p-6 shadow-sm`}>
              <div className="hidden md:flex absolute -left-12 top-6 w-8 h-8 rounded-full bg-white border-2 border-gray-300 items-center justify-center">
                <span className="text-sm font-bold text-gray-700">{i + 1}</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                {phaseIcons[i]}
                <h3 className="text-lg font-semibold text-gray-900">{phase.name}</h3>
              </div>
              <div className={`rounded-lg ${phaseBgs[i]} p-4`}>
                <ul className="space-y-2">
                  {phase.tasks.map((task, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Opportunities */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {translations[lang].opportunities.title}
          </h3>
          <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-800 rounded">
            {translations[lang].opportunities.demo}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">{translations[lang].opportunities.description}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-medium text-gray-700">{translations[lang].opportunities.name}</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">{translations[lang].opportunities.sector}</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">{translations[lang].opportunities.status}</th>
                <th className="text-right py-2 px-3 font-medium text-gray-700">{translations[lang].opportunities.value}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 text-gray-900">Demo-Opp-001</td>
                <td className="py-2 px-3 text-gray-600">{lang === 'es' ? 'Energía (ficticio)' : 'Energy (fictitious)'}</td>
                <td className="py-2 px-3"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs">{lang === 'es' ? 'En evaluación' : 'Under review'}</span></td>
                <td className="py-2 px-3 text-right text-gray-900">—</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 text-gray-900">Demo-Opp-002</td>
                <td className="py-2 px-3 text-gray-600">{lang === 'es' ? 'Manufactura (ficticio)' : 'Manufacturing (fictitious)'}</td>
                <td className="py-2 px-3"><span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs">{lang === 'es' ? 'Sin evaluar' : 'Unevaluated'}</span></td>
                <td className="py-2 px-3 text-right text-gray-900">—</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-gray-900">Demo-Opp-003</td>
                <td className="py-2 px-3 text-gray-600">{lang === 'es' ? 'Logística (ficticio)' : 'Logistics (fictitious)'}</td>
                <td className="py-2 px-3"><span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs">{lang === 'es' ? 'Sin evaluar' : 'Unevaluated'}</span></td>
                <td className="py-2 px-3 text-right text-gray-900">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Demo Use Cases */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {translations[lang].cases.title}
          </h3>
          <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-800 rounded">
            {translations[lang].cases.demo}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">{translations[lang].cases.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 text-sm mb-2">{lang === 'es' ? 'Demo-Caso-A: Clasificación documental' : 'Demo-Case-A: Document classification'}</h4>
            <p className="text-xs text-gray-500">{lang === 'es' ? 'Caso ficticio para ilustrar el flujo de procesamiento. Métricas: pendientes de evidencia.' : 'Fictitious case to illustrate processing flow. Metrics: pending evidence.'}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 text-sm mb-2">{lang === 'es' ? 'Demo-Caso-B: Inspección visual' : 'Demo-Case-B: Visual inspection'}</h4>
            <p className="text-xs text-gray-500">{lang === 'es' ? 'Caso ficticio para ilustrar visión industrial. Métricas: pendientes de evidencia.' : 'Fictitious case to illustrate industrial vision. Metrics: pending evidence.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

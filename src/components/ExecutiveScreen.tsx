import { translations, type Lang } from '../i18n';

interface Props {
  lang: Lang;
}

export default function ExecutiveScreen({ lang }: Props) {
  const t = translations[lang].executive;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{t.subtitle}</h2>
            <p className="text-slate-300 text-sm">{t.title}</p>
          </div>
        </div>
        <p className="text-slate-200 text-base leading-relaxed max-w-3xl">{t.summary}</p>
      </div>

      {/* Context */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t.context}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{t.contextText}</p>
        <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-blue-800 text-xs">
            <strong>{lang === 'es' ? 'Fuente:' : 'Source:'}</strong>{' '}
            <a
              href="https://www.iren.com/data-centers/badajoz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              iren.com/data-centers/badajoz
            </a>
            {' — '}
            {lang === 'es'
              ? '300 MW planificados, horizonte 2028+. No implica operación actual.'
              : '300 MW planned, 2028+ horizon. Does not imply current operation.'}
          </p>
        </div>
      </div>

      {/* Approach */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          {t.approach}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{t.approachText}</p>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          {t.nextSteps}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {t.nextStepsList.map((step, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Figures */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-blue-600">7</div>
          <div className="text-xs text-gray-500 mt-1">{lang === 'es' ? 'Criterios' : 'Criteria'}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-amber-600">90</div>
          <div className="text-xs text-gray-500 mt-1">{lang === 'es' ? 'Días' : 'Days'}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-green-600">5</div>
          <div className="text-xs text-gray-500 mt-1">{lang === 'es' ? 'Gates' : 'Gates'}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-purple-600">300</div>
          <div className="text-xs text-gray-500 mt-1">MW {lang === 'es' ? 'planificados' : 'planned'}</div>
        </div>
      </div>

      {/* Budget Reference */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {lang === 'es' ? 'Presupuesto de Referencia' : 'Reference Budget'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">{lang === 'es' ? 'Coste base' : 'Base cost'}</div>
            <div className="text-xl font-bold text-gray-900">49.500 EUR</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">{lang === 'es' ? 'Precio objetivo' : 'Target price'}</div>
            <div className="text-xl font-bold text-gray-900">62.000 EUR</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
            <div className="text-xs text-gray-500 mb-1">{lang === 'es' ? 'Margen base' : 'Base margin'}</div>
            <div className="text-xl font-bold text-green-700">12.500 EUR</div>
            <div className="text-xs text-green-600 mt-0.5">~20.2%</div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          {lang === 'es'
            ? 'Nota: Los valores son referenciales. Use el simulador financiero para explorar escenarios con sensibilidad.'
            : 'Note: Values are reference. Use the financial simulator to explore scenarios with sensitivity.'}
        </p>
      </div>

      {/* Contact CTA */}
      <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-emerald-900">
              {translations[lang].contact.label}
            </h3>
            <p className="text-sm text-emerald-700 mt-1">
              {translations[lang].contact.description}
            </p>
          </div>
          <a
            href={translations[lang].contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium whitespace-nowrap"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {lang === 'es' ? 'Ir a contacto IREN' : 'Go to IREN contact'}
          </a>
        </div>
      </div>

      {/* Limits */}
      <div className="bg-red-50 rounded-xl border border-red-200 p-5">
        <h4 className="text-sm font-semibold text-red-800 mb-2">
          {lang === 'es' ? 'Límites de este prototipo' : 'Prototype limits'}
        </h4>
        <ul className="space-y-1.5 text-xs text-red-700">
          <li>• {lang === 'es' ? 'No hay integración real con IREN' : 'No real integration with IREN'}</li>
          <li>• {lang === 'es' ? 'No hay datos de clientes' : 'No client data'}</li>
          <li>• {lang === 'es' ? 'No hay backend, autenticación ni despliegue' : 'No backend, authentication or deployment'}</li>
          <li>• {lang === 'es' ? 'No hay envío de correo' : 'No email sending'}</li>
          <li>• {lang === 'es' ? '300 MW y 2028+ se atribuyen a fuentes públicas; no son capacidad operativa' : '300 MW and 2028+ attributed to public sources; not operational capacity'}</li>
        </ul>
      </div>
    </div>
  );
}

import { useState, useCallback } from 'react';
import { translations, type Lang } from '../i18n';

interface Props {
  lang: Lang;
}

export default function DecisionScreen({ lang }: Props) {
  const t = translations[lang].decision;
  const [checked, setChecked] = useState<boolean[]>(Array(t.gates.length).fill(false));

  const toggleGate = useCallback((index: number) => {
    setChecked(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, []);

  const allChecked = checked.every(Boolean);
  const checkedCount = checked.filter(Boolean).length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">{t.description}</p>
      </div>

      {/* Warning Banner */}
      <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5" role="alert">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-red-800 font-semibold text-sm">{t.warning}</p>
            <p className="text-red-700 text-xs mt-1">
              {lang === 'es'
                ? 'Antes de desarrollar backend real, preguntar por stack, alojamiento, permisos y modelo de datos.'
                : 'Before developing real backend, ask about stack, hosting, permissions and data model.'}
            </p>
          </div>
        </div>
      </div>

      {/* Gates */}
      <div className="space-y-3">
        {t.gates.map((gate, i) => (
          <div
            key={gate.id}
            className={`bg-white rounded-xl border-2 p-5 shadow-sm transition-all ${
              checked[i] ? 'border-green-300 bg-green-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleGate(i)}
                className={`flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  checked[i]
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                aria-pressed={checked[i]}
                aria-label={`${gate.name}: ${checked[i] ? (lang === 'es' ? 'Completado' : 'Completed') : (lang === 'es' ? 'Pendiente' : 'Pending')}`}
              >
                {checked[i] && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{gate.name}</h3>
                  {gate.required && (
                    <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded font-medium">
                      {lang === 'es' ? 'Obligatorio' : 'Required'}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-600">{gate.description}</p>
              </div>
              <span className={`text-sm font-medium px-3 py-1 rounded ${
                checked[i] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {checked[i]
                  ? (lang === 'es' ? '✓ Completado' : '✓ Completed')
                  : (lang === 'es' ? 'Pendiente' : 'Pending')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Status Summary */}
      <div className={`rounded-xl border-2 p-6 ${allChecked ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-bold ${allChecked ? 'text-green-800' : 'text-amber-800'}`}>
              {allChecked
                ? (lang === 'es' ? '✓ Todos los gates completados' : '✓ All gates completed')
                : (lang === 'es' ? `${checkedCount}/${t.gates.length} gates completados` : `${checkedCount}/${t.gates.length} gates completed`)}
            </h3>
            <p className={`text-sm mt-1 ${allChecked ? 'text-green-700' : 'text-amber-700'}`}>
              {allChecked
                ? (lang === 'es' ? 'Condiciones cumplidas para proceder.' : 'Conditions met to proceed.')
                : t.blocked}
            </p>
          </div>
          <button
            disabled={!allChecked}
            className={`px-6 py-3 rounded-lg font-semibold text-sm transition-colors ${
              allChecked
                ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            aria-disabled={!allChecked}
          >
            {allChecked ? t.proceed : t.blocked}
          </button>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          {lang === 'es' ? 'Aviso de privacidad y datos' : 'Privacy and data notice'}
        </h4>
        <ul className="space-y-2 text-xs text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            {lang === 'es'
              ? 'No se realizan peticiones a servicios externos.'
              : 'No requests are made to external services.'}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            {lang === 'es'
              ? 'No se almacenan datos sensibles sin un diseño de privacidad aprobado.'
              : 'No sensitive data is stored without an approved privacy design.'}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            {lang === 'es'
              ? 'Los datos de demostración son ficticios y no representan entidades reales.'
              : 'Demo data is fictitious and does not represent real entities.'}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400">•</span>
            {lang === 'es'
              ? 'Antes de implementar backend: definir stack, alojamiento, permisos y modelo de datos.'
              : 'Before implementing backend: define stack, hosting, permissions and data model.'}
          </li>
        </ul>
      </div>

      {/* Backend Prerequisites */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {lang === 'es' ? 'Prerrequisitos para backend real' : 'Prerequisites for real backend'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">
              {lang === 'es' ? 'Stack tecnológico' : 'Technology stack'}
            </h4>
            <p className="text-xs text-gray-500">
              {lang === 'es'
                ? 'Pendiente de definición. Preguntar al equipo por preferencias y restricciones.'
                : 'Pending definition. Ask team for preferences and constraints.'}
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">
              {lang === 'es' ? 'Alojamiento' : 'Hosting'}
            </h4>
            <p className="text-xs text-gray-500">
              {lang === 'es'
                ? 'Pendiente de definición. Considerar soberanía de datos y ubicación UE.'
                : 'Pending definition. Consider data sovereignty and EU location.'}
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">
              {lang === 'es' ? 'Permisos y roles' : 'Permissions and roles'}
            </h4>
            <p className="text-xs text-gray-500">
              {lang === 'es'
                ? 'Pendiente de definición. Diseñar RBAC conforme a política de seguridad.'
                : 'Pending definition. Design RBAC per security policy.'}
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">
              {lang === 'es' ? 'Modelo de datos' : 'Data model'}
            </h4>
            <p className="text-xs text-gray-500">
              {lang === 'es'
                ? 'Pendiente de definición. Requiere validación con DPO y equipo legal.'
                : 'Pending definition. Requires validation with DPO and legal team.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

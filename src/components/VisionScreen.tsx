import { translations, type Lang } from '../i18n';

interface Props {
  lang: Lang;
}

export default function VisionScreen({ lang }: Props) {
  const t = translations[lang].vision;
  const metrics = translations[lang].metrics;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">{t.description}</p>
      </div>

      {/* Objective & Scope */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t.objective}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{t.objectiveText}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.scope}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{t.scopeText}</p>
        </div>
      </div>

      {/* Source */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.source}</h3>
        <p className="text-blue-800 text-sm">
          <a
            href="https://www.iren.com/data-centers/badajoz"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600"
          >
            iren.com/data-centers/badajoz
          </a>
          {' — '}{t.sourceText}
        </p>
      </div>

      {/* Principles */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.principles}</h3>
        <ul className="space-y-3">
          {t.principlesList.map((p, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document Processing */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{metrics.documents.title}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">{metrics.documents.precision}</span>
              <span className="text-sm font-medium px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                {metrics.documents.status}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">{metrics.documents.humanReview}</span>
              <span className="text-sm font-medium px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                {metrics.documents.status}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">{metrics.documents.cost}</span>
              <span className="text-sm font-medium px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                {metrics.documents.status}
              </span>
            </div>
          </div>
        </div>

        {/* Industrial Vision */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{metrics.vision.title}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">{metrics.vision.precisionRecall}</span>
              <span className="text-sm font-medium px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                {metrics.vision.status}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">{metrics.vision.falsePositives}</span>
              <span className="text-sm font-medium px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                {metrics.vision.status}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">{metrics.vision.latency}</span>
              <span className="text-sm font-medium px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                {metrics.vision.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

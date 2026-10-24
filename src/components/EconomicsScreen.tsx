import { useState, useCallback, useMemo } from 'react';
import { translations, type Lang } from '../i18n';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Props {
  lang: Lang;
}

interface Scenario {
  name: string;
  cost: number;
  price: number;
  margin: number;
  marginPct: number;
}

export default function EconomicsScreen({ lang }: Props) {
  const t = translations[lang].economics;
  const [baseCost, setBaseCost] = useState(49500);
  const [targetPrice, setTargetPrice] = useState(62000);
  const [costVariation, setCostVariation] = useState(0);
  const [priceVariation, setPriceVariation] = useState(0);

  const scenarios = useMemo((): Scenario[] => {
    const adjustedCost = baseCost * (1 + costVariation / 100);
    const adjustedPrice = targetPrice * (1 + priceVariation / 100);
    const margin = adjustedPrice - adjustedCost;
    const marginPct = adjustedPrice > 0 ? (margin / adjustedPrice) * 100 : 0;

    const bestCost = baseCost * 0.9;
    const bestPrice = targetPrice * 1.1;
    const bestMargin = bestPrice - bestCost;
    const bestMarginPct = bestPrice > 0 ? (bestMargin / bestPrice) * 100 : 0;

    const worstCost = baseCost * 1.15;
    const worstPrice = targetPrice * 0.9;
    const worstMargin = worstPrice - worstCost;
    const worstMarginPct = worstPrice > 0 ? (worstMargin / worstPrice) * 100 : 0;

    return [
      { name: t.bestCase, cost: bestCost, price: bestPrice, margin: bestMargin, marginPct: bestMarginPct },
      { name: t.baseCase, cost: adjustedCost, price: adjustedPrice, margin, marginPct },
      { name: t.worstCase, cost: worstCost, price: worstPrice, margin: worstMargin, marginPct: worstMarginPct },
    ];
  }, [baseCost, targetPrice, costVariation, priceVariation, t]);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }, [lang]);

  const exportCSV = useCallback(() => {
    const headers = lang === 'es'
      ? ['Escenario', 'Coste', 'Precio', 'Margen', 'Margen %']
      : ['Scenario', 'Cost', 'Price', 'Margin', 'Margin %'];
    const rows = scenarios.map(s => [
      s.name,
      Math.round(s.cost).toString(),
      Math.round(s.price).toString(),
      Math.round(s.margin).toString(),
      s.marginPct.toFixed(1) + '%',
    ]);
    const csv = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial_simulator.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, [scenarios, lang]);

  const exportPDF = useCallback(() => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(t.title, 14, 20);
    doc.setFontSize(10);
    doc.text(`${t.baseCost}: ${formatCurrency(baseCost)}`, 14, 32);
    doc.text(`${t.targetPrice}: ${formatCurrency(targetPrice)}`, 14, 39);

    autoTable(doc, {
      startY: 48,
      head: [[
        lang === 'es' ? 'Escenario' : 'Scenario',
        lang === 'es' ? 'Coste' : 'Cost',
        lang === 'es' ? 'Precio' : 'Price',
        lang === 'es' ? 'Margen' : 'Margin',
        lang === 'es' ? 'Margen %' : 'Margin %',
      ]],
      body: scenarios.map(s => [
        s.name,
        formatCurrency(s.cost),
        formatCurrency(s.price),
        formatCurrency(s.margin),
        s.marginPct.toFixed(1) + '%',
      ]),
      theme: 'grid',
      styles: { fontSize: 9 },
    });

    doc.setFontSize(8);
    doc.text(
      lang === 'es'
        ? 'Propuesta no solicitada · Sin relación contractual · Datos de demostración'
        : 'Unsolicited proposal · No contractual relationship · Demo data',
      14,
      doc.internal.pageSize.height - 10
    );

    doc.save('financial_simulator.pdf');
  }, [t, baseCost, targetPrice, scenarios, formatCurrency, lang]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">{t.description}</p>
      </div>

      {/* Input Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="baseCost" className="block text-sm font-medium text-gray-700 mb-1">
              {t.baseCost} ({t.currency})
            </label>
            <input
              id="baseCost"
              type="number"
              value={baseCost}
              onChange={(e) => setBaseCost(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              min={0}
              step={500}
              aria-describedby="baseCost-desc"
            />
            <p id="baseCost-desc" className="text-xs text-gray-500 mt-1">
              {lang === 'es' ? 'Valor base: 49.500 EUR' : 'Base value: 49,500 EUR'}
            </p>
          </div>
          <div>
            <label htmlFor="targetPrice" className="block text-sm font-medium text-gray-700 mb-1">
              {t.targetPrice} ({t.currency})
            </label>
            <input
              id="targetPrice"
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              min={0}
              step={500}
              aria-describedby="targetPrice-desc"
            />
            <p id="targetPrice-desc" className="text-xs text-gray-500 mt-1">
              {lang === 'es' ? 'Valor base: 62.000 EUR' : 'Base value: 62,000 EUR'}
            </p>
          </div>
        </div>

        {/* Sensitivity Sliders */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-4">{t.sensitivity}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="costVariation" className="block text-sm text-gray-600 mb-1">
                {t.costVariation}: {costVariation >= 0 ? '+' : ''}{costVariation}%
              </label>
              <input
                id="costVariation"
                type="range"
                min={-20}
                max={30}
                value={costVariation}
                onChange={(e) => setCostVariation(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>-20%</span>
                <span>+30%</span>
              </div>
            </div>
            <div>
              <label htmlFor="priceVariation" className="block text-sm text-gray-600 mb-1">
                {t.priceVariation}: {priceVariation >= 0 ? '+' : ''}{priceVariation}%
              </label>
              <input
                id="priceVariation"
                type="range"
                min={-20}
                max={30}
                value={priceVariation}
                onChange={(e) => setPriceVariation(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>-20%</span>
                <span>+30%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.scenarios}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  {lang === 'es' ? 'Escenario' : 'Scenario'}
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">{t.baseCost}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">{t.targetPrice}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">{t.margin}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">{t.marginPct}</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s, i) => (
                <tr key={i} className={`border-b border-gray-100 ${i === 1 ? 'bg-blue-50' : ''}`}>
                  <td className="py-3 px-4 font-medium text-gray-900">{s.name}</td>
                  <td className="py-3 px-4 text-right text-gray-700">{formatCurrency(s.cost)}</td>
                  <td className="py-3 px-4 text-right text-gray-700">{formatCurrency(s.price)}</td>
                  <td className={`py-3 px-4 text-right font-medium ${s.margin >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {formatCurrency(s.margin)}
                  </td>
                  <td className={`py-3 px-4 text-right font-medium ${s.marginPct >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {s.marginPct.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {lang === 'es' ? 'Visualización de márgenes' : 'Margin visualization'}
        </h3>
        <div className="space-y-4">
          {scenarios.map((s, i) => {
            const maxMargin = Math.max(...scenarios.map(sc => Math.abs(sc.margin)));
            const widthPct = maxMargin > 0 ? (Math.abs(s.margin) / maxMargin) * 100 : 0;
            return (
              <div key={i} className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-600 flex-shrink-0">{s.name}</span>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                  <div
                    className={`h-full rounded-lg transition-all duration-300 ${
                      s.margin >= 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.max(widthPct, 2)}%` }}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-700">
                    {formatCurrency(s.margin)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={exportCSV}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V16a2 2 0 01-2 2z" />
          </svg>
          {t.export}
        </button>
        <button
          onClick={exportPDF}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          {t.exportPdf}
        </button>
      </div>
    </div>
  );
}

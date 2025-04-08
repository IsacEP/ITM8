import React, { useState } from "react";
import Plot from "react-plotly.js";

interface CompanyData {
  name: string;
  estimatedRevenue: number;
}

interface FunnelStage {
  stage: string;
  companies: CompanyData[];
}

const getTotalRevenue = (stage: FunnelStage): number =>
  stage.companies.reduce((sum, company) => sum + company.estimatedRevenue, 0);

const SalesFunnelAnalysis: React.FC = () => {
  const funnelStages: FunnelStage[] = [
    {
      stage: "Leads",
      companies: [
        { name: "Company A", estimatedRevenue: 200 },
        { name: "Company B", estimatedRevenue: 300 },
        { name: "Company C", estimatedRevenue: 500 },
        { name: "Company D", estimatedRevenue: 250 },
        { name: "Company E", estimatedRevenue: 370 },
        { name: "Company F", estimatedRevenue: 125 },
        { name: "Company G", estimatedRevenue: 680 },
      ],
    },
    {
      stage: "Qualified Leads",
      companies: [
        { name: "Company A", estimatedRevenue: 200 },
        { name: "Company C", estimatedRevenue: 500 },
        { name: "Company D", estimatedRevenue: 250 },
        { name: "Company E", estimatedRevenue: 370 },
        { name: "Company G", estimatedRevenue: 680 },
      ],
    },
    {
      stage: "Proposal Sent",
      companies: [
        { name: "Company A", estimatedRevenue: 200 },
        { name: "Company C", estimatedRevenue: 500 },
        { name: "Company G", estimatedRevenue: 680 },
      ],
    },
    {
      stage: "Negotiation",
      companies: [
        { name: "Company A", estimatedRevenue: 200 },
        { name: "Company C", estimatedRevenue: 500 },
        { name: "Company G", estimatedRevenue: 680 },
      ],
    },
    {
      stage: "Closed Won",
      companies: [{ name: "Company C", estimatedRevenue: 500 }],
    },
  ];

  const totalRevenues = funnelStages.map(getTotalRevenue);

  const conversionRates = totalRevenues.map((rev, index) => {
    if (index === 0) return 100;
    return (rev / totalRevenues[index - 1]) * 100;
  });

  const dropOffRates = totalRevenues.map((rev, index) => {
    if (index === 0) return 0;
    return (1 - rev / totalRevenues[index - 1]) * 100;
  });

  const [selectedStage, setSelectedStage] = useState<FunnelStage | null>(null);

  const funnelData = [
    {
      type: "funnel",
      y: funnelStages.map((s) => s.stage),
      x: totalRevenues,
      textinfo: "value+percent previous",
      textposition: "inside",
      opacity: 0.65,
    },
  ];

  const handleChartClick = (event: any) => {
    if (event.points && event.points.length > 0) {
      const pointIndex = event.points[0].pointIndex;
      setSelectedStage(funnelStages[pointIndex]);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Sales Funnel Analysis
      </h1>

      {/* Conversion Table */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Conversion Rates & Drop-off Analysis
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Estimated Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conversion Rate (%)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Drop-off Rate (%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {funnelStages.map((stage, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{stage.stage}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {totalRevenues[index]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {conversionRates[index].toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {index === 0 ? "-" : dropOffRates[index].toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactive Funnel Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Funnel Chart</h2>
        <div className="w-full">
          <Plot
            data={funnelData as any}
            layout={{
              title: "Sales Funnel Chart",
              margin: { t: 50, l: 150, r: 25, b: 25 },
            }}
            style={{ width: "100%", height: "500px" }}
            useResizeHandler
            onClick={handleChartClick}
          />
        </div>
      </div>

      {/* Drill-down: List of companies for the selected stage */}
      {selectedStage && (
        <div className="bg-white p-6 rounded-lg shadow mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">
              {selectedStage.stage} - Company Details
            </h2>
            <button
              className="text-red-500 hover:text-red-700 font-bold"
              onClick={() => setSelectedStage(null)}
            >
              Close
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estimated Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedStage.companies.map((company, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {company.estimatedRevenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesFunnelAnalysis;

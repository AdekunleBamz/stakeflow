'use client';

const services = [
  { name: 'Staking', status: 'Operational' },
  { name: 'Rewards', status: 'Operational' },
  { name: 'Mint', status: 'Degraded' },
  { name: 'API', status: 'Operational' },
];

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Status</h1>
          <p className="text-gray-400 mt-2">Live system status for StakeFlow services.</p>
        </div>

        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between p-4 rounded-2xl bg-gray-900/40 border border-gray-800"
            >
              <span className="text-white font-medium">{service.name}</span>
              <span className={`text-sm ${service.status === 'Operational' ? 'text-green-400' : 'text-yellow-400'}`}>
                {service.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

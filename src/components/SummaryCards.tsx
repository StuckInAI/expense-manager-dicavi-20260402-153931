'use client'

interface SummaryCardsProps {
  totalIncome: number
  totalExpenses: number
  netSavings: number
  savingsRate: number
}

export default function SummaryCards({ totalIncome, totalExpenses, netSavings, savingsRate }: SummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const cards = [
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome),
      change: '+12.5%',
      positive: true,
      gradient: 'from-blue-500 to-cyan-500',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      ),
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      change: '-3.2%',
      positive: false,
      gradient: 'from-rose-500 to-pink-500',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
        </svg>
      ),
    },
    {
      title: 'Net Savings',
      value: formatCurrency(netSavings),
      change: `${savingsRate.toFixed(1)}% rate`,
      positive: netSavings >= 0,
      gradient: netSavings >= 0 ? 'from-emerald-500 to-teal-500' : 'from-orange-500 to-red-500',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Transactions',
      value: '20',
      change: 'This period',
      positive: true,
      gradient: 'from-violet-500 to-purple-500',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-md`}>
              {card.icon}
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              card.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              {card.change}
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">{card.title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  )
}

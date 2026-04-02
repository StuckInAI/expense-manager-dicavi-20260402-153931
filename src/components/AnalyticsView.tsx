'use client'

import { Transaction, Category } from '@/types'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface AnalyticsViewProps {
  transactions: Transaction[]
  categories: Category[]
  compact?: boolean
}

export default function AnalyticsView({ transactions, categories, compact = false }: AnalyticsViewProps) {
  const expensesByCategory = categories
    .map(cat => {
      const total = transactions
        .filter(t => t.type === 'expense' && t.category === cat.id)
        .reduce((sum, t) => sum + t.amount, 0)
      return { name: cat.name, value: total, color: cat.color, icon: cat.icon }
    })
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value)

  const getLast6Months = () => {
    const months = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date()
      d.setMonth(d.getMonth() - i)
      const monthKey = d.toISOString().slice(0, 7)
      const monthName = d.toLocaleDateString('en-US', { month: 'short' })
      const income = transactions
        .filter(t => t.type === 'income' && t.date.startsWith(monthKey))
        .reduce((sum, t) => sum + t.amount, 0)
      const expenses = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(monthKey))
        .reduce((sum, t) => sum + t.amount, 0)
      months.push({ month: monthName, income, expenses })
    }
    return months
  }

  const monthlyData = getLast6Months()

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

  if (compact) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Spending by Category</h3>
        {expensesByCategory.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">No expense data available</p>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {expensesByCategory.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-600 truncate max-w-[100px]">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Spending by Category</h3>
          {expensesByCategory.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No expense data available</p>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 mt-4">
                {expensesByCategory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-700">{item.icon} {item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            backgroundColor: item.color,
                            width: `${(item.value / expensesByCategory[0].value) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-20 text-right">{formatCurrency(item.value)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

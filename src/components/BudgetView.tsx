'use client'

import { Transaction, Category } from '@/types'

interface BudgetViewProps {
  transactions: Transaction[]
  categories: Category[]
}

export default function BudgetView({ transactions, categories }: BudgetViewProps) {
  const categoriesWithBudget = categories.filter(c => c.budget)

  const getSpentAmount = (categoryId: string) => {
    return transactions
      .filter(t => t.type === 'expense' && t.category === categoryId)
      .reduce((sum, t) => sum + t.amount, 0)
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)

  const totalBudget = categoriesWithBudget.reduce((sum, c) => sum + (c.budget || 0), 0)
  const totalSpent = categoriesWithBudget.reduce((sum, c) => sum + getSpentAmount(c.id), 0)
  const overallPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Overall Budget</h3>
        <p className="text-sm text-gray-500 mb-4">Total spending vs total budget allocation</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Total Spent</span>
          <div className="text-right">
            <span className="text-sm font-bold text-gray-900">{formatCurrency(totalSpent)}</span>
            <span className="text-sm text-gray-500"> / {formatCurrency(totalBudget)}</span>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4 mb-2">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${
              overallPercentage >= 100 ? 'bg-red-500' :
              overallPercentage >= 80 ? 'bg-orange-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(overallPercentage, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">{overallPercentage.toFixed(1)}% of total budget used</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoriesWithBudget.map(category => {
          const spent = getSpentAmount(category.id)
          const budget = category.budget || 0
          const percentage = budget > 0 ? (spent / budget) * 100 : 0
          const remaining = budget - spent
          const isOverBudget = spent > budget
          const isWarning = percentage >= 80 && !isOverBudget

          return (
            <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{category.name}</p>
                    <p className="text-xs text-gray-500">Budget: {formatCurrency(budget)}</p>
                  </div>
                </div>
                <div className="text-right">
                  {isOverBudget ? (
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">Over Budget!</span>
                  ) : isWarning ? (
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Warning</span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">On Track</span>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    isOverBudget ? 'bg-red-500' : isWarning ? 'bg-orange-500' : 'bg-emerald-500'
                  }`}
                  style={{
                    backgroundColor: isOverBudget ? '#ef4444' : isWarning ? '#f97316' : category.color,
                    width: `${Math.min(percentage, 100)}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Spent: <span className="font-semibold text-gray-900">{formatCurrency(spent)}</span></span>
                <span>
                  {isOverBudget
                    ? <span className="text-red-600 font-semibold">Over by {formatCurrency(Math.abs(remaining))}</span>
                    : <span>Remaining: <span className="font-semibold text-gray-900">{formatCurrency(remaining)}</span></span>
                  }
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

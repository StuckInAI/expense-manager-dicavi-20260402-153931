'use client'

import { Transaction, Category } from '@/types'
import SummaryCards from './SummaryCards'
import TransactionList from './TransactionList'
import AnalyticsView from './AnalyticsView'
import BudgetView from './BudgetView'

interface DashboardProps {
  transactions: Transaction[]
  categories: Category[]
  activeView: string
  onEdit: (transaction: Transaction) => void
  onDelete: (id: string) => void
  onAddExpense: () => void
}

export default function Dashboard({
  transactions,
  categories,
  activeView,
  onEdit,
  onDelete,
  onAddExpense,
}: DashboardProps) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const netSavings = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0

  if (activeView === 'transactions') {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
          <p className="text-gray-500 text-sm mt-1">Manage all your income and expenses</p>
        </div>
        <TransactionList
          transactions={transactions}
          categories={categories}
          onEdit={onEdit}
          onDelete={onDelete}
          showAll
        />
      </div>
    )
  }

  if (activeView === 'analytics') {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-500 text-sm mt-1">Visualize your spending patterns</p>
        </div>
        <AnalyticsView transactions={transactions} categories={categories} />
      </div>
    )
  }

  if (activeView === 'budget') {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Budget</h2>
          <p className="text-gray-500 text-sm mt-1">Track your spending against budget limits</p>
        </div>
        <BudgetView transactions={transactions} categories={categories} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's your financial overview.</p>
      </div>
      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        netSavings={netSavings}
        savingsRate={savingsRate}
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TransactionList
            transactions={transactions.slice(0, 8)}
            categories={categories}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddExpense={onAddExpense}
          />
        </div>
        <div>
          <AnalyticsView transactions={transactions} categories={categories} compact />
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Transaction, Category } from '@/types'

interface TransactionListProps {
  transactions: Transaction[]
  categories: Category[]
  onEdit: (transaction: Transaction) => void
  onDelete: (id: string) => void
  showAll?: boolean
  onAddExpense?: () => void
}

export default function TransactionList({
  transactions,
  categories,
  onEdit,
  onDelete,
  showAll = false,
  onAddExpense,
}: TransactionListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(c => c.id === categoryId) || {
      name: 'Unknown',
      color: '#94a3b8',
      icon: '📦',
    }
  }

  const filteredTransactions = transactions
    .filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'all' || t.type === filterType
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime()
      return b.amount - a.amount
    })

  const handleDeleteClick = (id: string) => {
    if (confirmDelete === id) {
      onDelete(id)
      setConfirmDelete(null)
    } else {
      setConfirmDelete(id)
      setTimeout(() => setConfirmDelete(null), 3000)
    }
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            {showAll ? 'All Transactions' : 'Recent Transactions'}
          </h3>
          {onAddExpense && (
            <button
              onClick={onAddExpense}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              + Add New
            </button>
          )}
        </div>
        {showAll && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'date' | 'amount')}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
        )}
      </div>
      <div className="divide-y divide-gray-50">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No transactions found</p>
            <p className="text-gray-400 text-sm mt-1">Add your first transaction to get started</p>
          </div>
        ) : (
          filteredTransactions.map(transaction => {
            const category = getCategoryInfo(transaction.category)
            return (
              <div key={transaction.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors group">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{transaction.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {category.name} • {formatDate(transaction.date)}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`font-bold text-sm ${
                    transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    transaction.type === 'income'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}>
                    {transaction.type}
                  </span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(transaction.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      confirmDelete === transaction.id
                        ? 'text-white bg-rose-500'
                        : 'text-gray-400 hover:text-rose-600 hover:bg-rose-50'
                    }`}
                    title={confirmDelete === transaction.id ? 'Click again to confirm' : 'Delete'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

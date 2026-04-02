'use client'

import { useState, useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import AddExpenseModal from '@/components/AddExpenseModal'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Transaction, Category } from '@/types'
import { defaultCategories, sampleTransactions } from '@/data/sampleData'

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories] = useState<Category[]>(defaultCategories)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeView, setActiveView] = useState<'dashboard' | 'transactions' | 'analytics' | 'budget'>('dashboard')
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('spendtrack-transactions')
    if (stored) {
      setTransactions(JSON.parse(stored))
    } else {
      setTransactions(sampleTransactions)
      localStorage.setItem('spendtrack-transactions', JSON.stringify(sampleTransactions))
    }
  }, [])

  const saveTransactions = (updated: Transaction[]) => {
    setTransactions(updated)
    localStorage.setItem('spendtrack-transactions', JSON.stringify(updated))
  }

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    }
    const updated = [newTransaction, ...transactions]
    saveTransactions(updated)
  }

  const updateTransaction = (updated: Transaction) => {
    const newList = transactions.map(t => t.id === updated.id ? updated : t)
    saveTransactions(newList)
  }

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter(t => t.id !== id)
    saveTransactions(updated)
  }

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  const handleModalSubmit = (data: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      updateTransaction({ ...data, id: editingTransaction.id })
    } else {
      addTransaction(data)
    }
    handleModalClose()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          onAddExpense={() => setIsModalOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <Dashboard
            transactions={transactions}
            categories={categories}
            activeView={activeView}
            onEdit={handleEdit}
            onDelete={deleteTransaction}
            onAddExpense={() => setIsModalOpen(true)}
          />
        </main>
      </div>
      {isModalOpen && (
        <AddExpenseModal
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          categories={categories}
          editingTransaction={editingTransaction}
        />
      )}
    </div>
  )
}

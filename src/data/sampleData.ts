import { Transaction, Category } from '@/types'

export const defaultCategories: Category[] = [
  { id: 'food', name: 'Food & Dining', color: '#f97316', icon: '🍔', budget: 500 },
  { id: 'transport', name: 'Transportation', color: '#3b82f6', icon: '🚗', budget: 200 },
  { id: 'entertainment', name: 'Entertainment', color: '#8b5cf6', icon: '🎬', budget: 150 },
  { id: 'shopping', name: 'Shopping', color: '#ec4899', icon: '🛍️', budget: 300 },
  { id: 'health', name: 'Health & Fitness', color: '#10b981', icon: '💊', budget: 100 },
  { id: 'utilities', name: 'Utilities', color: '#6366f1', icon: '💡', budget: 200 },
  { id: 'rent', name: 'Rent & Housing', color: '#ef4444', icon: '🏠', budget: 1500 },
  { id: 'salary', name: 'Salary', color: '#22c55e', icon: '💼' },
  { id: 'freelance', name: 'Freelance', color: '#14b8a6', icon: '💻' },
  { id: 'investment', name: 'Investment', color: '#f59e0b', icon: '📈' },
  { id: 'other', name: 'Other', color: '#94a3b8', icon: '📦' },
]

const today = new Date()
const formatDate = (daysAgo: number) => {
  const d = new Date(today)
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString().split('T')[0]
}

export const sampleTransactions: Transaction[] = [
  { id: '1', title: 'Monthly Salary', amount: 5000, type: 'income', category: 'salary', date: formatDate(1), notes: 'Regular monthly salary' },
  { id: '2', title: 'Freelance Project', amount: 800, type: 'income', category: 'freelance', date: formatDate(3) },
  { id: '3', title: 'Grocery Shopping', amount: 120.50, type: 'expense', category: 'food', date: formatDate(2) },
  { id: '4', title: 'Netflix Subscription', amount: 15.99, type: 'expense', category: 'entertainment', date: formatDate(5) },
  { id: '5', title: 'Uber Ride', amount: 24.50, type: 'expense', category: 'transport', date: formatDate(4) },
  { id: '6', title: 'Electric Bill', amount: 85.00, type: 'expense', category: 'utilities', date: formatDate(7) },
  { id: '7', title: 'Gym Membership', amount: 45.00, type: 'expense', category: 'health', date: formatDate(10) },
  { id: '8', title: 'Amazon Purchase', amount: 67.30, type: 'expense', category: 'shopping', date: formatDate(6) },
  { id: '9', title: 'Restaurant Dinner', amount: 89.00, type: 'expense', category: 'food', date: formatDate(8) },
  { id: '10', title: 'Rent Payment', amount: 1200.00, type: 'expense', category: 'rent', date: formatDate(1) },
  { id: '11', title: 'Stock Dividend', amount: 250.00, type: 'income', category: 'investment', date: formatDate(12) },
  { id: '12', title: 'Coffee Shop', amount: 18.50, type: 'expense', category: 'food', date: formatDate(3) },
  { id: '13', title: 'Phone Bill', amount: 55.00, type: 'expense', category: 'utilities', date: formatDate(15) },
  { id: '14', title: 'New Shoes', amount: 120.00, type: 'expense', category: 'shopping', date: formatDate(9) },
  { id: '15', title: 'Doctor Visit', amount: 40.00, type: 'expense', category: 'health', date: formatDate(14) },
  { id: '16', title: 'Gas Station', amount: 55.00, type: 'expense', category: 'transport', date: formatDate(11) },
  { id: '17', title: 'Movie Tickets', amount: 32.00, type: 'expense', category: 'entertainment', date: formatDate(13) },
  { id: '18', title: 'Bonus Payment', amount: 1000.00, type: 'income', category: 'salary', date: formatDate(16) },
  { id: '19', title: 'Internet Bill', amount: 60.00, type: 'expense', category: 'utilities', date: formatDate(20) },
  { id: '20', title: 'Lunch at Work', amount: 12.50, type: 'expense', category: 'food', date: formatDate(5) },
]

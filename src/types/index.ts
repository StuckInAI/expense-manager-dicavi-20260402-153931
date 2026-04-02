export interface Transaction {
  id: string
  title: string
  amount: number
  type: 'expense' | 'income'
  category: string
  date: string
  notes?: string
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
  budget?: number
}

export interface BudgetSummary {
  totalIncome: number
  totalExpenses: number
  netSavings: number
  savingsRate: number
}

export interface MonthlyData {
  month: string
  income: number
  expenses: number
  savings: number
}

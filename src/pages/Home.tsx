import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { db } from '../db';

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: '', amount: '', comment: '' });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const dbInstance = await db;
    const income = await dbInstance.get('settings', 'income') || 0;
    const bills = await dbInstance.getAll('bills') || [];
    const emis = await dbInstance.getAll('emis') || [];
    const expenses = await dbInstance.getAll('expenses') || [];
    
    const totalBills = bills.reduce((acc, bill) => acc + Number(bill.amount), 0);
    const totalEmis = emis.reduce((acc, emi) => acc + Number(emi.amount), 0);
    const totalExpenses = expenses.reduce((acc, exp) => acc + Number(exp.amount), 0);
    
    setBalance(income - (totalBills + totalEmis + totalExpenses));
    setChartData([
      { name: 'EMIs', amount: totalEmis },
      { name: 'Bills', amount: totalBills },
      { name: 'Expenses', amount: totalExpenses }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dbInstance = await db;
    await dbInstance.add('expenses', {
      ...newExpense,
      amount: Number(newExpense.amount),
      date: new Date().toISOString()
    });
    setNewExpense({ name: '', amount: '', comment: '' });
    loadData();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">Balance</h2>
        <p className="text-6xl font-bold mt-4 text-green-600">₹{balance.toFixed(2)}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Add New Expense</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Expense Name</label>
            <input
              type="text"
              required
              value={newExpense.name}
              onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              required
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Comment</label>
            <textarea
              value={newExpense.comment}
              onChange={(e) => setNewExpense({ ...newExpense, comment: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Expense
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Expense Overview</h3>
        <div className="w-full overflow-x-auto">
          <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#4F46E5" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
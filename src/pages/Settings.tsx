import React, { useState, useEffect } from 'react';
import { db } from '../db';

export default function Settings() {
  const [income, setIncome] = useState('');
  const [emi, setEmi] = useState({ name: '', amount: '' });
  const [bill, setBill] = useState({ name: '', amount: '' });
  const [emis, setEmis] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const dbInstance = await db;
    const savedIncome = await dbInstance.get('settings', 'income');
    const savedEmis = await dbInstance.getAll('emis');
    const savedBills = await dbInstance.getAll('bills');
    
    setIncome(savedIncome || '');
    setEmis(savedEmis || []);
    setBills(savedBills || []);
  };

  const updateIncome = async (e) => {
    e.preventDefault();
    const dbInstance = await db;
    await dbInstance.put('settings', Number(income), 'income');
  };

  const addEmi = async (e) => {
    e.preventDefault();
    const dbInstance = await db;
    await dbInstance.add('emis', { ...emi, amount: Number(emi.amount) });
    setEmi({ name: '', amount: '' });
    loadData();
  };

  const addBill = async (e) => {
    e.preventDefault();
    const dbInstance = await db;
    await dbInstance.add('bills', { ...bill, amount: Number(bill.amount) });
    setBill({ name: '', amount: '' });
    loadData();
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Income Settings</h2>
        <form onSubmit={updateIncome} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Income</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Update Income
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">EMI Settings</h2>
        <form onSubmit={addEmi} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">EMI Name</label>
            <input
              type="text"
              value={emi.name}
              onChange={(e) => setEmi({ ...emi, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={emi.amount}
              onChange={(e) => setEmi({ ...emi, amount: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add EMI
          </button>
        </form>

        <div className="mt-4">
          <h3 className="text-lg font-medium">Current EMIs</h3>
          <ul className="mt-2 space-y-2">
            {emis.map((emi) => (
              <li key={emi.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                <span>{emi.name}</span>
                <span>₹{emi.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Bills Settings</h2>
        <form onSubmit={addBill} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Bill Name</label>
            <input
              type="text"
              value={bill.name}
              onChange={(e) => setBill({ ...bill, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={bill.amount}
              onChange={(e) => setBill({ ...bill, amount: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Bill
          </button>
        </form>

        <div className="mt-4">
          <h3 className="text-lg font-medium">Current Bills</h3>
          <ul className="mt-2 space-y-2">
            {bills.map((bill) => (
              <li key={bill.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                <span>{bill.name}</span>
                <span>₹{bill.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
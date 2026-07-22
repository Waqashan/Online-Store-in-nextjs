"use client";

import React, { useState } from "react";
import { Users } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockCustomers } from "@/data/adminMockData";

export default function AdminCustomersPage() {
  const [customersList] = useState(mockCustomers);

  return (
    <AdminLayout>
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
        <div className="border-b border-neutral-100 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-full border border-amber-200 mb-2">
            <Users className="w-3.5 h-3.5" /> Patron Concierge Directory
          </div>
          <h1 className="font-heading text-2xl font-bold text-neutral-900">VIP Registered Customers</h1>
          <p className="text-xs text-neutral-500">Manage VIP members, contact history, and total spending.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100 text-neutral-800 uppercase font-heading text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5">Customer Name</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Membership Tier</th>
                <th className="p-3.5">Total Orders</th>
                <th className="p-3.5">Total Spent</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {customersList.map((cust) => (
                <tr key={cust.id} className="hover:bg-neutral-50 transition">
                  <td className="p-3.5 font-bold text-neutral-900">{cust.name}</td>
                  <td className="p-3.5">
                    <div>{cust.email}</div>
                    <div className="text-[10px] text-neutral-400">{cust.phone}</div>
                  </td>
                  <td className="p-3.5 font-bold text-amber-800">{cust.role}</td>
                  <td className="p-3.5 font-bold text-neutral-900">{cust.ordersCount} orders</td>
                  <td className="p-3.5 font-bold text-amber-800">${cust.totalSpent.toFixed(2)}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded text-[10px]">
                      {cust.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

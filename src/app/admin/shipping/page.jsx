"use client";

import React, { useState } from "react";
import { Truck, Percent } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockShippingRates, mockTaxes } from "@/data/adminMockData";

export default function AdminShippingPage() {
  const [shippingList] = useState(mockShippingRates);
  const [taxesList] = useState(mockTaxes);

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Shipping Zones */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-full border border-amber-200 mb-2">
              <Truck className="w-3.5 h-3.5" /> Logistics & Courier Configuration
            </div>
            <h1 className="font-heading text-2xl font-bold text-neutral-900">Shipping Zones & Rates</h1>
            <p className="text-xs text-neutral-500">Configure courier partners, express rates, and free shipping thresholds.</p>
          </div>

          <div className="space-y-3">
            {shippingList.map((ship) => (
              <div key={ship.id} className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">{ship.zone}</h4>
                  <p className="text-xs text-neutral-500">{ship.carrier} &bull; Est. {ship.estimatedDays}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-amber-800 text-sm">${ship.rate.toFixed(2)}</span>
                  <span className="text-[10px] text-neutral-400 block">Free over ${ship.freeShippingThreshold}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Taxes */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-full border border-amber-200 mb-2">
              <Percent className="w-3.5 h-3.5" /> Regional GST & VAT Rules
            </div>
            <h2 className="font-heading text-2xl font-bold text-neutral-900">Tax Rates & GST Rules</h2>
            <p className="text-xs text-neutral-500">Manage regional sales taxes and VAT percentages.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {taxesList.map((tax) => (
              <div key={tax.id} className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl">
                <h4 className="font-bold text-neutral-900 text-sm">{tax.region}</h4>
                <div className="font-heading text-2xl font-bold text-amber-800 mt-1">{tax.ratePercentage}%</div>
                <span className="text-[10px] text-neutral-500">{tax.applyToShipping ? "Applies to shipping" : "Products only"}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

"use client";

import React, { useState } from "react";
import { FileText, BookOpen } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockPages, mockBlogs } from "@/data/adminMockData";

export default function AdminPagesPage() {
  const [pagesList] = useState(mockPages);
  const [blogsList] = useState(mockBlogs);

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* CMS Pages */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-full border border-amber-200 mb-2">
              <FileText className="w-3.5 h-3.5" /> Static CMS Page Manager
            </div>
            <h1 className="font-heading text-2xl font-bold text-neutral-900">Custom Store Pages</h1>
            <p className="text-xs text-neutral-500">Manage legal, guarantee, and story pages.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pagesList.map((pg) => (
              <div key={pg.id} className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl">
                <h4 className="font-bold text-neutral-900 text-sm">{pg.title}</h4>
                <span className="font-mono text-xs text-amber-800 block mt-1">/{pg.slug}</span>
                <span className="text-[10px] text-neutral-400 block mt-2">Last Updated: {pg.lastUpdated}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Articles */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-full border border-amber-200 mb-2">
              <BookOpen className="w-3.5 h-3.5" /> Journal & Heritage Articles
            </div>
            <h2 className="font-heading text-2xl font-bold text-neutral-900">Blog Posts & Journals</h2>
            <p className="text-xs text-neutral-500">Publish organic wellness tips and perfume selection guides.</p>
          </div>

          <div className="space-y-4">
            {blogsList.map((bl) => (
              <div key={bl.id} className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center gap-4">
                <img src={bl.image} alt={bl.title} className="w-20 h-20 rounded-xl object-cover border border-neutral-200" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-800">{bl.category}</span>
                  <h4 className="font-bold text-neutral-900 text-sm">{bl.title}</h4>
                  <span className="text-[10px] text-neutral-500">By {bl.author} &bull; {bl.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

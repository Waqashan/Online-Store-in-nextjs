"use client";

import React, { useState, useEffect } from "react";
import { Layers, Plus, Trash2, Edit, CheckCircle2, X } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getCategories } from "@/services/dataService";

export default function AdminCategoriesPage() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Add Category form state
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [newCatImage, setNewCatImage] = useState("");
  const [newCatSubs, setNewCatSubs] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setCategoriesList(getCategories());
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName) return;

    const newSlug = newCatName.toLowerCase().replace(/\s+/g, "-");
    const subList = newCatSubs.split(",").map(s => s.trim()).filter(Boolean).map((subName, index) => ({
      id: `sub-${Date.now()}-${index}`,
      slug: subName.toLowerCase().replace(/\s+/g, "-"),
      name: subName,
      productCount: 0
    }));

    const newCat = {
      id: `cat-${Date.now()}`,
      slug: newSlug,
      name: newCatName,
      description: newCatDesc || "Dynamic category created via admin panel",
      image: newCatImage || "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      displayOrder: categoriesList.length + 1,
      subcategories: subList,
    };

    setCategoriesList([...categoriesList, newCat]);
    setNewCatName("");
    setNewCatDesc("");
    setNewCatImage("");
    setNewCatSubs("");
    setShowModal(false);
    triggerToast(`Category '${newCat.name}' created!`);
  };

  const handleEditCategorySubmit = (e) => {
    e.preventDefault();
    if (!editingCategory.name) return;

    setCategoriesList(categoriesList.map(c => c.id === editingCategory.id ? {
      ...c,
      name: editingCategory.name,
      description: editingCategory.description,
      image: editingCategory.image || "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      displayOrder: Number(editingCategory.displayOrder || c.displayOrder),
      subcategories: editingCategory.subcategories || []
    } : c));

    setEditingCategory(null);
    triggerToast("Category changes saved successfully!");
  };

  const handleAddSubcategory = (catId, subName) => {
    const updated = categoriesList.map((c) => {
      if (c.id === catId) {
        const subcategories = c.subcategories || [];
        const newSub = {
          id: `sub-${Date.now()}`,
          slug: subName.toLowerCase().replace(/\s+/g, "-"),
          name: subName,
          productCount: 0
        };
        return { ...c, subcategories: [...subcategories, newSub] };
      }
      return c;
    });
    setCategoriesList(updated);
    triggerToast(`Subcategory '${subName}' added successfully!`);
  };

  const handleDeleteSubcategory = (catId, subId) => {
    const updated = categoriesList.map((c) => {
      if (c.id === catId) {
        const subcategories = (c.subcategories || []).filter((sub) => sub.id !== subId);
        return { ...c, subcategories };
      }
      return c;
    });
    setCategoriesList(updated);
    triggerToast("Subcategory deleted successfully!");
  };

  const handleDeleteCategory = (id) => {
    setCategoriesList(categoriesList.filter((c) => c.id !== id));
    triggerToast("Category deleted successfully!");
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-4 bg-emerald-600 text-white font-bold text-xs rounded-2xl flex items-center justify-between shadow-xl animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage("")}><X className="w-4 h-4" /></button>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-full border border-amber-200 mb-2">
                <Layers className="w-3.5 h-3.5" /> Dynamic Taxonomy Engine
              </div>
              <h1 className="font-heading text-2xl font-bold text-neutral-900">Categories & Subcategories Builder</h1>
              <p className="text-xs text-neutral-500">Create, reorder, edit, or delete store categories without code changes.</p>
            </div>

            <button 
              onClick={() => setShowModal(true)}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 hover:brightness-110 transition"
            >
              <Plus className="w-4 h-4" /> Add New Category
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <input 
              type="text"
              placeholder="Search categories by name, slug, description, or subcategory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs text-neutral-900 font-semibold focus:outline-none focus:border-amber-600 focus:bg-white transition"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 text-neutral-800 uppercase font-heading text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Category Name</th>
                  <th className="p-3.5">Slug</th>
                  <th className="p-3.5">Subcategories (Delete/Add Inline)</th>
                  <th className="p-3.5">Display Order</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {(() => {
                  const filtered = categoriesList.filter(cat => {
                    const q = searchQuery.toLowerCase();
                    return (
                      cat.name.toLowerCase().includes(q) ||
                      cat.slug.toLowerCase().includes(q) ||
                      (cat.description && cat.description.toLowerCase().includes(q)) ||
                      (cat.subcategories && cat.subcategories.some(sub => sub.name.toLowerCase().includes(q)))
                    );
                  });
                  if (filtered.length === 0) {
                    return (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-neutral-400 italic">
                          No matching categories found.
                        </td>
                      </tr>
                    );
                  }
                  return filtered.map((cat) => (
                    <tr key={cat.id} className="hover:bg-neutral-50 transition">
                      <td className="p-3.5 font-bold text-neutral-900 flex items-center gap-3">
                        <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-xl object-cover border border-neutral-200 bg-white" />
                        <div>
                          <div>{cat.name}</div>
                          <div className="text-[10px] text-neutral-500 font-normal">{cat.description}</div>
                        </div>
                      </td>
                      <td className="p-3.5 font-mono text-amber-800 font-bold">{cat.slug}</td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {cat.subcategories && cat.subcategories.map((sub) => (
                            <span key={sub.id} className="px-2 py-0.5 bg-neutral-50 border border-neutral-200 text-[10px] rounded font-semibold text-neutral-800 flex items-center gap-1">
                              {sub.name}
                              <button 
                                onClick={() => handleDeleteSubcategory(cat.id, sub.id)}
                                className="text-neutral-400 hover:text-rose-600 font-bold ml-0.5 text-xs"
                                title="Delete Subcategory"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                          
                          {/* Quick inline subcategory input */}
                          <form 
                            onSubmit={(e) => {
                              e.preventDefault();
                              const subName = e.target.subName.value.trim();
                              if (subName) {
                                handleAddSubcategory(cat.id, subName);
                                e.target.reset();
                              }
                            }}
                            className="flex items-center"
                          >
                            <input 
                              name="subName"
                              type="text" 
                              placeholder="+ Add Sub"
                              className="bg-neutral-50 border border-neutral-300 rounded px-2 py-0.5 text-[10px] font-semibold w-20 focus:outline-none focus:border-amber-500 text-neutral-900"
                            />
                          </form>
                        </div>
                      </td>
                      <td className="p-3.5 font-bold text-neutral-900">{cat.displayOrder}</td>
                      <td className="p-3.5 text-right space-x-1">
                        <button 
                          onClick={() => setEditingCategory({ ...cat })}
                          className="p-1.5 text-neutral-400 hover:text-amber-600 transition"
                          title="Edit Category"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 transition"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
            <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 max-w-md w-full z-10 space-y-4 shadow-2xl">
              <h3 className="font-heading text-xl font-bold text-neutral-900">Add New Category</h3>
              <form onSubmit={handleAddCategory} className="space-y-4 text-xs font-semibold text-neutral-800">
                <div>
                  <label className="text-neutral-700 block mb-1">Category Title *</label>
                  <input 
                    type="text" required placeholder="e.g. Gourmet Spices"
                    value={newCatName} onChange={(e) => setNewCatName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="text-neutral-700 block mb-1">Description</label>
                  <textarea 
                    rows="2" placeholder="Luxury collection description..."
                    value={newCatDesc} onChange={(e) => setNewCatDesc(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="text-neutral-700 block mb-1">Category Image URL</label>
                  <input 
                    type="text" placeholder="https://unsplash.com/photo..."
                    value={newCatImage} onChange={(e) => setNewCatImage(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none focus:border-amber-600 font-semibold"
                  />
                  {newCatImage && (
                    <div className="mt-2 w-12 h-12 border border-neutral-200 rounded-xl overflow-hidden">
                      <img src={newCatImage} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-neutral-700 block mb-1">Subcategories (Comma separated, e.g. Honey, Ghee)</label>
                  <input 
                    type="text" placeholder="e.g. Honey, Oils, Ghee"
                    value={newCatSubs} onChange={(e) => setNewCatSubs(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-neutral-100 rounded-xl text-xs font-bold text-neutral-600">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 bg-amber-500 rounded-xl text-xs font-bold text-neutral-950">Save Category</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingCategory && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
            <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setEditingCategory(null)} />
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 max-w-md w-full z-10 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="font-heading text-xl font-bold text-neutral-900">Edit Category Details</h3>
              <form onSubmit={handleEditCategorySubmit} className="space-y-4 text-xs font-semibold text-neutral-800">
                <div>
                  <label className="text-neutral-700 block mb-1">Category Title *</label>
                  <input 
                    type="text" required
                    value={editingCategory.name} onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-700 block mb-1">Description</label>
                  <textarea 
                    rows="2"
                    value={editingCategory.description} onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-700 block mb-1">Category Image URL</label>
                  <input 
                    type="text"
                    value={editingCategory.image} onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                  />
                  {editingCategory.image && (
                    <div className="mt-2 w-14 h-14 border border-neutral-300 rounded-xl overflow-hidden bg-white">
                      <img src={editingCategory.image} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-neutral-700 block mb-1">Display Order</label>
                  <input 
                    type="number"
                    value={editingCategory.displayOrder} onChange={(e) => setEditingCategory({ ...editingCategory, displayOrder: Number(e.target.value) })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                  />
                </div>

                {/* Subcategories editor */}
                <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-2xl space-y-3">
                  <h4 className="font-bold text-amber-800 uppercase tracking-widest block border-b border-neutral-200 pb-1.5">
                    Subcategories List
                  </h4>
                  {(editingCategory.subcategories || []).length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {editingCategory.subcategories.map((sub, idx) => (
                        <span key={sub.id || idx} className="px-2.5 py-1 bg-white border border-neutral-200 text-[10px] rounded-lg font-bold text-neutral-800 flex items-center gap-1.5">
                          {sub.name}
                          <button 
                            type="button"
                            onClick={() => {
                              const filtered = editingCategory.subcategories.filter((_, i) => i !== idx);
                              setEditingCategory({ ...editingCategory, subcategories: filtered });
                            }}
                            className="text-rose-500 font-bold text-xs"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-neutral-500 italic">No subcategories defined.</p>
                  )}
                  
                  {/* Form to add subcategory directly inside Edit Modal */}
                  <div className="flex gap-2">
                    <input 
                      type="text" id="modal-sub-input" placeholder="e.g. New Sub"
                      className="flex-1 bg-white border border-neutral-200 rounded-xl p-2 text-xs focus:outline-none text-neutral-950 font-semibold"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const val = e.target.value.trim();
                          if (val) {
                            const newSub = {
                              id: `sub-${Date.now()}`,
                              slug: val.toLowerCase().replace(/\s+/g, "-"),
                              name: val,
                              productCount: 0
                            };
                            setEditingCategory(prev => ({
                              ...prev,
                              subcategories: [...(prev.subcategories || []), newSub]
                            }));
                            e.target.value = "";
                          }
                        }
                      }}
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        const input = document.getElementById("modal-sub-input");
                        const val = input.value.trim();
                        if (val) {
                          const newSub = {
                            id: `sub-${Date.now()}`,
                            slug: val.toLowerCase().replace(/\s+/g, "-"),
                            name: val,
                            productCount: 0
                          };
                          setEditingCategory(prev => ({
                            ...prev,
                            subcategories: [...(prev.subcategories || []), newSub]
                          }));
                          input.value = "";
                        }
                      }}
                      className="px-3 bg-amber-500 text-neutral-950 font-bold rounded-xl text-[10px]"
                    >
                      + Add
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setEditingCategory(null)} className="flex-1 py-2.5 bg-neutral-100 rounded-xl text-xs font-bold text-neutral-600">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 bg-amber-500 rounded-xl text-xs font-bold text-neutral-950">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}

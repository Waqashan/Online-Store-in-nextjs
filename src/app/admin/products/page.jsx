"use client";

import React, { useState, useEffect } from "react";
import { Package, Plus, Trash2, Edit, CheckCircle2, X, Image as ImageIcon, Sparkles, Sliders, Settings } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getProducts, getCategories } from "@/services/dataService";

export default function AdminProductsPage() {
  const [productsList, setProductsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Add Product Form State
  const [form, setForm] = useState({
    name: "",
    shortDescription: "",
    description: "",
    metaTitle: "",
    price: "",
    originalPrice: "",
    categorySlug: "",
    subcategorySlug: "",
    stock: 25,
    sku: "",
    imageUrls: "",
    colors: "",
    variants: [], // Array of { name: "", price: "", sku: "" }
    bulkOffersList: [] // Array of { id, label, quantity, discount }
  });

  useEffect(() => {
    setProductsList(getProducts());
    const cats = getCategories();
    setCategories(cats);
    if (cats.length > 0) {
      setForm(prev => ({ 
        ...prev, 
        categorySlug: cats[0].slug,
        subcategorySlug: cats[0].subcategories && cats[0].subcategories.length > 0 ? cats[0].subcategories[0].slug : ""
      }));
    }
  }, []);

  const handleCategoryChange = (val, isEdit = false) => {
    const selectedCat = categories.find(c => c.slug === val);
    const subSlug = selectedCat && selectedCat.subcategories && selectedCat.subcategories.length > 0 
      ? selectedCat.subcategories[0].slug 
      : "";

    if (isEdit) {
      setEditingProduct(prev => ({
        ...prev,
        categorySlug: val,
        subcategorySlug: subSlug
      }));
    } else {
      setForm(prev => ({
        ...prev,
        categorySlug: val,
        subcategorySlug: subSlug
      }));
    }
  };

  // Variants handlers
  const handleAddVariant = (isEdit = false) => {
    const newVar = { id: `var-${Date.now()}`, name: "", price: "", sku: "" };
    if (isEdit) {
      setEditingProduct(prev => ({
        ...prev,
        variants: [...(prev.variants || []), newVar]
      }));
    } else {
      setForm(prev => ({
        ...prev,
        variants: [...prev.variants, newVar]
      }));
    }
  };

  const handleRemoveVariant = (idx, isEdit = false) => {
    if (isEdit) {
      setEditingProduct(prev => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== idx)
      }));
    } else {
      setForm(prev => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== idx)
      }));
    }
  };

  const handleVariantChange = (idx, field, value, isEdit = false) => {
    if (isEdit) {
      const updated = [...(editingProduct.variants || [])];
      updated[idx] = { ...updated[idx], [field]: value };
      setEditingProduct(prev => ({ ...prev, variants: updated }));
    } else {
      const updated = [...form.variants];
      updated[idx] = { ...updated[idx], [field]: value };
      setForm(prev => ({ ...prev, variants: updated }));
    }
  };

  // Bulk Offers List handlers
  const handleAddBulkOffer = (isEdit = false) => {
    const newOffer = { id: `bo-${Date.now()}`, label: "Buy 2", quantity: 2, discount: 80 };
    if (isEdit) {
      setEditingProduct(prev => ({
        ...prev,
        bulkOffersList: [...(prev.bulkOffersList || []), newOffer]
      }));
    } else {
      setForm(prev => ({
        ...prev,
        bulkOffersList: [...(prev.bulkOffersList || []), newOffer]
      }));
    }
  };

  const handleRemoveBulkOffer = (idx, isEdit = false) => {
    if (isEdit) {
      setEditingProduct(prev => ({
        ...prev,
        bulkOffersList: prev.bulkOffersList.filter((_, i) => i !== idx)
      }));
    } else {
      setForm(prev => ({
        ...prev,
        bulkOffersList: prev.bulkOffersList.filter((_, i) => i !== idx)
      }));
    }
  };

  const handleBulkOfferChange = (idx, field, value, isEdit = false) => {
    if (isEdit) {
      const updated = [...(editingProduct.bulkOffersList || [])];
      updated[idx] = { ...updated[idx], [field]: value };
      setEditingProduct(prev => ({ ...prev, bulkOffersList: updated }));
    } else {
      const updated = [...(form.bulkOffersList || [])];
      updated[idx] = { ...updated[idx], [field]: value };
      setForm(prev => ({ ...prev, bulkOffersList: updated }));
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    const imgs = form.imageUrls.split(",").map(url => url.trim()).filter(Boolean);
    const cols = form.colors.split(",").map(c => c.trim()).filter(Boolean);

    const newProd = {
      id: `prod-${Date.now()}`,
      name: form.name,
      slug: form.name.toLowerCase().replace(/\s+/g, "-"),
      brand: "sheraz.pk",
      categorySlug: form.categorySlug,
      subcategorySlug: form.subcategorySlug,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : Number(form.price) * 1.2,
      discountPercentage: form.originalPrice ? Math.round(((Number(form.originalPrice) - Number(form.price)) / Number(form.originalPrice)) * 100) : 17,
      stock: Number(form.stock),
      sku: form.sku || `SHZ-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5.0,
      reviewCount: 0,
      mainImage: imgs[0] || "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      images: imgs.length > 0 ? imgs : ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"],
      colors: cols,
      variants: form.variants.map(v => ({
        id: v.id || `var-${Math.random()}`,
        name: v.name,
        price: Number(v.price),
        sku: v.sku || `${form.sku || "SHZ"}-${v.name.toUpperCase()}`
      })),
      shortDescription: form.shortDescription,
      description: form.description,
      metaTitle: form.metaTitle || `${form.name} | sheraz.pk`,
      bulkOffersList: form.bulkOffersList
    };

    setProductsList([newProd, ...productsList]);
    
    // Reset form
    setForm({
      name: "",
      shortDescription: "",
      description: "",
      metaTitle: "",
      price: "",
      originalPrice: "",
      categorySlug: categories[0]?.slug || "",
      subcategorySlug: categories[0]?.subcategories?.[0]?.slug || "",
      stock: 25,
      sku: "",
      imageUrls: "",
      colors: "",
      variants: [],
      bulkOffersList: []
    });
    
    setShowModal(false);
    triggerToast(`Product '${newProd.name}' created successfully!`);
  };

  const handleEditProductSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct.name || !editingProduct.price) return;

    setProductsList(productsList.map(p => p.id === editingProduct.id ? {
      ...p,
      name: editingProduct.name,
      shortDescription: editingProduct.shortDescription,
      description: editingProduct.description,
      metaTitle: editingProduct.metaTitle,
      price: Number(editingProduct.price),
      originalPrice: Number(editingProduct.originalPrice || editingProduct.price),
      stock: Number(editingProduct.stock),
      sku: editingProduct.sku,
      categorySlug: editingProduct.categorySlug,
      subcategorySlug: editingProduct.subcategorySlug,
      colors: typeof editingProduct.colors === "string" ? editingProduct.colors.split(",").map(c => c.trim()).filter(Boolean) : editingProduct.colors,
      mainImage: typeof editingProduct.imageUrls === "string" && editingProduct.imageUrls.split(",")[0] ? editingProduct.imageUrls.split(",")[0].trim() : p.mainImage,
      images: typeof editingProduct.imageUrls === "string" ? editingProduct.imageUrls.split(",").map(u => u.trim()).filter(Boolean) : p.images,
      variants: (editingProduct.variants || []).map(v => ({ ...v, price: Number(v.price) })),
      bulkOffersList: editingProduct.bulkOffersList || []
    } : p));

    setEditingProduct(null);
    triggerToast("Product changes saved successfully!");
  };

  const handleDeleteProduct = (id) => {
    setProductsList(productsList.filter((p) => p.id !== id));
    triggerToast("Product deleted!");
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
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
                <Package className="w-3.5 h-3.5" /> Luxury Catalog Editor
              </div>
              <h1 className="font-heading text-2xl font-bold text-neutral-900">Products Catalog & Options Manager</h1>
              <p className="text-xs text-neutral-500">Configure multi-image sliders, meta tags, color variants, size details, and bulk price promotions.</p>
            </div>

            <button 
              onClick={() => setShowModal(true)}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 hover:brightness-110 transition"
            >
              <Plus className="w-4 h-4" /> Add Product with Options
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input 
              type="text"
              placeholder="Search products by title, SKU, brand, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs text-neutral-900 font-semibold focus:outline-none focus:border-amber-600 focus:bg-white transition"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 text-neutral-800 uppercase font-heading text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Product Details</th>
                  <th className="p-3.5">SKU</th>
                  <th className="p-3.5">Category & Subcategory</th>
                  <th className="p-3.5">Price & Options</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {(() => {
                  const filteredProducts = productsList.filter(prod => {
                    const q = searchQuery.toLowerCase();
                    return (
                      prod.name.toLowerCase().includes(q) ||
                      (prod.sku && prod.sku.toLowerCase().includes(q)) ||
                      prod.categorySlug.toLowerCase().includes(q) ||
                      (prod.subcategorySlug && prod.subcategorySlug.toLowerCase().includes(q)) ||
                      (prod.brand && prod.brand.toLowerCase().includes(q))
                    );
                  });
                  if (filteredProducts.length === 0) {
                    return (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-neutral-400 italic">
                          No matching products found.
                        </td>
                      </tr>
                    );
                  }
                  return filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-neutral-50 transition">
                    <td className="p-3.5 font-bold text-neutral-900 flex items-center gap-3">
                      <img src={prod.mainImage} alt={prod.name} className="w-11 h-11 rounded-xl object-cover border border-neutral-200 bg-white" />
                      <div>
                        <div>{prod.name}</div>
                        <div className="text-[9px] text-neutral-400 font-mono">Meta: {prod.metaTitle || "None"}</div>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-neutral-600 font-medium">{prod.sku}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 text-[10px] rounded font-bold uppercase">
                        {prod.categorySlug}
                      </span>
                      {prod.subcategorySlug && (
                        <span className="ml-1 px-2.5 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-800 text-[10px] rounded font-bold">
                          {prod.subcategorySlug}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 font-medium text-neutral-800">
                      <div>Rs. {prod.price.toLocaleString()}</div>
                      {prod.variants && prod.variants.length > 0 && (
                        <div className="text-[10px] text-amber-700 font-bold mt-1">
                          {prod.variants.length} Weights / Sizes Configured
                        </div>
                      )}
                    </td>
                    <td className="p-3.5 font-medium text-emerald-700">{prod.stock} units</td>
                    <td className="p-3.5 text-right space-x-1">
                      <button 
                        onClick={() => {
                          setEditingProduct({
                            ...prod,
                            imageUrls: prod.images ? prod.images.join(", ") : prod.mainImage,
                            colors: prod.colors ? prod.colors.join(", ") : "",
                            bulkOffersList: prod.bulkOffersList || []
                          });
                        }}
                        className="p-1.5 text-neutral-400 hover:text-amber-600 transition"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-1.5 text-neutral-400 hover:text-rose-600 transition"
                        title="Delete Product"
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

        {/* Add Product Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
            <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 max-w-2xl w-full z-10 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="font-heading text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-600" /> Add Product with Option Builder
              </h3>
              
              <form onSubmit={handleAddProduct} className="space-y-4 text-xs font-semibold text-neutral-800">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-700 block mb-1">Product Title *</label>
                    <input 
                      type="text" required placeholder="e.g. Pure Honey"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-700 block mb-1">Meta SEO Title</label>
                    <input 
                      type="text" placeholder="e.g. Buy Organic Wild Honey Online"
                      value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-700 block mb-1">Category *</label>
                    <select 
                      value={form.categorySlug} 
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    >
                      {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-neutral-700 block mb-1">Subcategory</label>
                    <select 
                      value={form.subcategorySlug} 
                      onChange={(e) => setForm({ ...form, subcategorySlug: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    >
                      <option value="">None / Main Category Only</option>
                      {categories.find(c => c.slug === form.categorySlug)?.subcategories?.map(sub => (
                        <option key={sub.id} value={sub.slug}>{sub.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-neutral-700 block mb-1">Base Price (Rs.) *</label>
                    <input 
                      type="number" required placeholder="999"
                      value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-700 block mb-1">Compare Price (Original)</label>
                    <input 
                      type="number" placeholder="1200"
                      value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-700 block mb-1">Stock Level *</label>
                    <input 
                      type="number" required
                      value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-700 block mb-1">Product Images (Comma-separated URLs)</label>
                  <input 
                    type="text" placeholder="https://image1.jpg, https://image2.jpg"
                    value={form.imageUrls} onChange={(e) => setForm({ ...form, imageUrls: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                  />
                  {form.imageUrls && (
                    <div className="flex gap-2 mt-2 overflow-x-auto pb-1 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                      {form.imageUrls.split(",").map((url, i) => url.trim() && (
                        <div key={i} className="relative shrink-0 border border-neutral-300 rounded-lg overflow-hidden bg-white w-10 h-10">
                          <img src={url.trim()} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-700 block mb-1">Colors (Comma-separated, e.g. Gold, Black)</label>
                    <input 
                      type="text" placeholder="Gold, Black, White"
                      value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-700 block mb-1">Base SKU</label>
                    <input 
                      type="text" placeholder="e.g. ORG-HDR-001"
                      value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-700 block mb-1">Short Description</label>
                  <input 
                    type="text" placeholder="Brief tagline..."
                    value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-neutral-700 block mb-1">Full Specifications / Description</label>
                  <textarea 
                    rows="3" placeholder="Luxury specification detail catalog..."
                    value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                  />
                </div>

                {/* Weights / Sizes Option Builder */}
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3">
                  <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                    <h4 className="font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-amber-600" />
                      Dynamic Weight / Size Variants Builder
                    </h4>
                    <button 
                      type="button" 
                      onClick={() => handleAddVariant(false)}
                      className="px-2.5 py-1 bg-amber-500 text-neutral-950 font-bold text-[10px] rounded-lg shadow"
                    >
                      + Add Size/Weight
                    </button>
                  </div>
                  
                  {form.variants.length > 0 ? (
                    <div className="space-y-2">
                      {form.variants.map((v, idx) => (
                        <div key={v.id} className="flex gap-2 items-center">
                          <input 
                            type="text" required placeholder="e.g. 1kg Jar"
                            value={v.name} onChange={(e) => handleVariantChange(idx, "name", e.target.value, false)}
                            className="flex-1 bg-white border border-neutral-200 rounded-lg p-2 focus:outline-none"
                          />
                          <input 
                            type="number" required placeholder="Price (Rs.)"
                            value={v.price} onChange={(e) => handleVariantChange(idx, "price", e.target.value, false)}
                            className="w-24 bg-white border border-neutral-200 rounded-lg p-2 focus:outline-none"
                          />
                          <input 
                            type="text" placeholder="Variant SKU"
                            value={v.sku} onChange={(e) => handleVariantChange(idx, "sku", e.target.value, false)}
                            className="w-32 bg-white border border-neutral-200 rounded-lg p-2 focus:outline-none"
                          />
                          <button 
                            type="button" 
                            onClick={() => handleRemoveVariant(idx, false)}
                            className="p-2 text-rose-500 hover:text-rose-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-neutral-500 italic">No custom sizes/weights defined. Base settings apply.</p>
                  )}
                </div>

                {/* Custom Bulk Offers Builder */}
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3">
                  <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                    <h4 className="font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Dynamic Bulk Offers Builder
                    </h4>
                    <button 
                      type="button" 
                      onClick={() => handleAddBulkOffer(false)}
                      className="px-2.5 py-1 bg-amber-500 text-neutral-950 font-bold text-[10px] rounded-lg shadow"
                    >
                      + Add Bulk Offer Button
                    </button>
                  </div>
                  
                  {form.bulkOffersList.length > 0 ? (
                    <div className="space-y-2 animate-fadeIn">
                      {form.bulkOffersList.map((bo, idx) => (
                        <div key={bo.id} className="flex gap-2 items-center">
                          <input 
                            type="text" required placeholder="Button Label (e.g. Buy 2)"
                            value={bo.label} onChange={(e) => handleBulkOfferChange(idx, "label", e.target.value, false)}
                            className="flex-1 bg-white border border-neutral-200 rounded-lg p-2 focus:outline-none"
                          />
                          <input 
                            type="number" required placeholder="Qty (e.g. 2)"
                            value={bo.quantity} onChange={(e) => handleBulkOfferChange(idx, "quantity", e.target.value, false)}
                            className="w-20 bg-white border border-neutral-200 rounded-lg p-2 focus:outline-none"
                          />
                          <input 
                            type="number" required placeholder="Save (Rs.)"
                            value={bo.discount} onChange={(e) => handleBulkOfferChange(idx, "discount", e.target.value, false)}
                            className="w-24 bg-white border border-neutral-200 rounded-lg p-2 focus:outline-none"
                          />
                          <button 
                            type="button" 
                            onClick={() => handleRemoveBulkOffer(idx, false)}
                            className="p-2 text-rose-500 hover:text-rose-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-neutral-500 italic">No custom bulk offers defined. Store defaults apply.</p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-neutral-100 rounded-xl text-xs font-bold text-neutral-600">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 bg-amber-500 rounded-xl text-xs font-bold text-neutral-950">Create Product</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
            <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setEditingProduct(null)} />
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 max-w-2xl w-full z-10 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="font-heading text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-amber-600" /> Edit Product Details & Options
              </h3>
              
              <form onSubmit={handleEditProductSubmit} className="space-y-4 text-xs font-semibold text-neutral-800">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-700 block mb-1">Product Title *</label>
                    <input 
                      type="text" required
                      value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-700 block mb-1">Meta SEO Title</label>
                    <input 
                      type="text"
                      value={editingProduct.metaTitle} onChange={(e) => setEditingProduct({ ...editingProduct, metaTitle: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-700 block mb-1">Category *</label>
                    <select 
                      value={editingProduct.categorySlug} 
                      onChange={(e) => handleCategoryChange(e.target.value, true)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    >
                      {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-neutral-700 block mb-1">Subcategory</label>
                    <select 
                      value={editingProduct.subcategorySlug || ""} 
                      onChange={(e) => setEditingProduct({ ...editingProduct, subcategorySlug: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    >
                      <option value="">None / Main Category Only</option>
                      {categories.find(c => c.slug === editingProduct.categorySlug)?.subcategories?.map(sub => (
                        <option key={sub.id} value={sub.slug}>{sub.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-neutral-700 block mb-1">Base Price (Rs.) *</label>
                    <input 
                      type="number" required
                      value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-700 block mb-1">Compare Price (Original)</label>
                    <input 
                      type="number"
                      value={editingProduct.originalPrice} onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-700 block mb-1">Stock Level *</label>
                    <input 
                      type="number" required
                      value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-700 block mb-1">Product Images (Comma-separated URLs)</label>
                  <input 
                    type="text"
                    value={editingProduct.imageUrls} onChange={(e) => setEditingProduct({ ...editingProduct, imageUrls: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                  />
                  {editingProduct.imageUrls && (
                    <div className="flex gap-2 mt-2 overflow-x-auto pb-1 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                      {editingProduct.imageUrls.split(",").map((url, i) => url.trim() && (
                        <div key={i} className="relative shrink-0 border border-neutral-300 rounded-lg overflow-hidden bg-white w-10 h-10">
                          <img src={url.trim()} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-700 block mb-1">Colors (Comma-separated)</label>
                    <input 
                      type="text"
                      value={editingProduct.colors} onChange={(e) => setEditingProduct({ ...editingProduct, colors: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-700 block mb-1">Base SKU</label>
                    <input 
                      type="text"
                      value={editingProduct.sku} onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-700 block mb-1">Short Description</label>
                  <input 
                    type="text"
                    value={editingProduct.shortDescription} onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-neutral-700 block mb-1">Full Description</label>
                  <textarea 
                    rows="3"
                    value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none"
                  />
                </div>

                {/* Custom Option / Size variants builder */}
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3">
                  <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                    <h4 className="font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-amber-600" />
                      Dynamic Weight / Size Variants Builder
                    </h4>
                    <button 
                      type="button" 
                      onClick={() => handleAddVariant(true)}
                      className="px-2.5 py-1 bg-amber-500 text-neutral-950 font-bold text-[10px] rounded-lg shadow"
                    >
                      + Add Size/Weight
                    </button>
                  </div>
                  
                  {editingProduct.variants && editingProduct.variants.length > 0 ? (
                    <div className="space-y-2">
                      {editingProduct.variants.map((v, idx) => (
                        <div key={v.id || idx} className="flex gap-2 items-center">
                          <input 
                            type="text" required placeholder="e.g. 1kg Jar"
                            value={v.name} onChange={(e) => handleVariantChange(idx, "name", e.target.value, true)}
                            className="flex-1 bg-white border border-neutral-200 rounded-lg p-2 focus:outline-none"
                          />
                          <input 
                            type="number" required placeholder="Price (Rs.)"
                            value={v.price} onChange={(e) => handleVariantChange(idx, "price", e.target.value, true)}
                            className="w-24 bg-white border border-neutral-200 rounded-lg p-2 focus:outline-none"
                          />
                          <input 
                            type="text" placeholder="Variant SKU"
                            value={v.sku || ""} onChange={(e) => handleVariantChange(idx, "sku", e.target.value, true)}
                            className="w-32 bg-white border border-neutral-200 rounded-lg p-2 focus:outline-none"
                          />
                          <button 
                            type="button" 
                            onClick={() => handleRemoveVariant(idx, true)}
                            className="p-2 text-rose-500 hover:text-rose-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-neutral-500 italic">No custom sizes/weights defined. Base settings apply.</p>
                  )}
                </div>

                {/* Custom Bulk Offers Builder */}
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3">
                  <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                    <h4 className="font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Dynamic Bulk Offers Builder
                    </h4>
                    <button 
                      type="button" 
                      onClick={() => handleAddBulkOffer(true)}
                      className="px-2.5 py-1 bg-amber-500 text-neutral-950 font-bold text-[10px] rounded-lg shadow"
                    >
                      + Add Bulk Offer Button
                    </button>
                  </div>
                  
                  {editingProduct.bulkOffersList && editingProduct.bulkOffersList.length > 0 ? (
                    <div className="space-y-2 animate-fadeIn">
                      {editingProduct.bulkOffersList.map((bo, idx) => (
                        <div key={bo.id} className="flex gap-2 items-center">
                          <input 
                            type="text" required placeholder="Button Label (e.g. Buy 2)"
                            value={bo.label} onChange={(e) => handleBulkOfferChange(idx, "label", e.target.value, true)}
                            className="flex-1 bg-white border border-neutral-200 rounded-lg p-2 focus:outline-none"
                          />
                          <input 
                            type="number" required placeholder="Qty"
                            value={bo.quantity} onChange={(e) => handleBulkOfferChange(idx, "quantity", e.target.value, true)}
                            className="w-20 bg-white border border-neutral-200 rounded-lg p-2 focus:outline-none"
                          />
                          <input 
                            type="number" required placeholder="Save (Rs.)"
                            value={bo.discount} onChange={(e) => handleBulkOfferChange(idx, "discount", e.target.value, true)}
                            className="w-24 bg-white border border-neutral-200 rounded-lg p-2 focus:outline-none"
                          />
                          <button 
                            type="button" 
                            onClick={() => handleRemoveBulkOffer(idx, true)}
                            className="p-2 text-rose-500 hover:text-rose-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-neutral-500 italic">No custom bulk offers defined. Store defaults apply.</p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 py-2.5 bg-neutral-100 rounded-xl text-xs font-bold text-neutral-600">Cancel</button>
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

'use client';

import { useState } from 'react';
import { useStore, Product } from '@/lib/store';
import { Plus, Check, ImageIcon, LayoutDashboard, Package, Trash2, Edit2, X } from 'lucide-react';
import Image from 'next/image';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'upload'>('overview');

    // Store access
    const allProducts = useStore(state => state.allProducts);
    const addProduct = useStore(state => state.addProduct);
    const updateProduct = useStore(state => state.updateProduct);
    const deleteProduct = useStore(state => state.deleteProduct);

    return (
        <div className="text-[var(--text-primary)] fade-in min-h-screen">
            <header className="mb-12 border-b border-[var(--border)] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="font-serif text-4xl mb-2">Admin <span className="italic text-[var(--gold)]">Dashboard</span></h1>
                    <p className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)]">Manage the NH27 Collection</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 bg-[var(--bg-secondary)] p-1 rounded-sm border border-[var(--border)]">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 font-sans text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${activeTab === 'overview' ? 'bg-[var(--gold)] text-black font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                    >
                        <LayoutDashboard size={14} /> Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('inventory')}
                        className={`px-4 py-2 font-sans text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${activeTab === 'inventory' ? 'bg-[var(--gold)] text-black font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                    >
                        <Package size={14} /> Inventory
                    </button>
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`px-4 py-2 font-sans text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${activeTab === 'upload' ? 'bg-[var(--gold)] text-black font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                    >
                        <Plus size={14} /> Add Product
                    </button>
                </div>
            </header>

            {/* Render Active Tab Content */}
            {activeTab === 'overview' && <OverviewTab products={allProducts} />}
            {activeTab === 'inventory' && (
                <InventoryTab
                    products={allProducts}
                    onUpdate={updateProduct}
                    onDelete={deleteProduct}
                />
            )}
            {activeTab === 'upload' && <UploadTab onAdd={addProduct} />}

        </div>
    );
}

// -----------------------------------------------------
// 1. OVERVIEW TAB
// -----------------------------------------------------
function OverviewTab({ products }: { products: Product[] }) {
    const totalValue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
    const lowStockItems = products.filter(p => (p.stock || 0) < 5).length;

    return (
        <div className="fade-in space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[var(--bg-secondary)] p-6 rounded-sm border border-[var(--border)]">
                    <h3 className="font-sans text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">Total Products</h3>
                    <p className="font-serif text-3xl">{products.length}</p>
                </div>
                <div className="bg-[var(--bg-secondary)] p-6 rounded-sm border border-[var(--border)]">
                    <h3 className="font-sans text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">Inventory Value</h3>
                    <p className="font-serif text-3xl">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-[var(--bg-secondary)] p-6 rounded-sm border border-[var(--border)]">
                    <h3 className="font-sans text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">Low Stock Alerts</h3>
                    <p className={`font-serif text-3xl ${lowStockItems > 0 ? 'text-red-500' : ''}`}>{lowStockItems}</p>
                </div>
                <div className="bg-[var(--bg-secondary)] p-6 rounded-sm border border-[var(--border)]">
                    <h3 className="font-sans text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">Total Orders (Mock)</h3>
                    <p className="font-serif text-3xl">12</p>
                </div>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-sm overflow-hidden">
                <div className="p-6 border-b border-[var(--border)]">
                    <h3 className="font-serif text-xl">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-sm">
                        <thead className="text-xs uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--bg-primary)]">
                            <tr>
                                <th className="p-6 font-normal">Order ID</th>
                                <th className="p-6 font-normal">Customer</th>
                                <th className="p-6 font-normal">Date</th>
                                <th className="p-6 font-normal">Status</th>
                                <th className="p-6 font-normal">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                            {[
                                { id: 'ORD-001', name: 'James Wilson', date: 'Today, 10:42 AM', status: 'Processing', total: 420.00 },
                                { id: 'ORD-002', name: 'Elena Rodriguez', date: 'Yesterday', status: 'Shipped', total: 1250.00 },
                                { id: 'ORD-003', name: 'Michael Chen', date: 'Oct 24, 2024', status: 'Delivered', total: 85.50 },
                            ].map((order, i) => (
                                <tr key={order.id} className="hover:bg-[var(--bg-primary)] transition-colors">
                                    <td className="p-6 font-mono text-[var(--gold)]">{order.id}</td>
                                    <td className="p-6">{order.name}</td>
                                    <td className="p-6 text-[var(--text-secondary)]">{order.date}</td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 text-[10px] uppercase tracking-widest rounded-full ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : order.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-6">${order.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// -----------------------------------------------------
// 2. INVENTORY TAB
// -----------------------------------------------------
function InventoryTab({ products, onUpdate, onDelete }: {
    products: Product[],
    onUpdate: (id: string, data: Partial<Product>) => void,
    onDelete: (id: string) => void
}) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Product>>({});

    const handleEditClick = (product: Product) => {
        setEditingId(product.id);
        setEditForm({ ...product });
    };

    const handleSave = () => {
        if (editingId) {
            onUpdate(editingId, editForm);
            setEditingId(null);
        }
    };

    return (
        <div className="fade-in bg-[var(--bg-secondary)] border border-[var(--border)] rounded-sm overflow-hidden mb-20">
            <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-sm min-w-[800px]">
                    <thead className="text-xs uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--bg-primary)]">
                        <tr>
                            <th className="p-6 font-normal w-24">Image</th>
                            <th className="p-6 font-normal">Product</th>
                            <th className="p-6 font-normal">Category</th>
                            <th className="p-6 font-normal">Price</th>
                            <th className="p-6 font-normal">Stock</th>
                            <th className="p-6 font-normal text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-[var(--bg-primary)] transition-colors">
                                {/* Image Column */}
                                <td className="p-6">
                                    <div className="relative w-12 h-16 bg-[var(--bg-primary)] border border-[var(--border)] overflow-hidden">
                                        <Image src={product.img} alt={product.name} fill className="object-cover" />
                                    </div>
                                </td>

                                {/* Inline Editing Row vs Normal Row */}
                                {editingId === product.id ? (
                                    <>
                                        <td className="p-6">
                                            <input
                                                type="text"
                                                value={editForm.name}
                                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                className="w-full bg-[var(--bg-primary)] border border-[var(--gold)] outline-none p-2 text-sm"
                                            />
                                        </td>
                                        <td className="p-6">
                                            <select
                                                value={editForm.category}
                                                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                                className="w-full bg-[var(--bg-primary)] border border-[var(--gold)] outline-none p-2 text-sm appearance-none"
                                            >
                                                <option value="Fragrance">Fragrance</option>
                                                <option value="Accessories">Accessories</option>
                                                <option value="Footwear">Footwear</option>
                                                <option value="Watch">Watch</option>
                                                <option value="Shoes">Shoes</option>
                                                <option value="Apparel">Apparel</option>
                                            </select>
                                        </td>
                                        <td className="p-6">
                                            <input
                                                type="number"
                                                value={editForm.price}
                                                onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                                                className="w-24 bg-[var(--bg-primary)] border border-[var(--gold)] outline-none p-2 text-sm"
                                            />
                                        </td>
                                        <td className="p-6">
                                            <input
                                                type="number"
                                                value={editForm.stock}
                                                onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) || 0 })}
                                                className="w-20 bg-[var(--bg-primary)] border border-[var(--gold)] outline-none p-2 text-sm"
                                            />
                                        </td>
                                        <td className="p-6 text-right space-x-2">
                                            <button onClick={handleSave} className="p-2 bg-green-500/20 text-green-500 hover:bg-green-500 hover:text-white transition-colors rounded-sm" title="Save">
                                                <Check size={16} />
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="p-2 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-sm" title="Cancel">
                                                <X size={16} />
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-6">
                                            <p className="font-bold text-[var(--gold)] mb-1">{product.name}</p>
                                            <p className="text-xs text-[var(--text-secondary)] truncate max-w-[200px]" title={product.description}>{product.description || 'No description provided.'}</p>
                                        </td>
                                        <td className="p-6 uppercase tracking-widest text-[10px] text-[var(--text-secondary)]">{product.category}</td>
                                        <td className="p-6">${product.price.toFixed(2)}</td>
                                        <td className="p-6">
                                            <span className={`px-2 py-1 rounded-sm text-xs ${(product.stock || 0) < 5 ? 'bg-red-500/20 text-red-400' : 'bg-[var(--bg-primary)] text-[var(--text-secondary)]'}`}>
                                                {product.stock || 0} left
                                            </span>
                                        </td>
                                        <td className="p-6 text-right space-x-2">
                                            <button onClick={() => handleEditClick(product)} className="p-2 text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors" title="Edit Product">
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) onDelete(product.id);
                                                }}
                                                className="p-2 text-[var(--text-secondary)] hover:text-red-500 transition-colors"
                                                title="Delete Product"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-12 text-center text-[var(--text-secondary)]">
                                    No products in inventory.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// -----------------------------------------------------
// 3. UPLOAD PRODUCT TAB
// -----------------------------------------------------
function UploadTab({ onAdd }: { onAdd: (p: Product) => void }) {
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        category: 'Fragrance',
        price: '',
        stock: '10',
        description: '',
        img: '',
        imagesStr: '' // Split by comma
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const extraImages = formData.imagesStr
            .split(',')
            .map(url => url.trim())
            .filter(url => url !== '');

        const newProduct: Product = {
            id: `prod_${Date.now()}`,
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price) || 0,
            stock: parseInt(formData.stock) || 0,
            description: formData.description,
            img: formData.img || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2938&auto=format&fit=crop',
            ...(extraImages.length > 0 && { images: extraImages })
        };

        onAdd(newProduct);

        setIsSuccess(true);
        setFormData({
            name: '',
            category: 'Fragrance',
            price: '',
            stock: '10',
            description: '',
            img: '',
            imagesStr: ''
        });

        setTimeout(() => setIsSuccess(false), 3000);
    };

    return (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-sm p-8 md:p-12 mb-20 max-w-3xl fade-in mx-auto">
            <h2 className="font-serif text-3xl mb-8 flex items-center gap-3">
                <Plus className="text-[var(--gold)]" />
                Upload New Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="font-sans text-xs tracking-widest uppercase text-[var(--text-secondary)]">Product Name</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] focus:border-[var(--gold)] outline-none p-4 font-sans text-sm transition-colors" placeholder="e.g. Midnight Onyx Ring" />
                    </div>

                    <div className="space-y-2">
                        <label className="font-sans text-xs tracking-widest uppercase text-[var(--text-secondary)]">Category</label>
                        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] focus:border-[var(--gold)] outline-none p-4 font-sans text-sm transition-colors appearance-none cursor-pointer">
                            <option value="Fragrance">Fragrance</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Footwear">Footwear</option>
                            <option value="Watch">Watch</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Apparel">Apparel</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="font-sans text-xs tracking-widest uppercase text-[var(--text-secondary)]">Price (USD)</label>
                        <input required type="number" min="0" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] focus:border-[var(--gold)] outline-none p-4 font-sans text-sm transition-colors" placeholder="e.g. 450.00" />
                    </div>

                    <div className="space-y-2">
                        <label className="font-sans text-xs tracking-widest uppercase text-[var(--text-secondary)]">Initial Stock</label>
                        <input required type="number" min="0" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] focus:border-[var(--gold)] outline-none p-4 font-sans text-sm transition-colors" placeholder="e.g. 10" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="font-sans text-xs tracking-widest uppercase text-[var(--text-secondary)]">Product Description</label>
                    <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] focus:border-[var(--gold)] outline-none p-4 font-sans text-sm transition-colors min-h-[100px] resize-y" placeholder="Describe the materials, inspiration, or details..." />
                </div>

                <div className="space-y-2">
                    <label className="font-sans text-xs tracking-widest uppercase text-[var(--text-secondary)] flex items-center gap-2">
                        <ImageIcon size={14} /> Main Image URL
                    </label>
                    <input required type="url" value={formData.img} onChange={e => setFormData({ ...formData, img: e.target.value })} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] focus:border-[var(--gold)] outline-none p-4 font-sans text-sm transition-colors" placeholder="https://images.unsplash.com/..." />
                </div>

                <div className="space-y-2 pb-4">
                    <label className="font-sans text-xs tracking-widest uppercase text-[var(--text-secondary)] flex items-center gap-2">
                        <ImageIcon size={14} /> Additional Images URLs (Optional)
                    </label>
                    <textarea value={formData.imagesStr} onChange={e => setFormData({ ...formData, imagesStr: e.target.value })} className="w-full bg-[var(--bg-primary)] border border-[var(--border)] focus:border-[var(--gold)] outline-none p-4 font-sans text-sm transition-colors min-h-[80px] resize-y" placeholder="Paste multiple image URLs separated by commas..." />
                </div>

                <button type="submit" className={`w-full py-4 px-8 flex items-center justify-center gap-2 font-sans text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 ${isSuccess ? 'bg-green-600 text-white' : 'bg-[var(--gold)] text-black hover:bg-white hover:text-black'}`} disabled={isSuccess}>
                    {isSuccess ? <><Check size={18} /> Product Uploaded Successfully</> : 'Upload Product to Live Store'}
                </button>
            </form>
        </div>
    );
}

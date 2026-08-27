import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Upload, X, Music, Film, Tv, BookOpen, LogOut } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  category: 'music' | 'series' | 'film' | 'anime';
  price: number;
  duration: number;
  description: string;
  uploadDate: string;
}

interface FormData {
  title: string;
  category: 'music' | 'series' | 'film' | 'anime';
  price: string;
  duration: string;
  description: string;
  file: File | null;
}

const Admin = () => {
  const [contents, setContents] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Album Succès 2024',
      category: 'music',
      price: 500,
      duration: 45,
      description: 'Collection des meilleures musiques 2024',
      uploadDate: '2024-08-20'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: 'music',
    price: '',
    duration: '',
    description: '',
    file: null
  });

  const [stats] = useState({
    totalContents: 12,
    totalRevenue: 125000,
    activeUsers: 342,
    downloads: 1250
  });

  const handleAddContent = () => {
    if (!formData.title || !formData.price || !formData.duration) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (editingId) {
      // Éditer
      setContents(contents.map(c =>
        c.id === editingId
          ? {
              ...c,
              title: formData.title,
              category: formData.category,
              price: parseInt(formData.price),
              duration: parseInt(formData.duration),
              description: formData.description
            }
          : c
      ));
      setEditingId(null);
    } else {
      // Ajouter nouveau
      const newContent: ContentItem = {
        id: Date.now().toString(),
        title: formData.title,
        category: formData.category,
        price: parseInt(formData.price),
        duration: parseInt(formData.duration),
        description: formData.description,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setContents([...contents, newContent]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (content: ContentItem) => {
    setFormData({
      title: content.title,
      category: content.category,
      price: content.price.toString(),
      duration: content.duration.toString(),
      description: content.description,
      file: null
    });
    setEditingId(content.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contenu?')) {
      setContents(contents.filter(c => c.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'music',
      price: '',
      duration: '',
      description: '',
      file: null
    });
    setEditingId(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'music': return <Music className="w-4 h-4" />;
      case 'series': return <Tv className="w-4 h-4" />;
      case 'film': return <Film className="w-4 h-4" />;
      case 'anime': return <BookOpen className="w-4 h-4" />;
      default: return null;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      music: 'Musique',
      series: 'Série',
      film: 'Film',
      anime: 'Dessin Animé'
    };
    return labels[category] || category;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎬</div>
            <h1 className="text-2xl font-bold text-gray-900">StreamVault Admin</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Contenus" value={stats.totalContents} icon="📁" />
          <StatCard label="Revenus (FC)" value={stats.totalRevenue.toLocaleString()} icon="💰" />
          <StatCard label="Utilisateurs Actifs" value={stats.activeUsers} icon="👥" />
          <StatCard label="Téléchargements" value={stats.downloads} icon="⬇️" />
        </div>

        {/* Bouton Ajouter */}
        <div className="mb-8">
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            Ajouter un Contenu
          </button>
        </div>

        {/* Tableau des contenus */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Titre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Catégorie</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Prix (FC)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Durée</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contents.map(content => (
                  <tr key={content.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{content.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="flex items-center gap-2 text-gray-600">
                        {getCategoryIcon(content.category)}
                        {getCategoryLabel(content.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-purple-600">{content.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{content.duration} min</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{content.uploadDate}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(content)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(content.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Formulaire */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Éditer le Contenu' : 'Ajouter un Nouveau Contenu'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Titre */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Titre *</label>
                <input
                  type="text"
                  placeholder="Ex: Film Blockbuster 2024"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* Catégorie et Prix */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Catégorie *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="music">🎵 Musique</option>
                    <option value="series">📺 Série</option>
                    <option value="film">🎬 Film</option>
                    <option value="anime">🐉 Dessin Animé</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Prix (FC) *</label>
                  <input
                    type="number"
                    placeholder="500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              {/* Durée */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Durée (minutes) *</label>
                <input
                  type="number"
                  placeholder="120"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea
                  placeholder="Décrivez votre contenu..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* Upload Fichier */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Fichier Média</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-600 transition-colors cursor-pointer">
                  <input
                    type="file"
                    onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                    className="hidden"
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {formData.file ? formData.file.name : 'Cliquez pour uploader votre fichier'}
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleAddContent}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold"
              >
                {editingId ? 'Mettre à Jour' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="text-4xl mb-2">{icon}</div>
    <p className="text-gray-600 text-sm mb-1">{label}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default Admin;
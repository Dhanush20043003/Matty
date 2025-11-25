import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Grid, Layout, Image, Star, Clock, Trash2, Crown, Filter, Plus, 
  ArrowRight, Palette, Type, Camera, Layers, Zap, Gift, TrendingUp, 
  Smartphone, Monitor, FileText, Instagram, Facebook, Twitter, Youtube, 
  Package, Download, Edit 
} from 'lucide-react';

const MattyDashboard = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'All Templates', icon: Grid, count: 1500, color: 'from-purple-500 to-pink-500' },
    { id: 'social', name: 'Social Media', icon: Smartphone, count: 450, color: 'from-blue-500 to-cyan-500' },
    { id: 'collage', name: 'Photo Collage', icon: Layers, count: 180, color: 'from-green-500 to-emerald-500' },
    { id: 'logo', name: 'Logo Design', icon: Zap, count: 250, color: 'from-orange-500 to-red-500' },
    { id: 'business', name: 'Business', icon: FileText, count: 320, color: 'from-indigo-500 to-purple-500' },
    { id: 'web', name: 'Web Graphics', icon: Monitor, count: 200, color: 'from-pink-500 to-rose-500' },
    { id: 'print', name: 'Print Design', icon: Package, count: 150, color: 'from-yellow-500 to-orange-500' }
  ];

  const socialPlatforms = [
    { name: 'Instagram', icon: Instagram, templates: 120, color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500' },
    { name: 'Facebook', icon: Facebook, templates: 95, color: 'bg-blue-600' },
    { name: 'Twitter', icon: Twitter, templates: 80, color: 'bg-sky-500' },
    { name: 'YouTube', icon: Youtube, templates: 65, color: 'bg-red-600' }
  ];

  const templates = [
    {
      id: 1,
      title: 'Instagram Post - Fashion',
      category: 'social',
      platform: 'instagram',
      size: '1080x1080',
      thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=600&fit=crop',
      premium: false,
      tags: ['fashion', 'square', 'minimal'],
      popular: true,
      downloads: 1420
    },
    {
      id: 2,
      title: 'Photo Collage - 6 Grid',
      category: 'collage',
      layout: '2x3',
      size: '1200x1200',
      thumbnail: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&h=600&fit=crop',
      premium: false,
      tags: ['grid', 'memories', 'family'],
      popular: true,
      downloads: 2150
    },
    {
      id: 3,
      title: 'Minimalist Logo',
      category: 'logo',
      size: '1000x1000',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=600&fit=crop',
      premium: true,
      tags: ['logo', 'brand', 'minimal'],
      popular: false,
      downloads: 890
    },
    {
      id: 4,
      title: 'Business Card',
      category: 'business',
      size: '3.5x2 in',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
      premium: true,
      tags: ['business', 'professional', 'card'],
      popular: false,
      downloads: 650
    },
    {
      id: 5,
      title: 'Instagram Story - Travel',
      category: 'social',
      platform: 'instagram',
      size: '1080x1920',
      thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=600&fit=crop',
      premium: false,
      tags: ['story', 'travel', 'adventure'],
      popular: true,
      downloads: 3200
    },
    {
      id: 6,
      title: 'Web Banner - Hero',
      category: 'web',
      size: '1920x600',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      premium: true,
      tags: ['web', 'banner', 'hero'],
      popular: false,
      downloads: 540
    },
    {
      id: 7,
      title: 'Facebook Cover',
      category: 'social',
      platform: 'facebook',
      size: '1640x856',
      thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop',
      premium: false,
      tags: ['facebook', 'cover', 'header'],
      popular: true,
      downloads: 1890
    },
    {
      id: 8,
      title: 'Collage - Heart Shape',
      category: 'collage',
      layout: 'heart',
      size: '1500x1500',
      thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=600&fit=crop',
      premium: true,
      tags: ['collage', 'heart', 'love'],
      popular: false,
      downloads: 780
    }
  ];

  const recentProjects = [
    { id: 1, name: 'Summer Campaign', type: 'Instagram Post', date: '2 hours ago', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop' },
    { id: 2, name: 'Birthday Collage', type: 'Photo Collage', date: '1 day ago', thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&h=200&fit=crop' },
    { id: 3, name: 'Brand Logo V2', type: 'Logo Design', date: '3 days ago', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&h=200&fit=crop' }
  ];

  const drafts = [
    { id: 1, name: 'Untitled Design', type: 'Instagram Story', saved: '5 mins ago' },
    { id: 2, name: 'Product Banner', type: 'Web Banner', saved: '1 hour ago' },
    { id: 3, name: 'Team Collage', type: 'Photo Collage', saved: '3 hours ago' }
  ];

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Function to open editor
  const openEditor = () => {
    navigate('/editor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Premium Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Crown className="w-5 h-5" />
          <span className="font-semibold">Unlock 1000+ Premium Templates & Advanced Features</span>
        </div>
        <button className="bg-white text-purple-900 px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition">
          Upgrade to Pro - $9.99/mo
        </button>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Matty
              </h1>
              
              <nav className="hidden md:flex items-center gap-6">
                <button className="text-slate-700 hover:text-purple-600 font-semibold transition">Templates</button>
                <button className="text-slate-700 hover:text-purple-600 font-semibold transition">My Designs</button>
                <button className="text-slate-700 hover:text-purple-600 font-semibold transition">Learn</button>
              </nav>
            </div>

            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search 1500+ templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-200 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                <Clock className="w-5 h-5 text-slate-600" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                <Star className="w-5 h-5 text-slate-600" />
              </button>
              <button 
                onClick={openEditor}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg transition"
              >
                <Plus className="w-5 h-5 inline mr-2" />
                Create New Design
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-blue-600">Recent</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">12</div>
            <div className="text-sm text-slate-500">Projects</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <Layout className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-green-600">Drafts</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">{drafts.length}</div>
            <div className="text-sm text-slate-500">Saved</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Trash2 className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-orange-600">Trash</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">5</div>
            <div className="text-sm text-slate-500">Items</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm font-semibold text-yellow-600">Favorites</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">24</div>
            <div className="text-sm text-slate-500">Templates</div>
          </div>
        </div>

        {/* Social Platforms Quick Access */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Design for Social Media</h2>
          <div className="grid grid-cols-4 gap-4">
            {socialPlatforms.map((platform) => (
              <button
                key={platform.name}
                onClick={openEditor}
                className={`${platform.color} text-white rounded-2xl p-6 hover:shadow-xl transition-all hover:scale-105`}
              >
                <platform.icon className="w-8 h-8 mb-3" />
                <div className="font-bold text-lg">{platform.name}</div>
                <div className="text-sm opacity-90">{platform.templates} templates</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        {recentProjects.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-900">Continue Editing</h2>
              <button className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group border border-slate-200"
                >
                  <div className="relative h-48">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <button 
                        onClick={openEditor}
                        className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Open Editor
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 mb-1">{project.name}</h3>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{project.type}</span>
                      <span>{project.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Browse Templates</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                >
                  <Layout className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition ${
                  activeCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <cat.icon className="w-5 h-5" />
                {cat.name}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeCategory === cat.id ? 'bg-white/20' : 'bg-slate-100'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-4 gap-6' : 'space-y-4'}>
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer group border border-slate-200 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-64' : 'aspect-square'} overflow-hidden`}>
                <img
                  src={template.thumbnail}
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                {template.premium && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Crown className="w-3 h-3" /> PRO
                  </div>
                )}
                {template.popular && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <TrendingUp className="w-3 h-3" /> Popular
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-3">
                  <button 
                    onClick={openEditor}
                    className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:scale-105 transition"
                  >
                    Use Template
                  </button>
                  <button className="text-white hover:text-purple-300 transition">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <h3 className="font-bold text-slate-900 mb-2">{template.title}</h3>
                <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                  <span>{template.size}</span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {template.downloads}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Drafts Section */}
        {drafts.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Your Drafts</h2>
              <button className="text-purple-600 font-semibold hover:text-purple-700">View All</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  onClick={openEditor}
                  className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Layout className="w-5 h-5 text-slate-400" />
                    <button className="text-slate-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{draft.name}</h3>
                  <div className="text-xs text-slate-500 mb-2">{draft.type}</div>
                  <div className="text-xs text-slate-400">Saved {draft.saved}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MattyDashboard;
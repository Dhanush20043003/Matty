import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Grid, Layout, Image, Star, Clock, Trash2, Crown, Filter, Plus, 
  ArrowRight, Smartphone, Monitor, FileText, Instagram, Facebook, Twitter, 
  Youtube, Package, Download, Edit 
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'All Templates', icon: Grid, count: 1500, color: 'from-purple-500 to-pink-500' },
    { id: 'social', name: 'Social Media', icon: Smartphone, count: 450, color: 'from-blue-500 to-cyan-500' },
    { id: 'collage', name: 'Photo Collage', icon: Image, count: 180, color: 'from-green-500 to-emerald-500' },
    { id: 'business', name: 'Business', icon: FileText, count: 320, color: 'from-indigo-500 to-purple-500' },
    { id: 'web', name: 'Web Graphics', icon: Monitor, count: 200, color: 'from-pink-500 to-rose-500' }
  ];

  const socialPlatforms = [
    { name: 'Instagram', icon: Instagram, templates: 120, gradient: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)' },
    { name: 'Facebook', icon: Facebook, templates: 95, gradient: 'linear-gradient(135deg, #1877f2 0%, #0c5fcd 100%)' },
    { name: 'Twitter', icon: Twitter, templates: 80, gradient: 'linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)' },
    { name: 'YouTube', icon: Youtube, templates: 65, gradient: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)' }
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
      size: '1200x1200',
      thumbnail: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&h=600&fit=crop',
      premium: false,
      tags: ['grid', 'memories', 'family'],
      popular: true,
      downloads: 2150
    },
    {
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
      title: 'Facebook Cover',
      category: 'social',
      platform: 'facebook',
      size: '1640x856',
      thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop',
      premium: false,
      tags: ['facebook', 'cover', 'header'],
      popular: true,
      downloads: 1890
    }
  ];

  const recentProjects = [
    { id: 1, name: 'Summer Campaign', type: 'Instagram Post', date: '2 hours ago', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop' },
    { id: 2, name: 'Birthday Collage', type: 'Photo Collage', date: '1 day ago', thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&h=200&fit=crop' }
  ];

  const drafts = [
    { id: 1, name: 'Untitled Design', type: 'Instagram Story', saved: '5 mins ago' },
    { id: 2, name: 'Product Banner', type: 'Web Banner', saved: '1 hour ago' }
  ];

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openEditor = () => {
    navigate('/editor');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Premium Banner */}
      <div style={{ 
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '12px 24px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Crown size={20} />
          <span style={{ fontWeight: 600 }}>Unlock 1000+ Premium Templates & Advanced Features</span>
        </div>
        <button style={{ 
          background: 'white', 
          color: '#667eea', 
          padding: '8px 24px', 
          borderRadius: '20px', 
          border: 'none', 
          fontWeight: 'bold', 
          cursor: 'pointer' 
        }}>
          Upgrade to Pro - $9.99/mo
        </button>
      </div>

      {/* Header */}
      <header style={{ 
        background: 'white', 
        borderBottom: '1px solid #e2e8f0', 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <h1 style={{ 
                fontSize: '28px', 
                fontWeight: 900, 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                Matty
              </h1>
              
              <nav style={{ display: 'flex', gap: '24px' }}>
                <button style={{ background: 'none', border: 'none', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>Templates</button>
                <button style={{ background: 'none', border: 'none', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>My Designs</button>
                <button style={{ background: 'none', border: 'none', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>Learn</button>
              </nav>
            </div>

            <div style={{ flex: 1, maxWidth: '600px', margin: '0 32px' }}>
              <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                <input
                  type="text"
                  placeholder="Search 1500+ templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '24px',
                    padding: '12px 16px 12px 48px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={{ 
                padding: '8px', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                borderRadius: '8px'
              }}>
                <Clock size={20} color="#64748b" />
              </button>
              <button style={{ 
                padding: '8px', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                borderRadius: '8px'
              }}>
                <Star size={20} color="#64748b" />
              </button>
              <button 
                onClick={openEditor}
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  color: 'white', 
                  padding: '10px 24px', 
                  borderRadius: '24px', 
                  border: 'none', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Plus size={20} />
                Create New Design
              </button>
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
          {[
            { icon: Clock, label: 'Recent Projects', count: '12', color: '#3b82f6', bg: '#dbeafe' },
            { icon: Layout, label: 'Drafts', count: drafts.length, color: '#10b981', bg: '#d1fae5' },
            { icon: Trash2, label: 'Trash', count: '5', color: '#f97316', bg: '#fed7aa' },
            { icon: Star, label: 'Favorites', count: '24', color: '#eab308', bg: '#fef3c7' }
          ].map((stat, idx) => (
            <div key={idx} style={{ 
              background: 'white', 
              borderRadius: '16px', 
              padding: '24px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ padding: '12px', background: stat.bg, borderRadius: '12px' }}>
                  <stat.icon size={24} color={stat.color} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: stat.color }}>{stat.label}</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>{stat.count}</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>Items</div>
            </div>
          ))}
        </div>

        {/* Social Platforms */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>Design for Social Media</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {socialPlatforms.map((platform) => (
              <button
                key={platform.name}
                onClick={openEditor}
                style={{
                  background: platform.gradient,
                  color: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <platform.icon size={32} style={{ marginBottom: '12px' }} />
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{platform.name}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>{platform.templates} templates</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        {recentProjects.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Continue Editing</h2>
              <button style={{ 
                color: '#667eea', 
                fontWeight: 600, 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                View All <ArrowRight size={16} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'}
                  onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
                >
                  <div style={{ position: 'relative', height: '192px' }}>
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>{project.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b' }}>
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
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Browse Templates</h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '8px 16px', 
                background: 'white', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px', 
                cursor: 'pointer' 
              }}>
                <Filter size={16} />
                Filters
              </button>
              <div style={{ display: 'flex', gap: '4px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '4px' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px',
                    background: viewMode === 'grid' ? '#f1f5f9' : 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '8px',
                    background: viewMode === 'list' ? '#f1f5f9' : 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <Layout size={16} />
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeCategory === cat.id 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'white',
                  color: activeCategory === cat.id ? 'white' : '#475569',
                  boxShadow: activeCategory === cat.id ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <cat.icon size={20} />
                {cat.name}
                <span style={{ 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '12px',
                  background: activeCategory === cat.id ? 'rgba(255,255,255,0.2)' : '#f1f5f9'
                }}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: viewMode === 'grid' ? 'repeat(4, 1fr)' : '1fr', 
          gap: '24px' 
        }}>
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s',
                display: viewMode === 'list' ? 'flex' : 'block'
              }}
              onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'}
              onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
            >
              <div style={{ 
                position: 'relative', 
                aspectRatio: viewMode === 'grid' ? '1' : 'auto',
                width: viewMode === 'list' ? '256px' : 'auto',
                overflow: 'hidden' 
              }}>
                <img
                  src={template.thumbnail}
                  alt={template.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {template.premium && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '12px', 
                    right: '12px', 
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Crown size={12} /> PRO
                  </div>
                )}
                {template.popular && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '12px', 
                    left: '12px', 
                    background: '#ef4444',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    Popular
                  </div>
                )}
              </div>
              <div style={{ padding: '16px', flex: viewMode === 'list' ? 1 : 'auto' }}>
                <h3 style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>{template.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>
                  <span>{template.size}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Download size={12} />
                    {template.downloads}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {template.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} style={{ 
                      fontSize: '12px', 
                      background: '#ede9fe', 
                      color: '#7c3aed', 
                      padding: '4px 8px', 
                      borderRadius: '6px' 
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={openEditor}
                  style={{
                    width: '100%',
                    marginTop: '12px',
                    padding: '10px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Drafts Section */}
        {drafts.length > 0 && (
          <div style={{ marginTop: '48px', background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Your Drafts</h2>
              <button style={{ color: '#667eea', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  onClick={openEditor}
                  style={{
                    background: '#f8fafc',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#f8fafc'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Layout size={20} color="#94a3b8" />
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={16} color="#94a3b8" />
                    </button>
                  </div>
                  <h3 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>{draft.name}</h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>{draft.type}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>Saved {draft.saved}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
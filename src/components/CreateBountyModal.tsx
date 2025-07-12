'use client';

import { useState } from 'react';
import { apiService } from '@/lib/api';

interface CreateBountyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBountyCreated: () => void;
}

const categories = [
  { value: 'design', label: 'Design', icon: '🎨', color: '#9B59B6' },
  { value: 'video', label: 'Video', icon: '🎬', color: '#E67E22' },
  { value: 'content', label: 'Content', icon: '📝', color: '#27AE60' },
  { value: 'development', label: 'Development', icon: '🔧', color: '#E74C3C' },
  { value: 'social', label: 'Social', icon: '🌟', color: '#3498DB' },
  { value: 'educational', label: 'Educational', icon: '📖', color: '#F39C12' },
];

export default function CreateBountyModal({ isOpen, onClose, onBountyCreated }: CreateBountyModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reward: '',
    category: '',
    project: '',
    dueDate: '',
    tags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      await apiService.createBounty({
        title: formData.title,
        description: formData.description,
        reward: parseFloat(formData.reward),
        category: formData.category,
        project: formData.project,
        dueDate: formData.dueDate || undefined,
        tags: tagsArray,
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        reward: '',
        category: '',
        project: '',
        dueDate: '',
        tags: '',
      });

      onBountyCreated();
      onClose();
    } catch (error) {
      console.error('Error creating bounty:', error);
      alert('Failed to create bounty. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create New Bounty</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Bounty Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter bounty title..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what needs to be done..."
              rows={4}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Reward (APT)</label>
              <input
                type="number"
                className="form-input"
                value={formData.reward}
                onChange={(e) => handleInputChange('reward', e.target.value)}
                placeholder="100"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Project</label>
              <input
                type="text"
                className="form-input"
                value={formData.project}
                onChange={(e) => handleInputChange('project', e.target.value)}
                placeholder="Project name..."
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <div className="category-grid">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  className={`category-option ${formData.category === category.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange('category', category.value)}
                  style={{ '--category-color': category.color } as React.CSSProperties}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tags (comma-separated)</label>
              <input
                type="text"
                className="form-input"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="Design, UI/UX, Frontend"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Bounty'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
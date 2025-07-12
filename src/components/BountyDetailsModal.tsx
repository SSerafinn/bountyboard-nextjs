'use client';

import { useState } from 'react';
import { apiService } from '@/lib/api';

interface BountyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bounty: any;
  user: any;
}

export default function BountyDetailsModal({ isOpen, onClose, bounty, user }: BountyDetailsModalProps) {
  const [submissionContent, setSubmissionContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      design: '🎨',
      video: '🎬',
      content: '📝',
      development: '🔧',
      social: '🌟',
      educational: '📖',
    };
    return icons[category] || '📋';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      design: '#9B59B6',
      video: '#E67E22',
      content: '#27AE60',
      development: '#E74C3C',
      social: '#3498DB',
      educational: '#F39C12',
    };
    return colors[category] || '#95A5A6';
  };

  const handleSubmitWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionContent.trim()) return;

    setIsSubmitting(true);
    try {
      await apiService.createSubmission({
        bountyId: bounty.id,
        content: submissionContent,
      });
      
      setSubmissionContent('');
      setShowSubmissionForm(false);
      // TODO: Show success message
    } catch (error) {
      console.error('Error submitting work:', error);
      // TODO: Show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!isOpen || !bounty) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content bounty-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Bounty Details</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="bounty-details-content">
          {/* Bounty Header */}
          <div className="bounty-details-header">
            <div 
              className="bounty-details-icon"
              style={{ backgroundColor: getCategoryColor(bounty.category) }}
            >
              {getCategoryIcon(bounty.category)}
            </div>
            <div className="bounty-details-info">
              <h3 className="bounty-details-title">{bounty.title}</h3>
              <div className="bounty-details-meta">
                <span className="bounty-project">{bounty.project}</span>
                <span className="bounty-category">{bounty.category}</span>
                {bounty.dueDate && (
                  <span className="bounty-due-date">
                    Due: {formatDate(bounty.dueDate)}
                  </span>
                )}
              </div>
            </div>
            <div className="bounty-details-reward">
              <span className="reward-amount">{bounty.reward} APT</span>
              <span className="reward-label">Reward</span>
            </div>
          </div>

          {/* Bounty Description */}
          <div className="bounty-details-section">
            <h4 className="section-title">Description</h4>
            <p className="bounty-description">{bounty.description}</p>
          </div>

          {/* Bounty Tags */}
          {bounty.tags && bounty.tags.length > 0 && (
            <div className="bounty-details-section">
              <h4 className="section-title">Tags</h4>
              <div className="bounty-tags">
                {bounty.tags.map((tag: string, index: number) => (
                  <span key={index} className={`tag ${bounty.category}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bounty Creator */}
          <div className="bounty-details-section">
            <h4 className="section-title">Created by</h4>
            <div className="bounty-creator">
              <div className="creator-avatar">
                {bounty.creator?.avatar ? (
                  <img src={bounty.creator.avatar} alt={bounty.creator.username} />
                ) : (
                  <div className="avatar-placeholder">
                    {bounty.creator?.username?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div className="creator-info">
                <span className="creator-name">{bounty.creator?.username || 'Anonymous'}</span>
                <span className="creator-date">Created {formatDate(bounty.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Submissions */}
          {bounty.submissions && bounty.submissions.length > 0 && (
            <div className="bounty-details-section">
              <h4 className="section-title">Submissions ({bounty.submissions.length})</h4>
              <div className="submissions-list">
                {bounty.submissions.map((submission: any) => (
                  <div key={submission.id} className="submission-item">
                    <div className="submission-user">
                      <div className="submission-avatar">
                        {submission.user?.avatar ? (
                          <img src={submission.user.avatar} alt={submission.user.username} />
                        ) : (
                          <div className="avatar-placeholder">
                            {submission.user?.username?.charAt(0) || 'U'}
                          </div>
                        )}
                      </div>
                      <div className="submission-info">
                        <span className="submission-username">{submission.user?.username || 'Anonymous'}</span>
                        <span className="submission-date">{formatDate(submission.createdAt)}</span>
                      </div>
                    </div>
                    <div className="submission-status">
                      <span className={`status-badge ${submission.status.toLowerCase()}`}>
                        {submission.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="bounty-details-actions">
            <button
              className="btn-secondary view-more-btn"
              onClick={() => {
                onClose();
                window.location.href = `/bounty/${bounty.id}`;
              }}
            >
              View More Details
            </button>
            
            {user && (
              <>
                {!showSubmissionForm ? (
                  <button
                    className="btn-primary submit-work-btn"
                    onClick={() => setShowSubmissionForm(true)}
                  >
                    Submit Work
                  </button>
                ) : (
                  <form onSubmit={handleSubmitWork} className="submission-form">
                    <div className="form-group">
                      <label className="form-label">Your Submission</label>
                      <textarea
                        className="form-textarea"
                        value={submissionContent}
                        onChange={(e) => setSubmissionContent(e.target.value)}
                        placeholder="Describe your work and provide any relevant links..."
                        rows={4}
                        required
                      />
                    </div>
                    <div className="submission-form-actions">
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setShowSubmissionForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={isSubmitting || !submissionContent.trim()}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Work'}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
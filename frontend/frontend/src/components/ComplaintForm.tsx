import { useState } from 'react';
import axios from 'axios';
import './ComplaintForm.css';

interface ComplaintResult {
    complaint: string;
    authenticity: string;
    message: string;
}

const ComplaintForm = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [result, setResult] = useState<ComplaintResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) { setError('Please enter complaint details.'); return; }

        setError('');
        setLoading(true);

        const formData = new FormData();
        formData.append('text', text);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5000/api/complaints', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(response.data);
            setText('');
            setImage(null);
        } catch (err) {
            setError('Failed to submit complaint. Make sure the backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    const isAuthentic = result?.authenticity === 'Real';

    return (
        <div className="complaint-page">
            <div className="complaint-header">
                <h1>📋 Submit a Complaint</h1>
                <p>Report issues with hostel facilities. Your evidence image will be verified for authenticity using AI detection.</p>
            </div>

            <div className="complaint-container">
                {/* Form Section */}
                <div className="complaint-form-card">
                    <h2>New Complaint</h2>
                    <form onSubmit={handleSubmit} className="complaint-form">
                        <div className="form-field">
                            <label>Complaint Details <span className="required">*</span></label>
                            <textarea
                                rows={5}
                                placeholder="Describe the issue in detail (e.g., 'Water leakage in room 302 bathroom since 2 days...')"
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                        </div>

                        <div className="form-field">
                            <label>Evidence Image <span style={{ opacity: 0.6, fontSize: '0.85rem' }}>(optional)</span></label>
                            <div
                                className={`file-drop-zone ${image ? 'has-file' : ''}`}
                                onClick={() => document.getElementById('img-upload')?.click()}
                            >
                                {image
                                    ? <><span className="file-icon">📸</span><span>{image.name}</span></>
                                    : <><span className="file-icon">📁</span><span>Click to upload image (optional)</span></>
                                }
                            </div>
                            <input
                                id="img-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={e => setImage(e.target.files?.[0] || null)}
                            />
                        </div>

                        {error && <div className="error-banner">⚠️ {error}</div>}

                        <button type="submit" className="submit-complaint-btn" disabled={loading}>
                            {loading ? <span className="spinner"></span> : '📩 Submit Complaint'}
                        </button>
                    </form>
                </div>

                {/* Result Section */}
                {result && (
                    <div className={`complaint-result ${isAuthentic ? 'real' : 'ai-generated'}`}>
                        <div className="result-icon">{isAuthentic ? '✅' : '⚠️'}</div>
                        <h3>{result.message}</h3>

                        <div className="result-details">
                            <div className="result-row">
                                <span className="result-label">Complaint</span>
                                <span className="result-value">"{result.complaint}"</span>
                            </div>
                            <div className="result-row">
                                <span className="result-label">Image Authenticity</span>
                                <span className={`authenticity-badge ${isAuthentic ? 'real' : 'fake'}`}>
                                    {isAuthentic ? '✅ Real Image' : '🤖 AI-Generated Image'}
                                </span>
                            </div>
                        </div>

                        {!isAuthentic && (
                            <p className="ai-warning">
                                ⚠️ Warning: Our AI detected this image may be AI-generated. Please provide authentic photographic evidence for your complaint to be processed.
                            </p>
                        )}
                    </div>
                )}

                {/* Info Card */}
                <div className="info-card">
                    <h3>🤖 How AI Image Verification Works</h3>
                    <ol>
                        <li>You submit your complaint with an evidence photo.</li>
                        <li>Our backend sends the image to a Python ML model.</li>
                        <li>The model (ResNet-based) classifies it as <strong>Real</strong> or <strong>AI-Generated</strong>.</li>
                        <li>The result is shown instantly and flagged for admin review.</li>
                    </ol>
                    <div className="info-note">
                        💡 Only complaints with verified real images will be escalated to the hostel warden.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintForm;

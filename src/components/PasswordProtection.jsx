import { useState } from 'react';
import { siteSettings } from '../data/content';

const PasswordProtection = ({ onPasswordCorrect }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // محاكاة تأخير للتحقق
    setTimeout(() => {
      if (password === siteSettings.sitePassword) {
        onPasswordCorrect();
      } else {
        setError('كلمة المرور غير صحيحة');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        padding: '2rem'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#2563eb',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
            </svg>
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#111827',
            margin: '0 0 0.5rem 0'
          }}>تبيان</h1>
          <p style={{
            color: '#6b7280',
            fontSize: '0.875rem',
            margin: 0
          }}>منصة تعليم تحليل الأسهم الأمريكية</p>
        </div>

        {/* Lock Section */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            margin: '0 auto 0.5rem auto',
            color: '#2563eb'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <circle cx="12" cy="16" r="1"></circle>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h2 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 0.5rem 0'
          }}>منطقة محمية</h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: 0
          }}>يرجى إدخال كلمة المرور للوصول إلى المحتوى</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                textAlign: 'center',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: isLoading ? '#f9fafb' : 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
            {error && (
              <p style={{
                marginTop: '0.5rem',
                fontSize: '0.875rem',
                color: '#dc2626',
                textAlign: 'center'
              }}>{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !password}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: isLoading || !password ? '#9ca3af' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isLoading || !password ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              if (!isLoading && password) {
                e.target.style.backgroundColor = '#1d4ed8';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading && password) {
                e.target.style.backgroundColor = '#2563eb';
              }
            }}
          >
            {isLoading ? 'جاري التحقق...' : 'دخول'}
          </button>
        </form>

        {/* Footer */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{
            fontSize: '0.75rem',
            color: '#9ca3af',
            margin: 0
          }}>هذا الموقع مؤقتاً أثناء تسليم المحتوى</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordProtection;


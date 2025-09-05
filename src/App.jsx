import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Pricing from './components/Pricing';
import AnalysesSection from './components/AnalysesSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AdminPanel from './components/AdminPanel';
import PasswordProtection from './components/PasswordProtection';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // التحقق من حالة تسجيل الدخول عند تحميل التطبيق
  useEffect(() => {
    const savedUser = localStorage.getItem('tebyan_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('tebyan_user', JSON.stringify(userData));
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('tebyan_user');
    setShowAdminPanel(false);
  };

  const handleSubscribe = (planName, planPrice) => {
    if (!currentUser) {
      setShowLoginModal(true);
    } else {
      // إعادة توجيه للدفع
      console.log(`Subscribing to ${planName} for $${planPrice}`);
    }
  };

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true);
  };

  // إذا لم يتم إدخال كلمة المرور، اعرض شاشة الحماية
  if (!isAuthenticated && !currentUser) {
    return <PasswordProtection onSuccess={handlePasswordSuccess} />;
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header 
        currentUser={currentUser}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        onAdminPanel={() => setShowAdminPanel(true)}
      />
      
      <main>
        <Hero onGetStarted={() => setShowLoginModal(true)} />
        <About />
        <Services />
        
        {/* عرض التحليلات فقط للمستخدمين المسجلين */}
        {currentUser && (
          <AnalysesSection currentUser={currentUser} />
        )}
        
        <Pricing 
          onSubscribe={handleSubscribe}
          isLoggedIn={!!currentUser}
        />
        <Contact />
      </main>
      
      <Footer />

      {/* نافذة تسجيل الدخول */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* لوحة التحكم الإدارية */}
      {showAdminPanel && currentUser?.isAdmin && (
        <AdminPanel
          isOpen={showAdminPanel}
          onClose={() => setShowAdminPanel(false)}
          currentUser={currentUser}
        />
      )}

      {/* زر الدعم العائم */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          title="تواصل معنا"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>

      {/* مؤشر التمرير */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-75 hover:opacity-100"
          title="العودة للأعلى"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;


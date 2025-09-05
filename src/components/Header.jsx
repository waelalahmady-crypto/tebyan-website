import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, TrendingUp, User, LogOut } from 'lucide-react';
import { siteContent } from '../data/content';

const Header = ({ isLoggedIn, onLogin, onLogout, currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* الشعار */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{siteContent.siteName}</h1>
              <p className="text-xs text-gray-600">{siteContent.siteTagline}</p>
            </div>
          </div>

          {/* القائمة الرئيسية - سطح المكتب */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {siteContent.navigation.home}
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {siteContent.navigation.about}
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {siteContent.navigation.services}
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {siteContent.navigation.pricing}
            </button>
            {isLoggedIn && (
              <button 
                onClick={() => scrollToSection('analyses')}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {siteContent.navigation.analyses}
              </button>
            )}
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {siteContent.navigation.contact}
            </button>
          </nav>

          {/* أزرار تسجيل الدخول */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{currentUser?.name || 'عضو'}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onLogout}
                  className="flex items-center space-x-2 space-x-reverse"
                >
                  <LogOut className="w-4 h-4" />
                  <span>خروج</span>
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={onLogin}
                >
                  {siteContent.navigation.login}
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => scrollToSection('pricing')}
                >
                  {siteContent.navigation.signup}
                </Button>
              </>
            )}
          </div>

          {/* زر القائمة - الهاتف المحمول */}
          <button 
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* القائمة المنسدلة - الهاتف المحمول */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-right"
              >
                {siteContent.navigation.home}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-right"
              >
                {siteContent.navigation.about}
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-right"
              >
                {siteContent.navigation.services}
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-right"
              >
                {siteContent.navigation.pricing}
              </button>
              {isLoggedIn && (
                <button 
                  onClick={() => scrollToSection('analyses')}
                  className="text-gray-700 hover:text-blue-600 transition-colors text-right"
                >
                  {siteContent.navigation.analyses}
                </button>
              )}
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-right"
              >
                {siteContent.navigation.contact}
              </button>
              
              <div className="pt-4 border-t">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">{currentUser?.name || 'عضو'}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={onLogout}
                      className="w-full"
                    >
                      خروج
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      onClick={onLogin}
                      className="w-full"
                    >
                      {siteContent.navigation.login}
                    </Button>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => scrollToSection('pricing')}
                    >
                      {siteContent.navigation.signup}
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


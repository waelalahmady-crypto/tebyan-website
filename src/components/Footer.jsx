import { TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
import { siteContent } from '../data/content';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* معلومات الشركة */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{siteContent.siteName}</h3>
                <p className="text-gray-400">{siteContent.siteTagline}</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              {siteContent.footer.description}
            </p>
            
            {/* معلومات الاتصال */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">{siteContent.contact.email}</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">{siteContent.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">{siteContent.contact.address}</span>
              </div>
            </div>
          </div>

          {/* الروابط السريعة */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{siteContent.footer.quickLinks.title}</h4>
            <ul className="space-y-3">
              {siteContent.footer.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* الروابط القانونية */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{siteContent.footer.legal.title}</h4>
            <ul className="space-y-3">
              {siteContent.footer.legal.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* وسائل التواصل الاجتماعي */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">{siteContent.footer.social.title}</h4>
              <div className="flex space-x-4 space-x-reverse">
                {siteContent.footer.social.links.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-sm font-semibold">
                      {social.name.charAt(0)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* إخلاء المسؤولية */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="bg-yellow-900 bg-opacity-50 border border-yellow-700 rounded-lg p-6 mb-8">
            <h4 className="text-yellow-300 font-semibold mb-3 text-lg">
              ⚠️ إخلاء المسؤولية المهم
            </h4>
            <p className="text-yellow-100 leading-relaxed text-base">
              {siteContent.footer.disclaimer}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {siteContent.footer.copyright}
            </p>
            <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-400">
              <span>جميع الأسعار بالدولار الأمريكي</span>
              <span>•</span>
              <span>الدفع الآمن عبر Lemon Squeezy</span>
              <span>•</span>
              <span>SSL مؤمن</span>
            </div>
          </div>
        </div>
      </div>

      {/* شريط إضافي للتأكيد على الطبيعة التعليمية */}
      <div className="bg-red-900 border-t border-red-800">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <p className="text-red-100 text-sm font-medium">
              🎓 منصة تعليمية | جميع المواد لأغراض التعلم فقط | ليست نصائح استثمارية | استشر مستشاراً مالياً مؤهلاً
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


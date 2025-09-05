import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Play, TrendingUp, BarChart3, BookOpen, Users } from 'lucide-react';
import { siteContent } from '../data/content';

const Hero = ({ onGetStarted, onWatchDemo }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* المحتوى النصي */}
          <div className="text-center lg:text-right">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {siteContent.hero.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {siteContent.hero.subtitle}
            </p>
            <p className="text-lg text-gray-700 mb-10 leading-relaxed">
              {siteContent.hero.description}
            </p>

            {/* الأزرار الرئيسية */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                onClick={() => scrollToSection('pricing')}
              >
                {siteContent.hero.primaryButton}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-3"
                onClick={onWatchDemo}
              >
                <Play className="w-5 h-5 ml-2" />
                {siteContent.hero.secondaryButton}
              </Button>
            </div>

            {/* المميزات */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {siteContent.hero.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 space-x-reverse">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* الجانب المرئي */}
          <div className="relative">
            {/* الكارت الرئيسي */}
            <Card className="bg-white shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">لوحة التحليل التعليمية</h3>
                  <p className="text-gray-600">مثال على واجهة التعلم</p>
                </div>

                {/* مثال على تحليل */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-gray-900">AAPL</span>
                      <span className="text-sm text-gray-600 mr-2">Apple Inc.</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 font-semibold">+2.5%</div>
                      <div className="text-sm text-gray-600">$185.50</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-gray-900">MSFT</span>
                      <span className="text-sm text-gray-600 mr-2">Microsoft</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 font-semibold">+1.8%</div>
                      <div className="text-sm text-gray-600">$420.30</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-gray-900">GOOGL</span>
                      <span className="text-sm text-gray-600 mr-2">Alphabet</span>
                    </div>
                    <div className="text-right">
                      <div className="text-red-600 font-semibold">-0.5%</div>
                      <div className="text-sm text-gray-600">$138.75</div>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  عرض التحليل التعليمي الكامل
                </Button>
              </CardContent>
            </Card>

            {/* الكروت العائمة */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
              <div className="flex items-center space-x-2 space-x-reverse">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">تحليل فني</div>
                  <div className="text-xs text-gray-600">RSI: 65</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
              <div className="flex items-center space-x-2 space-x-reverse">
                <BookOpen className="w-6 h-6 text-green-600" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">دروس تعليمية</div>
                  <div className="text-xs text-gray-600">50+ درس</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -left-8 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Users className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">متعلمين</div>
                  <div className="text-xs text-gray-600">1000+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  TrendingUp, 
  BarChart3, 
  BookOpen, 
  Video, 
  MessageCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { siteContent } from '../data/content';

const Services = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const serviceIcons = [FileText, TrendingUp, BarChart3];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {siteContent.services.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {siteContent.services.subtitle}
          </p>
        </div>

        {/* الخدمات الرئيسية */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {siteContent.services.items.map((service, index) => {
            const Icon = serviceIcons[index];
            
            return (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3 space-x-reverse">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full group-hover:bg-blue-700 transition-colors"
                    onClick={() => scrollToSection('pricing')}
                  >
                    ابدأ التعلم
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* الخدمات الإضافية */}
        <div className="bg-white rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              خدمات تعليمية إضافية
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات التعليمية لدعم رحلتك في تعلم تحليل الأسهم
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* الدروس التفاعلية */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">دروس تفاعلية مباشرة</h4>
              <p className="text-gray-600 mb-4">جلسات تعليمية مباشرة مع المحللين لشرح المفاهيم والإجابة على الأسئلة</p>
              <Badge variant="outline" className="text-purple-600 border-purple-600">قريباً</Badge>
            </div>

            {/* مكتبة الدروس */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">مكتبة الدروس الشاملة</h4>
              <p className="text-gray-600 mb-4">مجموعة كبيرة من الدروس المسجلة تغطي جميع جوانب تحليل الأسهم</p>
              <Badge className="bg-green-100 text-green-800">متاح</Badge>
            </div>

            {/* الدعم التعليمي */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">دعم تعليمي مستمر</h4>
              <p className="text-gray-600 mb-4">فريق من المحللين المتخصصين لمساعدتك في فهم المفاهيم المعقدة</p>
              <Badge className="bg-orange-100 text-orange-800">متاح</Badge>
            </div>
          </div>
        </div>

        {/* عملية التعلم */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              كيف تعمل عملية التعلم؟
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نتبع منهجية مدروسة لضمان أفضل تجربة تعليمية
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">اختر خطتك</h4>
              <p className="text-gray-600">اختر الخطة التي تناسب مستواك وأهدافك التعليمية</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">ابدأ التعلم</h4>
              <p className="text-gray-600">احصل على التحليلات التعليمية والدروس الأساسية</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">طبق المفاهيم</h4>
              <p className="text-gray-600">استخدم ما تعلمته في تحليل الأسهم بنفسك</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">تطور مستمر</h4>
              <p className="text-gray-600">احصل على دعم مستمر وتحديثات دورية</p>
            </div>
          </div>
        </div>

        {/* دعوة للعمل */}
        <div className="mt-16 text-center">
          <div className="bg-blue-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              جاهز لبدء رحلتك التعليمية؟
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              انضم إلى آلاف المتعلمين واكتسب المهارات اللازمة لتحليل الأسهم بثقة
            </p>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
              onClick={() => scrollToSection('pricing')}
            >
              ابدأ الآن - تجربة مجانية 7 أيام
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;


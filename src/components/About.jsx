import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Target, Award, Users } from 'lucide-react';
import { siteContent } from '../data/content';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {siteContent.about.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {siteContent.about.subtitle}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {siteContent.about.description}
          </p>
        </div>

        {/* القيم الأساسية */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {siteContent.about.values.map((value, index) => {
            const icons = [BookOpen, Target, Award];
            const Icon = icons[index];
            
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* الإحصائيات */}
        <div className="bg-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-700 font-medium">متعلم نشط</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-700 font-medium">تحليل تعليمي</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-700 font-medium">معدل الرضا</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-700 font-medium">دعم تعليمي</div>
            </div>
          </div>
        </div>

        {/* المنهجية التعليمية */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              منهجيتنا التعليمية
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نتبع منهجية علمية مدروسة لضمان أفضل تجربة تعليمية في مجال تحليل الأسهم
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">التأسيس النظري</h4>
                  <p className="text-gray-600">نبدأ بتعليم المفاهيم الأساسية والنظريات المالية المعترف بها عالمياً</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">التطبيق العملي</h4>
                  <p className="text-gray-600">نطبق المفاهيم على أمثلة حقيقية من السوق الأمريكي</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">التحليل التفاعلي</h4>
                  <p className="text-gray-600">نشارك المتعلمين في تحليل الأسهم خطوة بخطوة</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">المتابعة والتقييم</h4>
                  <p className="text-gray-600">نتابع النتائج ونقيم دقة التحليلات لضمان التعلم المستمر</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">مجتمع المتعلمين</h4>
                    <p className="text-gray-600">انضم إلى مجتمع نشط من المتعلمين والمحللين</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">أ.م</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">"تعلمت كيفية قراءة القوائم المالية بطريقة احترافية"</p>
                          <p className="text-xs text-gray-500 mt-1">أحمد محمد - متعلم</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">ف.ع</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">"المنهجية واضحة والأمثلة عملية ومفيدة جداً"</p>
                          <p className="text-xs text-gray-500 mt-1">فاطمة علي - متعلمة</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


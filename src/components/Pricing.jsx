import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, Star, Zap, Crown } from 'lucide-react';
import { siteContent } from '../data/content';

const Pricing = ({ onSubscribe, isLoggedIn }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  // روابط Lemon Squeezy للاشتراكات (سيتم تحديثها بعد إعداد المنتجات)
  const subscriptionLinks = {
    basic: {
      monthly: "https://tebyan.lemonsqueezy.com/checkout/buy/basic-monthly",
      annual: "https://tebyan.lemonsqueezy.com/checkout/buy/basic-annual"
    },
    advanced: {
      monthly: "https://tebyan.lemonsqueezy.com/checkout/buy/advanced-monthly", 
      annual: "https://tebyan.lemonsqueezy.com/checkout/buy/advanced-annual"
    },
    professional: {
      monthly: "https://tebyan.lemonsqueezy.com/checkout/buy/professional-monthly",
      annual: "https://tebyan.lemonsqueezy.com/checkout/buy/professional-annual"
    }
  };

  const handleSubscribe = (planName, planPrice) => {
    if (isLoggedIn) {
      // إذا كان المستخدم مسجل دخول، انتقل مباشرة للدفع
      const planKey = planName === 'الخطة الأساسية' ? 'basic' : 
                     planName === 'الخطة المتقدمة' ? 'advanced' : 'professional';
      const period = isAnnual ? 'annual' : 'monthly';
      
      // فتح صفحة الدفع في نافذة جديدة
      window.open(subscriptionLinks[planKey][period], '_blank');
    } else {
      // إذا لم يكن مسجل دخول، اطلب تسجيل الدخول أولاً
      onSubscribe && onSubscribe(planName, planPrice);
    }
  };

  const getDiscountedPrice = (price) => {
    return isAnnual ? Math.round(price * 10) : price; // خصم 17% للاشتراك السنوي
  };

  const planIcons = [Zap, Star, Crown];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {siteContent.pricing.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {siteContent.pricing.subtitle}
          </p>

          {/* مفتاح التبديل بين الشهري والسنوي */}
          <div className="flex items-center justify-center space-x-4 space-x-reverse mb-8">
            <span className={`text-lg ${!isAnnual ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              شهرياً
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className={`text-lg ${isAnnual ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              سنوياً
            </span>
            {isAnnual && (
              <Badge className="bg-green-100 text-green-800 mr-2">
                وفر 17%
              </Badge>
            )}
          </div>
        </div>

        {/* خطط التسعير */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {siteContent.pricing.plans.map((plan, index) => {
            const Icon = planIcons[index];
            const discountedPrice = getDiscountedPrice(parseInt(plan.price));
            
            return (
              <Card 
                key={index} 
                className={`relative hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      الأكثر شعبية
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    plan.popular ? 'bg-blue-600' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      plan.popular ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600 mb-6">
                    {plan.description}
                  </CardDescription>

                  <div className="mb-6">
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <span className="text-4xl font-bold text-gray-900">
                        ${discountedPrice}
                      </span>
                      <div className="text-right">
                        <div className="text-gray-600">
                          {isAnnual ? 'سنوياً' : plan.period}
                        </div>
                        {isAnnual && (
                          <div className="text-sm text-gray-500 line-through">
                            ${parseInt(plan.price) * 12}
                          </div>
                        )}
                      </div>
                    </div>
                    {isAnnual && (
                      <div className="text-sm text-green-600 mt-2">
                        وفر ${(parseInt(plan.price) * 12) - discountedPrice} سنوياً
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3 space-x-reverse">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full text-lg py-3 ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    onClick={() => handleSubscribe(plan.name, discountedPrice)}
                  >
                    {isLoggedIn ? 'اشترك الآن' : 'ابدأ التجربة المجانية'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    {isLoggedIn ? 'دفع آمن عبر Lemon Squeezy' : 'تجربة مجانية 7 أيام - بدون التزام'}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* المميزات الإضافية */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              جميع الخطط تشمل
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              مميزات أساسية متاحة لجميع المشتركين
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">ضمان استرداد المال</h4>
              <p className="text-sm text-gray-600">30 يوم ضمان كامل</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">دعم 24/7</h4>
              <p className="text-sm text-gray-600">دعم تعليمي مستمر</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">تحديثات مجانية</h4>
              <p className="text-sm text-gray-600">محتوى جديد أسبوعياً</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">إلغاء في أي وقت</h4>
              <p className="text-sm text-gray-600">بدون التزامات طويلة</p>
            </div>
          </div>
        </div>

        {/* الأسئلة الشائعة */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              أسئلة شائعة حول التسعير
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">هل يمكنني تغيير خطتي لاحقاً؟</h4>
                <p className="text-gray-600">نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. التغييرات تطبق في دورة الفوترة التالية.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">ما هي طرق الدفع المقبولة؟</h4>
                <p className="text-gray-600">نقبل جميع بطاقات الائتمان الرئيسية، PayPal، والدفع المصرفي عبر Lemon Squeezy.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">هل التحليلات مضمونة الربح؟</h4>
                <p className="text-gray-600">لا، جميع التحليلات لأغراض تعليمية فقط. الاستثمار ينطوي على مخاطر وقد تتعرض لخسائر.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* دعوة للعمل النهائية */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              ابدأ رحلتك التعليمية اليوم
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              انضم إلى آلاف المتعلمين الذين يطورون مهاراتهم في تحليل الأسهم
            </p>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
              onClick={() => handleSubscribe('الخطة المتقدمة', getDiscountedPrice(99))}
            >
              جرب مجاناً لمدة 7 أيام
            </Button>
            <p className="text-sm text-blue-200 mt-4">
              بدون بطاقة ائتمان • إلغاء في أي وقت
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;


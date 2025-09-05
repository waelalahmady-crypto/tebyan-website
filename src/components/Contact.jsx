import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { siteContent } from '../data/content';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // محاكاة إرسال النموذج
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // إخفاء رسالة النجاح بعد 5 ثوان
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {siteContent.contact.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {siteContent.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* معلومات الاتصال */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">تواصل معنا مباشرة</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                نحن هنا لمساعدتك في رحلتك التعليمية. لا تتردد في التواصل معنا لأي استفسارات أو مساعدة تحتاجها.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">البريد الإلكتروني</h4>
                  <p className="text-gray-600">{siteContent.contact.email}</p>
                  <p className="text-sm text-gray-500 mt-1">نرد خلال 24 ساعة</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">الهاتف</h4>
                  <p className="text-gray-600">{siteContent.contact.phone}</p>
                  <p className="text-sm text-gray-500 mt-1">الأحد - الخميس، 9 صباحاً - 6 مساءً</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">الموقع</h4>
                  <p className="text-gray-600">{siteContent.contact.address}</p>
                  <p className="text-sm text-gray-500 mt-1">مقر الشركة الرئيسي</p>
                </div>
              </div>
            </div>

            {/* أوقات الاستجابة */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-blue-900 mb-3">أوقات الاستجابة المتوقعة</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">الاستفسارات العامة:</span>
                    <span className="font-semibold text-blue-900">24 ساعة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">الدعم التقني:</span>
                    <span className="font-semibold text-blue-900">12 ساعة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">استفسارات الاشتراك:</span>
                    <span className="font-semibold text-blue-900">6 ساعات</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* نموذج الاتصال */}
          <Card>
            <CardHeader>
              <CardTitle>أرسل لنا رسالة</CardTitle>
              <CardDescription>
                املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-gray-600">شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {siteContent.contact.form.name}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="أدخل اسمك الكامل"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {siteContent.contact.form.email}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="أدخل بريدك الإلكتروني"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {siteContent.contact.form.subject}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="موضوع رسالتك"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {siteContent.contact.form.message}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="اكتب رسالتك هنا..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 ml-2" />
                        {siteContent.contact.form.submit}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* الأسئلة الشائعة */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              أسئلة شائعة
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              إجابات سريعة للأسئلة الأكثر شيوعاً
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">كيف يمكنني إلغاء اشتراكي؟</h4>
                <p className="text-gray-600 text-sm">
                  يمكنك إلغاء اشتراكك في أي وقت من خلال لوحة التحكم الخاصة بك أو بالتواصل معنا مباشرة.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">هل يمكنني تغيير خطة اشتراكي؟</h4>
                <p className="text-gray-600 text-sm">
                  نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. التغييرات تطبق في دورة الفوترة التالية.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">هل التحليلات مضمونة الربح؟</h4>
                <p className="text-gray-600 text-sm">
                  لا، جميع التحليلات لأغراض تعليمية فقط. الاستثمار ينطوي على مخاطر وقد تتعرض لخسائر.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">كم مرة تنشرون تحليلات جديدة؟</h4>
                <p className="text-gray-600 text-sm">
                  ننشر تحليلات جديدة أسبوعياً للخطة الأساسية، و3 مرات أسبوعياً للمتقدمة، ويومياً للاحترافية.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


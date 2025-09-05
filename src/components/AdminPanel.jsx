import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Users, 
  FileText, 
  BarChart3, 
  DollarSign, 
  Mail, 
  Shield,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Save,
  X
} from 'lucide-react';

const AdminPanel = ({ onClose, currentUser }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analyses, setAnalyses] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [siteStats, setSiteStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // تحميل البيانات عند فتح اللوحة
  useEffect(() => {
    loadAnalyses();
    loadSubscribers();
    loadSiteStats();
  }, []);

  const loadAnalyses = async () => {
    try {
      const response = await fetch('/src/data/analyses.json');
      const data = await response.json();
      setAnalyses(data);
    } catch (error) {
      console.error('Error loading analyses:', error);
    }
  };

  const loadSubscribers = () => {
    // محاكاة بيانات المشتركين
    const mockSubscribers = [
      {
        id: 1,
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        plan: 'المتقدمة',
        status: 'نشط',
        joinDate: '2024-08-15',
        lastLogin: '2024-09-04'
      },
      {
        id: 2,
        name: 'فاطمة علي',
        email: 'fatima@example.com',
        plan: 'الأساسية',
        status: 'نشط',
        joinDate: '2024-08-20',
        lastLogin: '2024-09-03'
      },
      {
        id: 3,
        name: 'محمد سالم',
        email: 'mohammed@example.com',
        plan: 'الاحترافية',
        status: 'منتهي',
        joinDate: '2024-07-10',
        lastLogin: '2024-08-30'
      }
    ];
    setSubscribers(mockSubscribers);
  };

  const loadSiteStats = () => {
    // محاكاة إحصائيات الموقع
    setSiteStats({
      totalSubscribers: 156,
      activeSubscribers: 142,
      monthlyRevenue: 12450,
      totalAnalyses: 45,
      pageViews: 8920,
      conversionRate: 3.2
    });
  };

  // إدارة التحليلات
  const [newAnalysis, setNewAnalysis] = useState({
    symbol: '',
    companyName: '',
    companyNameAr: '',
    currentPrice: '',
    targetPrice: '',
    recommendation: '',
    analysisType: '',
    summary: '',
    technicalAnalysis: {
      trend: '',
      support: '',
      resistance: '',
      rsi: '',
      macd: '',
      volume: ''
    },
    fundamentalAnalysis: {
      peRatio: '',
      revenue: '',
      earnings: '',
      marketCap: ''
    },
    educationalNotes: [''],
    riskFactors: [''],
    learningObjectives: ['']
  });

  const addAnalysis = () => {
    const analysis = {
      ...newAnalysis,
      id: Date.now().toString(),
      publishDate: new Date().toISOString().split('T')[0]
    };
    
    setAnalyses([analysis, ...analyses]);
    setNewAnalysis({
      symbol: '',
      companyName: '',
      companyNameAr: '',
      currentPrice: '',
      targetPrice: '',
      recommendation: '',
      analysisType: '',
      summary: '',
      technicalAnalysis: {
        trend: '',
        support: '',
        resistance: '',
        rsi: '',
        macd: '',
        volume: ''
      },
      fundamentalAnalysis: {
        peRatio: '',
        revenue: '',
        earnings: '',
        marketCap: ''
      },
      educationalNotes: [''],
      riskFactors: [''],
      learningObjectives: ['']
    });
  };

  const deleteAnalysis = (id) => {
    setAnalyses(analyses.filter(analysis => analysis.id !== id));
  };

  // إدارة المشتركين
  const updateSubscriberStatus = (id, newStatus) => {
    setSubscribers(subscribers.map(sub => 
      sub.id === id ? { ...sub, status: newStatus } : sub
    ));
  };

  const deleteSubscriber = (id) => {
    setSubscribers(subscribers.filter(sub => sub.id !== id));
  };

  // تصدير البيانات
  const exportData = (type) => {
    let data;
    let filename;
    
    switch(type) {
      case 'analyses':
        data = analyses;
        filename = 'analyses.json';
        break;
      case 'subscribers':
        data = subscribers;
        filename = 'subscribers.json';
        break;
      default:
        return;
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] overflow-hidden">
        {/* رأس اللوحة */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Shield className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">لوحة التحكم الإدارية</h2>
              <p className="text-blue-100 text-sm">مرحباً {currentUser?.name || 'المدير'}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-blue-700">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* محتوى اللوحة */}
        <div className="flex h-full">
          {/* التبويبات */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="dashboard" className="flex items-center space-x-2 space-x-reverse">
                  <BarChart3 className="w-4 h-4" />
                  <span>لوحة المعلومات</span>
                </TabsTrigger>
                <TabsTrigger value="analyses" className="flex items-center space-x-2 space-x-reverse">
                  <FileText className="w-4 h-4" />
                  <span>التحليلات</span>
                </TabsTrigger>
                <TabsTrigger value="subscribers" className="flex items-center space-x-2 space-x-reverse">
                  <Users className="w-4 h-4" />
                  <span>المشتركين</span>
                </TabsTrigger>
                <TabsTrigger value="revenue" className="flex items-center space-x-2 space-x-reverse">
                  <DollarSign className="w-4 h-4" />
                  <span>الإيرادات</span>
                </TabsTrigger>
                <TabsTrigger value="emails" className="flex items-center space-x-2 space-x-reverse">
                  <Mail className="w-4 h-4" />
                  <span>البريد الإلكتروني</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center space-x-2 space-x-reverse">
                  <Settings className="w-4 h-4" />
                  <span>الإعدادات</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6 overflow-y-auto h-full">
              {/* لوحة المعلومات */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">إجمالي المشتركين</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{siteStats.totalSubscribers}</div>
                      <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">المشتركين النشطين</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{siteStats.activeSubscribers}</div>
                      <p className="text-xs text-muted-foreground">91% معدل النشاط</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">الإيرادات الشهرية</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${siteStats.monthlyRevenue}</div>
                      <p className="text-xs text-muted-foreground">+8% من الشهر الماضي</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">إجمالي التحليلات</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{siteStats.totalAnalyses}</div>
                      <p className="text-xs text-muted-foreground">+3 هذا الأسبوع</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">مشاهدات الصفحة</CardTitle>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{siteStats.pageViews}</div>
                      <p className="text-xs text-muted-foreground">+15% من الأسبوع الماضي</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">معدل التحويل</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{siteStats.conversionRate}%</div>
                      <p className="text-xs text-muted-foreground">+0.5% من الشهر الماضي</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* إدارة التحليلات */}
              <TabsContent value="analyses" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">إدارة التحليلات</h3>
                  <div className="flex space-x-2 space-x-reverse">
                    <Button onClick={() => exportData('analyses')} variant="outline">
                      <Download className="w-4 h-4 ml-2" />
                      تصدير
                    </Button>
                    <Button onClick={() => setActiveTab('add-analysis')} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة تحليل
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {analyses.map((analysis) => (
                    <Card key={analysis.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 space-x-reverse mb-2">
                              <Badge variant="outline">{analysis.symbol}</Badge>
                              <h4 className="font-semibold">{analysis.companyNameAr}</h4>
                              <Badge className={
                                analysis.recommendation.includes('شراء') ? 'bg-green-100 text-green-800' :
                                analysis.recommendation.includes('بيع') ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }>
                                {analysis.recommendation}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{analysis.summary}</p>
                            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                              <span>السعر الحالي: ${analysis.currentPrice}</span>
                              <span>الهدف: ${analysis.targetPrice}</span>
                              <span>تاريخ النشر: {analysis.publishDate}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 space-x-reverse">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => deleteAnalysis(analysis.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* إدارة المشتركين */}
              <TabsContent value="subscribers" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">إدارة المشتركين</h3>
                  <Button onClick={() => exportData('subscribers')} variant="outline">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير قائمة المشتركين
                  </Button>
                </div>

                <div className="grid gap-4">
                  {subscribers.map((subscriber) => (
                    <Card key={subscriber.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 space-x-reverse mb-2">
                              <h4 className="font-semibold">{subscriber.name}</h4>
                              <Badge className={
                                subscriber.status === 'نشط' ? 'bg-green-100 text-green-800' :
                                subscriber.status === 'منتهي' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }>
                                {subscriber.status}
                              </Badge>
                              <Badge variant="outline">{subscriber.plan}</Badge>
                            </div>
                            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                              <span>{subscriber.email}</span>
                              <span>انضم: {subscriber.joinDate}</span>
                              <span>آخر دخول: {subscriber.lastLogin}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 space-x-reverse">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateSubscriberStatus(subscriber.id, subscriber.status === 'نشط' ? 'معلق' : 'نشط')}
                            >
                              {subscriber.status === 'نشط' ? 'تعليق' : 'تفعيل'}
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => deleteSubscriber(subscriber.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* إدارة الإيرادات */}
              <TabsContent value="revenue" className="space-y-6">
                <h3 className="text-lg font-semibold">تقارير الإيرادات</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>الإيرادات الشهرية</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">${siteStats.monthlyRevenue}</div>
                      <p className="text-sm text-gray-600 mt-2">إجمالي الإيرادات لهذا الشهر</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>توزيع الخطط</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>الأساسية</span>
                          <span>45%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>المتقدمة</span>
                          <span>35%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>الاحترافية</span>
                          <span>20%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* إدارة البريد الإلكتروني */}
              <TabsContent value="emails" className="space-y-6">
                <h3 className="text-lg font-semibold">إدارة البريد الإلكتروني</h3>
                <Card>
                  <CardHeader>
                    <CardTitle>إرسال رسالة جماعية</CardTitle>
                    <CardDescription>إرسال رسالة لجميع المشتركين أو مجموعة محددة</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="موضوع الرسالة" />
                    <Textarea placeholder="محتوى الرسالة" rows={6} />
                    <div className="flex space-x-2 space-x-reverse">
                      <Button className="bg-blue-600 hover:bg-blue-700">إرسال لجميع المشتركين</Button>
                      <Button variant="outline">إرسال للمشتركين النشطين فقط</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* الإعدادات */}
              <TabsContent value="settings" className="space-y-6">
                <h3 className="text-lg font-semibold">إعدادات الموقع</h3>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>إعدادات عامة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">كلمة مرور الموقع</label>
                        <Input type="password" placeholder="كلمة المرور الحالية" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">رسالة الصيانة</label>
                        <Textarea placeholder="رسالة تظهر أثناء الصيانة" />
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Save className="w-4 h-4 ml-2" />
                        حفظ الإعدادات
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>إعدادات Lemon Squeezy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="Store ID" />
                      <Input placeholder="API Key" type="password" />
                      <Input placeholder="Webhook Secret" type="password" />
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Save className="w-4 h-4 ml-2" />
                        حفظ إعدادات الدفع
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>إعدادات Zapier</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="Webhook URL" />
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Save className="w-4 h-4 ml-2" />
                        حفظ إعدادات الأتمتة
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;


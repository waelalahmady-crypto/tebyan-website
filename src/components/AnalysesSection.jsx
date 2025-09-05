import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  DollarSign, 
  Calendar,
  Target,
  AlertTriangle,
  BookOpen,
  Eye,
  Download
} from 'lucide-react';

const AnalysesSection = ({ currentUser }) => {
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalyses();
  }, []);

  const loadAnalyses = async () => {
    try {
      const response = await fetch('/src/data/analyses.json');
      const data = await response.json();
      setAnalyses(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading analyses:', error);
      setIsLoading(false);
    }
  };

  const getRecommendationColor = (recommendation) => {
    if (recommendation.includes('شراء')) return 'bg-green-100 text-green-800';
    if (recommendation.includes('بيع')) return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getRecommendationIcon = (recommendation) => {
    if (recommendation.includes('شراء')) return TrendingUp;
    if (recommendation.includes('بيع')) return TrendingDown;
    return BarChart3;
  };

  if (isLoading) {
    return (
      <section id="analyses" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل التحليلات...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="analyses" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            التحليلات التعليمية
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            تحليلات مفصلة للأسهم الأمريكية مع شرح تعليمي شامل
          </p>
          <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
            مرحباً {currentUser?.name || 'عضو'} - خطة {currentUser?.plan || 'الأساسية'}
          </Badge>
        </div>

        {selectedAnalysis ? (
          // عرض التحليل المفصل
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setSelectedAnalysis(null)}
              className="mb-6"
            >
              ← العودة للقائمة
            </Button>

            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {selectedAnalysis.symbol}
                    </Badge>
                    <div>
                      <CardTitle className="text-2xl">{selectedAnalysis.companyNameAr}</CardTitle>
                      <CardDescription>{selectedAnalysis.companyName}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getRecommendationColor(selectedAnalysis.recommendation)}>
                    {selectedAnalysis.recommendation}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">${selectedAnalysis.currentPrice}</div>
                    <div className="text-sm text-gray-600">السعر الحالي</div>
                  </div>
                  <div className="text-center">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">${selectedAnalysis.targetPrice}</div>
                    <div className="text-sm text-gray-600">السعر المستهدف</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round(((selectedAnalysis.targetPrice - selectedAnalysis.currentPrice) / selectedAnalysis.currentPrice) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">الإمكانية المتوقعة</div>
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {selectedAnalysis.summary}
                </p>

                <Tabs defaultValue="technical" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="technical">التحليل الفني</TabsTrigger>
                    <TabsTrigger value="fundamental">التحليل الأساسي</TabsTrigger>
                    <TabsTrigger value="educational">الملاحظات التعليمية</TabsTrigger>
                    <TabsTrigger value="risks">المخاطر</TabsTrigger>
                  </TabsList>

                  <TabsContent value="technical" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 space-x-reverse">
                          <BarChart3 className="w-5 h-5" />
                          <span>التحليل الفني</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">المؤشرات الفنية</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>الاتجاه العام:</span>
                                <Badge variant="outline">{selectedAnalysis.technicalAnalysis.trend}</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>مؤشر RSI:</span>
                                <span className="font-semibold">{selectedAnalysis.technicalAnalysis.rsi}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>MACD:</span>
                                <Badge variant="outline">{selectedAnalysis.technicalAnalysis.macd}</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>حجم التداول:</span>
                                <Badge variant="outline">{selectedAnalysis.technicalAnalysis.volume}</Badge>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3">مستويات الدعم والمقاومة</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>مستوى الدعم:</span>
                                <span className="font-semibold text-green-600">${selectedAnalysis.technicalAnalysis.support}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>مستوى المقاومة:</span>
                                <span className="font-semibold text-red-600">${selectedAnalysis.technicalAnalysis.resistance}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="fundamental" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 space-x-reverse">
                          <DollarSign className="w-5 h-5" />
                          <span>التحليل الأساسي</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>نسبة السعر للأرباح (P/E):</span>
                              <span className="font-semibold">{selectedAnalysis.fundamentalAnalysis.peRatio}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>نمو الإيرادات:</span>
                              <span className="font-semibold text-green-600">{selectedAnalysis.fundamentalAnalysis.revenue}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>نمو الأرباح:</span>
                              <span className="font-semibold text-green-600">{selectedAnalysis.fundamentalAnalysis.earnings}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>القيمة السوقية:</span>
                              <span className="font-semibold">{selectedAnalysis.fundamentalAnalysis.marketCap}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="educational" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 space-x-reverse">
                          <BookOpen className="w-5 h-5" />
                          <span>الملاحظات التعليمية</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-3">نقاط التعلم الرئيسية:</h4>
                            <ul className="space-y-2">
                              {selectedAnalysis.educationalNotes.map((note, index) => (
                                <li key={index} className="flex items-start space-x-3 space-x-reverse">
                                  <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700">{note}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">أهداف التعلم:</h4>
                            <ul className="space-y-2">
                              {selectedAnalysis.learningObjectives.map((objective, index) => (
                                <li key={index} className="flex items-start space-x-3 space-x-reverse">
                                  <Target className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700">{objective}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="risks" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 space-x-reverse">
                          <AlertTriangle className="w-5 h-5" />
                          <span>عوامل المخاطرة</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {selectedAnalysis.riskFactors.map((risk, index) => (
                            <li key={index} className="flex items-start space-x-3 space-x-reverse">
                              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{risk}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="flex items-start space-x-3 space-x-reverse">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-yellow-800 mb-2">تنويه مهم</h4>
                              <p className="text-yellow-700 text-sm">
                                هذا التحليل لأغراض تعليمية فقط وليس نصيحة استثمارية. 
                                الاستثمار في الأسهم ينطوي على مخاطر وقد تتعرض لخسائر. 
                                يرجى استشارة مستشار مالي مؤهل قبل اتخاذ أي قرارات استثمارية.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="flex items-center space-x-2 space-x-reverse">
                    <Download className="w-4 h-4" />
                    <span>تحميل التحليل كـ PDF</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // عرض قائمة التحليلات
          <div className="grid lg:grid-cols-2 gap-8">
            {analyses.map((analysis) => {
              const RecommendationIcon = getRecommendationIcon(analysis.recommendation);
              
              return (
                <Card key={analysis.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          {analysis.symbol}
                        </Badge>
                        <div>
                          <CardTitle className="text-xl">{analysis.companyNameAr}</CardTitle>
                          <CardDescription>{analysis.companyName}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getRecommendationColor(analysis.recommendation)}>
                        {analysis.recommendation}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">${analysis.currentPrice}</div>
                        <div className="text-xs text-gray-600">السعر الحالي</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">${analysis.targetPrice}</div>
                        <div className="text-xs text-gray-600">الهدف</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${
                          analysis.targetPrice > analysis.currentPrice ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {Math.round(((analysis.targetPrice - analysis.currentPrice) / analysis.currentPrice) * 100)}%
                        </div>
                        <div className="text-xs text-gray-600">الإمكانية</div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {analysis.summary}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{analysis.publishDate}</span>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => setSelectedAnalysis(analysis)}
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <Eye className="w-4 h-4" />
                        <span>عرض التحليل</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!selectedAnalysis && analyses.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد تحليلات متاحة</h3>
            <p className="text-gray-600">سيتم إضافة تحليلات جديدة قريباً</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnalysesSection;


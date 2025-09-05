import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, TrendingUp } from 'lucide-react';
import { siteSettings } from '../data/content';

const PasswordProtection = ({ onPasswordCorrect }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // محاكاة تأخير للتحقق
    setTimeout(() => {
      if (password === siteSettings.sitePassword) {
        onPasswordCorrect();
      } else {
        setError('كلمة المرور غير صحيحة');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">تبيان</CardTitle>
          <CardDescription className="text-gray-600">
            منصة تعليم تحليل الأسهم الأمريكية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <Lock className="mx-auto mb-2 w-12 h-12 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">منطقة محمية</h2>
            <p className="text-sm text-gray-600">
              يرجى إدخال كلمة المرور للوصول إلى المحتوى
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center"
                disabled={isLoading}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading || !password}
            >
              {isLoading ? 'جاري التحقق...' : 'دخول'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              هذا الموقع مؤقتاً أثناء تسليم المحتوى
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordProtection;


/**
 * Error Boundary Component
 * React component hatalarını yakalayan ve kullanıcı dostu hata mesajları gösteren component
 *
 * @component
 */

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    // Bir sonraki render'da fallback UI göstermek için state'i güncelle
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Hata detaylarını state'e kaydet
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Production'da error tracking servisi kullanılabilir
    // Örnek: Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === 'production') {
      // Burada error tracking servisi çağrılabilir
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    } else {
      // Development'ta console'a detaylı log
      console.group('🚨 Error Boundary Caught Error');
      console.error('Error:', error);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }
  }

  handleReset = () => {
    // State'i resetle ve sayfayı yenilemeye çalış
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReload = () => {
    // Sayfayı tamamen yenile
    window.location.reload();
  };

  handleGoHome = () => {
    // Ana sayfaya yönlendir
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
          <div className="max-w-2xl w-full">
            {/* Error Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 animate-slideUp">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-scaleIn">
                  <AlertTriangle size={48} className="text-red-600" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
                Bir Hata Oluştu
              </h1>

              {/* Message */}
              <p className="text-gray-600 text-center mb-8 text-lg">
                Üzgünüz, beklenmeyen bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin veya ana sayfaya dönün.
              </p>

              {/* Development: Error Details */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-8 p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="text-sm font-semibold text-red-800 mb-2">
                    Hata Detayları (Development Mode):
                  </h3>
                  <p className="text-xs text-red-700 font-mono mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-2">
                      <summary className="text-xs text-red-700 cursor-pointer hover:text-red-900">
                        Component Stack
                      </summary>
                      <pre className="text-xs text-red-600 mt-2 overflow-auto max-h-48 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="primary"
                  icon={RefreshCw}
                  onClick={this.handleReload}
                  className="flex-1 sm:flex-none"
                >
                  Sayfayı Yenile
                </Button>

                <Button
                  variant="outline"
                  icon={Home}
                  onClick={this.handleGoHome}
                  className="flex-1 sm:flex-none"
                >
                  Ana Sayfaya Dön
                </Button>
              </div>

              {/* Error Count */}
              {this.state.errorCount > 1 && (
                <p className="text-center text-sm text-gray-500 mt-6">
                  Bu hata {this.state.errorCount} kez oluştu
                </p>
              )}

              {/* Support Info */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  Sorun devam ederse lütfen{' '}
                  <a
                    href="mailto:support@ruyavip.com"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    destek ekibimizle
                  </a>{' '}
                  iletişime geçin.
                </p>
              </div>
            </div>

            {/* Additional Help */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Error ID: {Date.now().toString(36).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Normal durumda children'ı render et
    return this.props.children;
  }
}

/**
 * Functional Error Boundary Wrapper
 * Hook tabanlı component'lerde kullanım kolaylığı için
 */
export const withErrorBoundary = (Component, fallback) => {
  return (props) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

export default ErrorBoundary;

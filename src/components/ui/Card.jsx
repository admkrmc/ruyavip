import React from 'react';

export const Card = ({ children, className = '', hover = true, gradient = false }) => {
  const baseStyles = 'bg-white rounded-xl shadow-md p-6 transition-all duration-300';
  const hoverStyles = hover ? 'hover:shadow-xl hover:scale-[1.02]' : '';
  const gradientStyles = gradient ? 'bg-gradient-to-br from-purple-50 to-pink-50' : '';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${gradientStyles} ${className}`}>
      {children}
    </div>
  );
};

export const StatCard = ({ title, value, icon: Icon, trend, color = 'purple' }) => {
  const colorClasses = {
    purple: 'from-purple-500 to-pink-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-red-500'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
          {trend && (
            <p className="text-white/70 text-xs flex items-center gap-1">
              <span className={trend.direction === 'up' ? 'text-green-200' : 'text-red-200'}>
                {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
              </span>
              <span>bu ay</span>
            </p>
          )}
        </div>
        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
          <Icon className="text-white" size={32} />
        </div>
      </div>
    </div>
  );
};

export const InfoCard = ({ title, description, icon: Icon, action }) => {
  return (
    <Card hover className="cursor-pointer group">
      <div className="flex items-start gap-4">
        <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
          <Icon className="text-purple-600" size={24} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
          {action && (
            <button className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
              {action.label} →
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

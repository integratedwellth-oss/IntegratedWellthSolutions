import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-brand-900 mb-8">Admin Strategy Command</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-500 uppercase text-xs mb-2">Total Inquiries</h3>
            <p className="text-4xl font-black text-brand-900">12</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-500 uppercase text-xs mb-2">Active Assessments</h3>
            <p className="text-4xl font-black text-brand-gold">5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

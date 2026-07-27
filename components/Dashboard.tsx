const ADMIN_EMAILS = [
  'enquiries@integratedwellth.co.za',
  'marcia@integratedwellth.co.za'
];

// Inside Dashboard component, before any data fetching:
const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

if (!isAdmin) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🔒</span>
        </div>
        <h2 className="text-xl font-bold text-red-600 mb-2">Access Denied</h2>
        <p className="text-gray-600">You do not have permission to view the Intelligence Hub.</p>
      </div>
    </div>
  );
}

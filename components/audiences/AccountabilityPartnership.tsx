// Fix the broken return statement:
return (
  <div className="pt-20 bg-gray-50 font-sans">
    {/* HERO SECTION */}
    <section className="bg-brand-900 text-white py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-brand-100 mb-6 border border-white/10 backdrop-blur-sm">
            <HeartHandshake size={20} className="text-brand-gold"/>
            <span className="font-medium font-sora tracking-wide text-brand-gold">
              IWS Sovereign Membership
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-sora font-bold mb-6 leading-tight">
            The "Lonely Journey"<br/>Ends Here
          </h1>
          <p className="text-xl text-brand-100 max-w-3xl mx-auto leading-relaxed font-light">
            Specialized psychological support for the unique demands of entrepreneurship.
            Protecting your most valuable asset: <span className="text-white font-bold underline decoration-brand-gold underline-offset-4">Your Mind.</span>
          </p>
        </motion.div>
      </div>
    </section>
    
    {/* ... rest of the component ... */}
    
    <ApplicationModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      packageName={selectedPackage}
    />
  </div>
);

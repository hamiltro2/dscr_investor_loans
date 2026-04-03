import fs from 'fs';

const filePath = 'c:/Users/hamil/dscr_loan_leads/src/app/page.tsx';
const content = fs.readFileSync(filePath, 'utf8');

const heroStartIdx = content.indexOf('{/* Hero Section */}');
const nextSectionIdx = content.indexOf('{/* Features Section */}');

if (heroStartIdx === -1 || nextSectionIdx === -1) {
  console.log('Could not find sections to replace');
  process.exit(1);
}

const newHero = `      {/* Hero Section */}
      <section className="relative isolate pt-14 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Text Section */}
          <div className="text-center max-w-4xl mx-auto mb-12 space-y-6">
            <div>
              <h1 className="title-glow font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-4">
                <span className="block text-white font-light text-xl sm:text-2xl uppercase tracking-[0.2em] mb-4 opacity-80">
                  Our Promise
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">
                  No Investor
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 -mt-2">
                  Left Behind
                </span>
              </h1>
              <p className="text-xl text-emerald-100/90 font-light max-w-2xl mx-auto">
                Direct-to-borrower financing. Experience our streamlined process and close your investment fast!
              </p>
            </div>

            {/* Highlights & Social Proof */}
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-full border border-dark-700/50">
                <span className="text-white font-medium text-lg">5.5%</span>
                <span className="text-dark-300 text-sm">Rates From</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-full border border-dark-700/50">
                <span className="text-white font-medium text-lg">15%</span>
                <span className="text-dark-300 text-sm">Down Payment</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-full border border-emerald-500/30">
                <span className="text-emerald-400 font-medium text-sm uppercase tracking-wider">Fast Closing</span>
              </div>
            </div>
          </div>

          {/* Bottom Layout: Video (Left) + Form (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start justify-items-center">
            
            {/* Left Column: Video & Socials */}
            <div className="w-full flex flex-col items-center lg:items-end lg:pr-8">
              {/* YouTube Video with Brian (Short) */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group w-[340px] max-w-full lg:mr-0 z-10 transition-transform duration-500 ease-in-out hover:-translate-y-1">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-dark-900 border border-white/5">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/Z7hbEyf-AQ4?autoplay=0&loop=1&playlist=Z7hbEyf-AQ4&controls=1" 
                    title="Brian from Southern California" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                  </iframe>
                </div>
              </div>

              {/* Social Accounts */}
              <div className="flex items-center gap-4 pt-6 w-[340px] justify-center lg:justify-end">
                <span className="text-white/60 text-sm uppercase tracking-wider">Follow Us</span>
                <a href="#" className="text-white/40 hover:text-blue-400 transition-colors">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="text-white/40 hover:text-blue-600 transition-colors">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className="text-white/40 hover:text-pink-600 transition-colors">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069v-2.162c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-2.209 0-4 1.79-4 4s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4zm0 6.636c-1.456 0-2.636-1.18-2.636-2.636s1.18-2.636 2.636-2.636 2.636 1.18 2.636 2.636-1.18 2.636-2.636 2.636zm5.244-7.514c.594 0 1.077-.483 1.077-1.077s-.483-1.077-1.077-1.077-1.077.483-1.077 1.077.483 1.077 1.077 1.077z"/></svg>
                </a>
              </div>
            </div>

            {/* Right Column: MultiStepForm */}
            <div className="w-full flex justify-center lg:justify-start lg:pl-8">
              <div className="relative w-full max-w-[480px] z-10 transition-transform duration-500 ease-in-out hover:-translate-y-1 mt-8 lg:mt-0">
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/30 to-blue-500/20 rounded-3xl blur-md opacity-60"></div>
                <div className="relative bg-dark-900/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-4 sm:p-6 pb-2 min-h-[400px]">
                  <div className="flex items-center justify-between mb-4 pl-2 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                      <h3 className="text-xl font-bold text-white tracking-wide">Get Pre-Qualified Now</h3>
                    </div>
                    {/* Advertiser Disclosure Trigger */}
                    <button
                      onClick={() => setShowDisclosureModal(true)}
                      className="text-xs text-white/50 hover:text-white/80 transition-colors duration-300 underline"
                    >
                      Disclosure
                    </button>
                  </div>
                  <Suspense fallback={
                    <div className="animate-pulse space-y-4 pt-4">
                      <div className="h-4 w-1/4 bg-dark-800 rounded"></div>
                      <div className="h-12 bg-dark-800 rounded"></div>
                      <div className="h-4 w-1/4 bg-dark-800 rounded mt-6"></div>
                      <div className="h-12 bg-dark-800 rounded"></div>
                    </div>
                  }>
                    <div className="hero-form-wrapper">
                       <MultiStepForm />
                    </div>
                  </Suspense>
                </div>
              </div>
            </div>

          </div>
          
          <div className="text-center mt-12 mb-4">
            <a
              href="tel:+19493393555"
              className="inline-flex items-center gap-3 text-lg sm:text-xl font-light text-white/80 hover:text-white transition-colors duration-300"
              onClick={() => window.gtag && window.gtag('event', 'conversion', { 'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D' })}
            >
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Questions? Call Us: (949) 339-3555
            </a>
          </div>
        </div>
      </section>
`;

const topPart = content.slice(0, heroStartIdx);
const bottomPart = content.slice(nextSectionIdx);

const newContent = topPart + newHero + bottomPart;
fs.writeFileSync(filePath, newContent);
console.log('Successfully updated page.tsx with new hero layout');

export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse">
      {/* Header Skeleton */}
      <section className="bg-gradient-dark py-16">
        <div className="container">
          <div className="h-10 w-3/4 bg-dark-800 rounded mb-4"></div>
          <div className="h-6 w-1/2 bg-dark-800 rounded"></div>
        </div>
      </section>

      {/* Solutions Grid Skeleton */}
      <section className="py-20 bg-dark-950">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card card-primary relative overflow-hidden">
                <div className="w-12 h-12 bg-dark-800 rounded-full mb-4"></div>
                <div className="h-6 w-3/4 bg-dark-800 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-dark-800 rounded"></div>
                  <div className="h-4 bg-dark-800 rounded"></div>
                  <div className="h-4 w-2/3 bg-dark-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

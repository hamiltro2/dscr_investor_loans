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

      {/* Calculator Grid Skeleton */}
      <section className="py-20 bg-dark-950">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="card card-primary">
                <div className="space-y-4">
                  <div className="h-8 w-1/2 bg-dark-800 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-dark-800 rounded"></div>
                    <div className="h-4 w-3/4 bg-dark-800 rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-10 bg-dark-800 rounded"></div>
                    <div className="h-10 bg-dark-800 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

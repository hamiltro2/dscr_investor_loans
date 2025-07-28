import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactInfo() {
  return (
    <section className="py-20 bg-dark-950">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-bold mb-8 text-dark-50">
            Have Questions? Get in Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-primary-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1 text-dark-100">Phone</h3>
                <p className="text-dark-200">
                  (949) 614-6360
                </p>
                <p className="text-sm text-dark-300">
                  Monday - Friday, 9am - 5pm PST
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-primary-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1 text-dark-100">Email</h3>
                <p className="text-dark-200">
                  info@dscrloans.com
                </p>
                <p className="text-sm text-dark-300">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1 text-dark-100">Office</h3>
                <p className="text-dark-200">
                  123 Business Ave, Suite 100<br />
                  Los Angeles, CA 90012
                </p>
                <p className="text-sm text-dark-300">
                  By appointment only
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

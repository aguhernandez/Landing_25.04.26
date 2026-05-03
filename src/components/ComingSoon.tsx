import { ArrowRight } from 'lucide-react';

interface ComingSoonProps {
  t: {
    comingSoon?: {
      title: string;
      subtitle: string;
      cta: string;
    };
  };
}

export function ComingSoon({ t }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              {t.comingSoon?.title || 'Coming Soon'}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t.comingSoon?.subtitle || 'The all-in-one platform for athletes'}
            </p>
            <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              {t.comingSoon?.cta || 'Learn More'}
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/cycliste_eating.jpg"
              alt="Athlete"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

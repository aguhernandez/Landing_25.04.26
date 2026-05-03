import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useState } from 'react';

export default function NutritionPlanning() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-20">
          <div className="relative h-[600px] mb-12 rounded-xl overflow-hidden">
            <img
              src="/nutrition_sport.jpg"
              alt="healthy nutrition meal"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/0 to-transparent"></div>
            <div className="absolute inset-0 flex items-end justify-center pb-16">
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-krona font-bold tracking-tight">
                  <span className="block">FUEL YOUR</span>
                  <span className="block">PEAK PERFORMANCE.</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Science-based nutrition planning for every sport and every athlete. Optimize your energy, recovery, and long-term athletic development with personalized nutrition strategies.
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-4">
              Fully integrated with the Asciende App for meal tracking, macro monitoring, and performance optimization.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4">How it Works</h2>
          <p className="text-center text-lg text-gray-600 mb-16">Personalized nutrition for your unique athletic needs.</p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col">
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=400&h=280"
                  alt="consultation"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Free 20-min Consultation</h3>
              <p className="text-gray-700 mb-3">No pressure. No commitment.</p>
              <p className="text-gray-600">
                We discuss your sport, current nutrition habits, dietary preferences, restrictions, and performance goals.
                You'll gain clarity on what your body actually needs.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <div className="bg-amber-50 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-amber-900 mb-2">60-min Assessment</h3>
                    <p className="text-amber-700 text-sm">Complete Nutritional Analysis</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">2. 60-min Onboarding Session</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Body composition & metabolic assessment</li>
                <li>• Sport-specific caloric & macro requirements</li>
                <li>• Meal timing & fueling strategies</li>
                <li>• Annual nutrition plan aligned with your season</li>
              </ul>
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <img
                  src="/cycliste_eating.jpg"
                  alt="meal planning"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Your Personalized Nutrition Plan</h3>
              <p className="text-gray-600">
                Monthly nutrition blocks, meal examples, macro tracking, hydration protocols, and supplement guidance tailored to your training load and competition schedule.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4">What's Included</h2>
          <p className="text-center text-lg text-gray-600 mb-16">Everything for your nutrition success.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95">
              <div className="text-2xl font-bold mb-4 text-purple-700">🔎 Complete Nutrition Assessment</div>
              <p className="text-gray-700 mb-4">A full onboarding to understand your metabolism, habits, constraints, preferences, and goals. Includes a 24–48h dietary recall, food-frequency questionnaire, and lifestyle analysis.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95">
              <div className="text-2xl font-bold mb-4 text-purple-700">🍽️ Fully Tailored Nutrition Plan</div>
              <p className="text-gray-700 mb-4">Personalized macros, micros, daily structure, meal templates, and grocery lists designed for performance, recovery, and body composition — all delivered inside the Asciende App.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95">
              <div className="text-2xl font-bold mb-4 text-purple-700">📱 Tracking Inside the Asciende App</div>
              <p className="text-gray-700 mb-4">Everything in one place: food logs, adherence, reminders, and habit tracking. Easy, intuitive, and built specifically for athletes.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95">
              <div className="text-2xl font-bold mb-4 text-purple-700">📊 Anthropometrics + Body Composition</div>
              <p className="text-gray-700 mb-4">Integrated tracking of weight, girths, optional skinfold data, and visual trends. The app connects your nutrition progress with your training load and recovery metrics.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95 md:col-span-2">
              <div className="text-2xl font-bold mb-4 text-purple-700">💬 Weekly Adjustments & Professional Feedback</div>
              <p className="text-gray-700">Every week you receive expert review and tweaks to ensure progress even with real-life changes. You're never following a static plan.</p>
            </div>
          </div>
        </section>


        <section className="mb-20 relative h-[600px] rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{backgroundImage: "url('/nutrition_plate.jpg')"}}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex items-center">
            <div className="w-full md:pl-20">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-krona font-bold text-white mb-4">Ready to Optimize Your Nutrition?</h2>
                <p className="text-xl text-white mb-8">
                  Professional nutrition planning for athletes of all levels and every sport.
                </p>
                <div className="mb-8">
                  <p className="text-4xl font-krona font-bold text-white line-through mb-2">€149/month</p>
                  <p className="text-5xl font-krona font-bold text-asciende-yellow mb-4">€89/month</p>
                  <p className="text-sm text-white font-krona">*First 20 founding members, lifetime, while active</p>
                </div>
                <h3 className="text-2xl font-bold text-white mb-8">Includes:</h3>
                <ul className="max-w-2xl space-y-4 text-lg text-white mb-12">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                    Full Access to Asciende Membership
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                    Personalized nutrition plan & monthly blocks
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                    Meal tracking and nutritional guidance
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                    Hydration & supplement protocols
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                    Training integration inside Asciende HUB
                  </li>
                </ul>
                <p className="text-gray-200 mb-8">Prefer to talk first?</p>
                <button onClick={() => setIsModalOpen(true)} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-lg transition">
                  Book a free 20-minute consultation
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="bg-gradient-to-br from-purple-50 to-white p-12 rounded-xl border border-purple-100 opacity-95">
            <div className="flex gap-8 items-center">
              <div className="flex-1">
                <h2 className="text-4xl font-krona font-bold mb-8">Who designs your plan?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Your program is created directly by me — Agu Hernández — 15 years working as a sports nutritionist and performance specialist, MSc. in Physiology and High Performance, with experience working with athletes in Europe, South America, and East Africa.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  I combine scientific methods, real-world coaching, anthropometry tracking, and the app designed based on my experience, ASCIENDE HUB, to give you a clear, personalized system that actually improves performance.
                </p>
                <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-asciende-purple hover:bg-asciende-purple/90 text-white font-krona font-bold py-3 px-6 rounded-lg transition">
                  Learn more about Agu
                </button>
              </div>
              <div className="flex-shrink-0">
                <img
                  src="/fotos-charla-deportes-unl_(1).jpg"
                  alt="Agustín Hernández"
                  className="rounded-xl shadow-lg w-48 h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <p className="text-lg text-gray-700 mb-4">
              "The nutrition plan completely changed how I feel during training. I have more energy, better recovery, and my performance metrics have improved significantly!"
            </p>
            <p className="font-bold text-gray-900">Maria Garcia</p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-krona font-bold text-center mb-12">Frequently asked questions</h2>

          <div className="space-y-8">
            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">1. Do I need to follow a specific diet?</h3>
              <p className="text-gray-700">
                No. The nutrition plan is completely customizable to your preferences, dietary restrictions, and lifestyle. We work with what you like to eat, not against it.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">2. How often do we adjust the plan?</h3>
              <p className="text-gray-700">
                Monthly. As your training load changes with your season, so does your nutrition. We continuously adapt to keep you performing at your best.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">3. Do I need to count every calorie?</h3>
              <p className="text-gray-700">
                Not necessarily. We provide simple tracking systems that work for your lifestyle. Some athletes use macro tracking, others use visual guides. You choose what works best.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">4. Can you work with allergies and intolerances?</h3>
              <p className="text-gray-700">
                Absolutely. Allergies, intolerances, and dietary preferences are completely accommodated. Your nutrition plan is built around your needs and constraints.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">5. Is supplementation necessary?</h3>
              <p className="text-gray-700">
                No. We focus first on nutrition from whole foods. Supplements are only recommended when they provide real performance benefits for your specific sport.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">6. Will nutrition support improve my performance?</h3>
              <p className="text-gray-700">
                Yes. Proper nutrition is one of the biggest performance multipliers. When you fuel correctly, you train harder, recover better, and see significant performance gains.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">7. What happens after the free 20-minute call?</h3>
              <p className="text-gray-700">
                If you decide to start, we schedule your 60-minute onboarding where we do a comprehensive nutritional assessment. Then your personalized plan begins immediately.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="relative h-[600px] rounded-xl overflow-hidden">
            <img
              src="/cycliste_eating.jpg"
              alt="cyclist eating"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <h2 className="text-5xl md:text-6xl font-krona font-bold mb-8">I want to start my Ascent now</h2>
              <p className="text-xl md:text-2xl mb-12 max-w-2xl">
                Ready to optimize your nutrition and performance? Let's discuss your goals.
              </p>
              <button onClick={() => setIsModalOpen(true)} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-lg transition">
                Get in Touch
              </button>
            </div>
          </div>
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                src="https://scheduler.zoom.us/agu-hernandez/athlete-assessment-call"
                className="w-full h-[80vh]"
                frameBorder="0"
                title="Book a free 20-minute consultation"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

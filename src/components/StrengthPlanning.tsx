import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useState } from 'react';

export default function StrengthPlanning() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-20">
          <div className="relative h-[600px] mb-12 rounded-xl overflow-hidden">
            <img
              src="/gym_barbel_woman.jpg"
              alt="woman lifting barbell"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/0 to-transparent"></div>
            <div className="absolute inset-0 flex items-end justify-center pb-16">
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-krona font-bold tracking-tight">
                  <span className="block">STRONGER. FASTER.</span>
                  <span className="block">BUILT FOR YOUR SPORT.</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional strength planning for every sport, (Beach Volleyball, Cycling, Running, etc.) and all athletes who need a smarter system to improve power, durability, and long-term performance.
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-4">
              Integrated with the Asciende App for tracking, technique, progress and athletic development.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4">How it Works</h2>
          <p className="text-center text-lg text-gray-600 mb-16">We treat each athlete uniquely.</p>

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
                We define your goals, context, time availability, injuries and training history.
                You get clarity on what you actually need.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <div className="bg-blue-50 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">60-min Onboarding</h3>
                    <p className="text-blue-700 text-sm">Full Assessment inside the App</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">2. 60-min Onboarding Session</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Movement screening & strength levels</li>
                <li>• Equipment access & jump profile</li>
                <li>• Training zones: RIR, RPE, velocity</li>
                <li>• Annual Training Plan based on your season</li>
              </ul>
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=400&h=280"
                  alt="strength training"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Your Personalized Strength Plan</h3>
              <p className="text-gray-600">
                Monthly training blocks, progressions, warm-ups, mobility, and primary/secondary lifts with tracking for load, tonnage, RIR/RPE, and velocity.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4">What's Included</h2>
          <p className="text-center text-lg text-gray-600 mb-16">Everything for your strength development and athletic performance.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95">
              <div className="text-2xl font-bold mb-4 text-purple-700">🏋️ Personalized Strength Training</div>
              <p className="text-gray-700 mb-4">Full strength programming for your sport: beach volleyball, cycling, running, team sports or general athletic development. Built with clear structure, progression and load management using RIR, RPE and optional velocity-based training.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95">
              <div className="text-2xl font-bold mb-4 text-purple-700">📋 Annual Training Plan</div>
              <p className="text-gray-700 mb-2">• Periodization according to your season</p>
              <p className="text-gray-700 mb-2">• Monthly training blocks</p>
              <p className="text-gray-700 mb-2">• Warm-ups, mobility & activation work</p>
              <p className="text-gray-700 mb-2">• Primary & accessory lifts</p>
              <p className="text-gray-700">• Progressions designed to build strength & power</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95">
              <div className="text-2xl font-bold mb-4 text-purple-700">📊 Load Tracking & Monitoring</div>
              <p className="text-gray-700 mb-2">Integrated tracking inside the app:</p>
              <p className="text-gray-700 mb-2">• Volume, tonnage, progression</p>
              <p className="text-gray-700 mb-2">• RIR/RPE-based prescription</p>
              <p className="text-gray-700 mb-2">• Optional bar velocity integration</p>
              <p className="text-gray-700">• Weekly updates and coaching adjustments</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95">
              <div className="text-2xl font-bold mb-4 text-purple-700">🎥 Technique & Coaching Feedback</div>
              <p className="text-gray-700 mb-2">• Video demos for 1500+ exercises</p>
              <p className="text-gray-700 mb-2">• Technique review for key lifts</p>
              <p className="text-gray-700 mb-2">• Clear cues and execution notes</p>
              <p className="text-gray-700">• All inside the Asciende App</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95 md:col-span-2">
              <div className="text-2xl font-bold mb-4 text-purple-700">📱 Full App Integration</div>
              <p className="text-gray-700 mb-2">Everything inside the Asciende App:</p>
              <p className="text-gray-700 mb-2">• Training calendar & load tracking • Body composition & nutrition integration • Messaging for adjustments • Technique videos and mobility work</p>
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

        <section className="mb-20 relative h-[600px] rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1513352098199-8ccf457b35a8?auto=format&fit=crop&w=1920')"}}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex items-center">
            <div className="w-full md:pl-20">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-krona font-bold text-white mb-4">Ready to Improve your performance?</h2>
                <p className="text-5xl font-krona font-bold text-white mb-8">€89/mes</p>
                <h3 className="text-2xl font-bold text-white mb-8">Includes:</h3>
                <ul className="max-w-2xl space-y-4 text-lg text-white mb-12">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                    Full Access to Asciende Membership
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                    Annual plan & Monthly blocks, progressions
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                    Tracking and coaching support
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                    Optional VBT guidance
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                    Nutrition alignment inside Asciende HUB
                  </li>
                </ul>
                <p className="text-gray-200 mb-8">Prefer to talk first?</p>
                <button onClick={() => setIsModalOpen(true)} className="bg-asciende-purple hover:bg-asciende-purple/90 text-white font-bold py-4 px-8 rounded-lg transition">
                  Book a free 20-minute consultation
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-krona font-bold text-center mb-12">Frequently asked questions</h2>

          <div className="space-y-8">
            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">1. What do I need to get started?</h3>
              <p className="text-gray-700">
                Nothing. Just the desire to improve your performance, training, habits, and nutrition.
                I provide all the tools you need — including the Asciende HUB app, which I designed based on real feedback from athletes like you.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">2. Are the plans monthly?</h3>
              <p className="text-gray-700">
                Yes. All plans are monthly.
                Pricing varies depending on how much contact you want with me, the amount of work involved, and how often your plan may need adjustments due to changes or unexpected events.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">3. How much feedback do I get?</h3>
              <p className="text-gray-700">
                It depends on the service you choose — but I never hold back knowledge.
                My goal is always the same: to help you improve as effectively and sustainably as possible.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">4. Do I need the Asciende app?</h3>
              <p className="text-gray-700">
                You don't need it, but I highly recommend it.
                The app was built from the real experiences and needs of other athletes, and as an Asciende athlete, you get full access for free.
                Not using it would simply mean missing out — though you're free to use any other app you prefer.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">5. Is strength training included?</h3>
              <p className="text-gray-700">
                Yes. Your gym work is fully integrated, adapted to your season, and aligned with your cycling load.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">6. Do I need VBT tools?</h3>
              <p className="text-gray-700">
                No. VBT is optional. If you don't have technology to measure bar speed, we train without it. If you send videos, I can use them occasionally, but it's not required.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">7. What happens after the free 20-minute call?</h3>
              <p className="text-gray-700">
                If you decide to start, we schedule a 60-minute onboarding session to review your history, goals, testing, and lifestyle. Then your plan starts immediately.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="relative h-[600px] rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1758875569256-f37c438cac65?auto=format&fit=crop&w=1920"
              alt="woman lifting with trainer"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <h2 className="text-5xl md:text-6xl font-krona font-bold mb-8">I want to start my Ascent now</h2>
              <p className="text-xl md:text-2xl mb-12 max-w-2xl">
                Ready to get started? Let's discuss your strength planning goals.
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

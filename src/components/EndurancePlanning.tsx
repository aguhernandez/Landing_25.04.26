import { ArrowRight, CheckCircle2, Star, X } from 'lucide-react';
import { useState } from 'react';

export default function EndurancePlanning() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-20">
          <div className="relative h-[600px] mb-12 rounded-xl overflow-hidden">
            <img
              src="/cyclist_in_hill.jpg"
              alt="cyclist riding on road"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/0 to-transparent"></div>
            <div className="absolute inset-0 flex items-end justify-center pb-16">
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-krona font-bold tracking-tight">
                  <span className="block">CYCLING PERFORMANCE</span>
                  <span className="block">COACHING.</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              High-performance training that integrates cycling, strength & sports nutrition — in one personalized system.
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
                We'll talk about your goals, your current training, your lifestyle, and where you want to go.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <img
                  src="https://media.istockphoto.com/id/2175379345/photo/young-asian-cyclists-chatting-outdoors.jpg?s=612x612&w=0&k=20&c=cajTLD2iOYdMmJDmiPdJiW8sibiCgvSX-aY0j72V4Ik="
                  alt="cyclists chatting"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">2. 60-min Onboarding Session</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Load history & testing protocol analysis</li>
                <li>• Nutritional profile assessment</li>
                <li>• Gym experience & schedule review</li>
                <li>• Integrated cycling + strength + nutrition plans</li>
              </ul>
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <img
                  src="/cyclist_in_mountiain.jpg"
                  alt="cyclist in mountain"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Your Integrated Training System</h3>
              <p className="text-gray-600">
                Fully personalized cycling, strength & nutrition plans, all integrated and in constant communication within the Asciende HUB app.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4">What's Included</h2>
          <p className="text-center text-lg text-gray-600 mb-16">Everything you need for complete cycling performance development.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95">
              <div className="text-2xl font-bold mb-4 text-purple-700">🚴 Cycling Performance Training</div>
              <p className="text-gray-700 mb-4">Your cycling plan is designed through TrainingPeaks, using evidence-based methods to improve FTP, VO2max, durability and race-specific demands. Advanced analysis with WKO is included when needed — no complexity for you, just clearer decisions for training.</p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Season & block periodization</li>
                <li>• Load management based on training stress</li>
                <li>• Clear structure for weekday & weekend sessions</li>
                <li>• Weekly review & adjustments</li>
                <li>• Testing protocols adapted to your level</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95">
              <div className="text-2xl font-bold mb-4 text-purple-700">🏋️ Strength Training for Cyclists</div>
              <p className="text-gray-700 mb-4">A full strength plan integrated with your cycling load. If you have access to VBT devices (Vitruve, GymAware), velocity-based training can be included. If not, you'll still receive clear RIR guidance, progression schemes, and occasional video check-ins.</p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Gym program with progression blocks</li>
                <li>• RIR-based prescription (simple & effective)</li>
                <li>• Optional VBT integration if you own a velocity device</li>
                <li>• Video technique review when needed</li>
                <li>• Mobility & durability training</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95">
              <div className="text-2xl font-bold mb-4 text-purple-700">🍽️ Sports Nutrition Coaching</div>
              <p className="text-gray-700 mb-4">Nutrition aligned with your training load: energy availability, recovery, race fueling and daily habits adapted to your schedule.</p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Daily & weekly energy guidance</li>
                <li>• Simple meal builder through the app</li>
                <li>• Hydration & fueling strategy for key sessions</li>
                <li>• Body composition monitoring (if relevant)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-100 opacity-95">
              <div className="text-2xl font-bold mb-4 text-purple-700">📱 App Integration</div>
              <p className="text-gray-700 mb-4">A single place where you see your entire system: cycling sessions, gym work, nutrition, progress tracking and communication.</p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Training calendar synced to your plan</li>
                <li>• Strength tracking (weight, reps, RIR, velocity if available)</li>
                <li>• Nutrition builder access</li>
                <li>• Video demonstrations for exercises</li>
                <li>• Messaging for plan adjustments</li>
              </ul>
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

        <section className="mb-20 relative h-[700px] rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{backgroundImage: "url('/women_cycling.jpg')"}}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full flex flex-col items-center justify-center md:items-end md:justify-center md:pr-20">
            <div className="w-full text-center md:text-right md:skew-x-3 mb-12">
              <h2 className="text-4xl font-krona font-bold text-asciende-yellow mb-4">Ready to Start? Let's have a call</h2>
              <p className="text-xl text-gray-100">
                High-performance cycling coaching for athletes of all levels.
              </p>
            </div>
            <div className="w-full text-center md:text-right md:skew-x-3">
              <p className="text-5xl font-krona font-bold text-asciende-yellow mb-8">€149/mes</p>
              <h3 className="text-2xl font-bold text-white mb-8">Includes:</h3>
              <ul className="max-w-2xl ml-auto md:mr-0 space-y-4 text-lg text-white mb-12">
                <li className="flex items-center justify-center md:justify-end gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                  Fully personalized TrainingPeaks programming
                </li>
                <li className="flex items-center justify-center md:justify-end gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                  Weekly analysis & adjustments
                </li>
                <li className="flex items-center justify-center md:justify-end gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                  Strength & gym integration
                </li>
                <li className="flex items-center justify-center md:justify-end gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                  Optional VBT guidance
                </li>
                <li className="flex items-center justify-center md:justify-end gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                  Nutrition alignment inside Asciende HUB
                </li>
                <li className="flex items-center justify-center md:justify-end gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" />
                  Direct communication & ongoing support
                </li>
              </ul>
              <p className="text-gray-200 mb-8">Prefer to talk first?</p>
              <div className="flex justify-center md:justify-end">
                <button onClick={() => setIsModalOpen(true)} className="bg-asciende-purple hover:bg-asciende-purple/90 text-white font-bold py-4 px-8 rounded-lg transition">
                  Book a free 20-minute consultation
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-4">
                "Asciende's tailored cycling plans transformed my training and improved my performance significantly. Highly recommend!"
              </p>
              <p className="font-bold text-gray-900">John Doe</p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-4">
                "The personalized approach at Asciende helped me achieve my cycling goals faster than I ever imagined."
              </p>
              <p className="font-bold text-gray-900">Jane Smith</p>
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
              src="/cyclist_in_hill.jpg"
              alt="cyclist preparation"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <h2 className="text-5xl md:text-6xl font-krona font-bold mb-8">I want to start my Ascent now</h2>
              <p className="text-xl md:text-2xl mb-12 max-w-2xl">
                Ready to get started? Let's discuss your cycling performance goals.
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

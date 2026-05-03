import { X } from 'lucide-react';
import { useState } from 'react';

export default function PerformanceTesting() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full">
        <section className="relative h-[600px] md:h-[700px] mb-20 overflow-hidden">
          <img
            src="/VO2test.jpg"
            alt="performance testing athlete"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-lg text-center" style={{ fontFamily: 'Krona One' }}>
              Know Your Engine
            </h1>
            <p className="text-xl md:text-2xl text-white drop-shadow-md text-center max-w-3xl">
              Lab-grade performance testing and physiological analysis
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white flex items-end justify-center pb-8">
            <div className="text-center max-w-3xl">
              <p className="text-lg text-gray-800 font-medium">
                Fully integrated with the Asciende App for performance tracking, data analysis, and personalized training recommendations.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4">Our Testing Services</h2>
          <p className="text-center text-lg text-gray-600 mb-16">Complete physiological data for every athlete.</p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col">
              <div className="mb-6">
                <img
                  src="/VO2Master.webp"
                  alt="vo2 max testing"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">VO₂ Max & Ventilatory Testing</h3>
              <p className="text-gray-700 mb-3">Measure your aerobic engine size and discover your ventilatory thresholds (VT1 & VT2).</p>
              <p className="text-gray-600 text-sm">Understand your fuel usage patterns, breathing efficiency, and metabolic thresholds for precise training zone development.</p>
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <img
                  src="/Blood_Lactate_test.jpg"
                  alt="lactate threshold testing"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Lactate Threshold Testing</h3>
              <p className="text-gray-700 mb-3">Identify your LT1 (aerobic threshold) and LT2 (anaerobic threshold) with precision.</p>
              <p className="text-gray-600 text-sm">Reveal your metabolic efficiency, pacing ability, and the specific training adaptations you need to breakthrough performance plateaus.</p>
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <img
                  src="/Resting_metabolic.jpeg"
                  alt="metabolic rate testing"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Resting Metabolic Rate (RMR)</h3>
              <p className="text-gray-700 mb-3">Discover your true daily energy needs at rest.</p>
              <p className="text-gray-600 text-sm">Optimize training, recovery, performance, and weight management with data-driven nutrition and fueling strategies.</p>
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <img
                  src="/cyclist_drinking.webp"
                  alt="hydration testing"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Sweat & Hydration Testing</h3>
              <p className="text-gray-700 mb-3">Measure your sweat rate and sodium concentration.</p>
              <p className="text-gray-600 text-sm">Build a personalized hydration strategy for training and race day. Proper hydration is often the biggest performance limiter.</p>
            </div>

          </div>

          <div className="mt-16 pt-16 border-t">
            <div className="flex gap-12 items-stretch">
              <div className="w-1/2">
                <img
                  src="/anthropet.jpeg"
                  alt="anthropometry and body composition"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              <div className="w-1/2 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4">Anthropometry & Body Composition</h3>
                <p className="text-gray-700 mb-4 text-lg">Understand your body composition and discover the optimal path to modify fat and muscle mass according to your unique bone structure and genetic blueprint.</p>
                <p className="text-gray-600">Get precise measurements of your body composition using advanced bioelectrical impedance or skinfold analysis. Understand your muscle mass, body fat percentage, and bone density to create a personalized plan for body transformation aligned with your genetics and athletic goals.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-lg text-gray-600 mb-16">From testing to actionable insights.</p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col">
              <div className="mb-6">
                <div className="bg-blue-50 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Schedule Your Test</h3>
                    <p className="text-blue-700 text-sm">60-minute protocol</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">1. Choose Your Test</h3>
              <p className="text-gray-600">
                Select from our complete testing suite based on your goals and performance limiters. No pressure—we'll help you choose what's best for you.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <div className="bg-cyan-50 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-cyan-900 mb-2">Lab Testing</h3>
                    <p className="text-cyan-700 text-sm">Real physiological data</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">2. Complete Your Test</h3>
              <p className="text-gray-600">
                Conducted on lab equipment (smart trainer, treadmill, or video). Our certified professionals guide you through the entire protocol ensuring accurate, reliable data.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <div className="bg-blue-50 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Get Results</h3>
                    <p className="text-blue-700 text-sm">Follow-up analysis meeting</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">3. Actionable Insights</h3>
              <p className="text-gray-600">
                Receive a complete follow-up analysis explaining your results and precise training recommendations. No value without application—we ensure you know how to use your data.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4">What You'll Discover</h2>
          <p className="text-center text-lg text-gray-600 mb-16">Real data. Real performance gains.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-100">
              <div className="text-2xl font-bold mb-4 text-blue-700">🔬 Precise Training Zones</div>
              <p className="text-gray-700 mb-4">Move beyond generic zones. Get your actual heart rate, power, and pace thresholds based on your physiology.</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 p-8 rounded-xl border border-cyan-100">
              <div className="text-2xl font-bold mb-4 text-cyan-700">⛽ Fuel Strategy</div>
              <p className="text-gray-700 mb-4">Understand your fuel usage at different intensities and optimize hydration and fueling for every workout and race.</p>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-8 rounded-xl border border-sky-100">
              <div className="text-2xl font-bold mb-4 text-sky-700">📊 Performance Limiters</div>
              <p className="text-gray-700 mb-4">Identify your specific performance limiters—aerobic capacity, lactate threshold, efficiency—and prioritize your training.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-100">
              <div className="text-2xl font-bold mb-4 text-blue-700">🎯 Personalized Recommendations</div>
              <p className="text-gray-700 mb-4">Receive specific training adaptations tailored to your physiology, sport, and goals. Train smarter, not harder.</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 p-8 rounded-xl border border-cyan-100 md:col-span-2">
              <div className="text-2xl font-bold mb-4 text-cyan-700">📱 Integration with Asciende App</div>
              <p className="text-gray-700">Your test data integrates directly with your training plan. Track progress over time and continuously refine your training based on real physiological responses.</p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Why Test?</h2>
            <p className="text-xl text-gray-600">
              Testing isn't about hitting PRs in the lab. It's about gaining a detailed snapshot of where your fitness is right now and understanding the most effective direction for your training.
            </p>
          </div>
        </section>

        <section className="mb-20 bg-gradient-to-br from-gray-50 to-blue-50 p-12 rounded-2xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Performance Testing Packages</h3>
            <p className="text-lg text-gray-600 mb-4">Understand your body composition and discover the optimal path to modify fat and muscle mass according to your unique bone structure and genetic blueprint.</p>
            <p className="text-sm text-blue-600 font-semibold mb-12">Location right now: Nairobi, Kenya</p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-4">VO₂ Max Testing</h4>
                <p className="text-gray-700">Measure your aerobic capacity and ventilatory thresholds for precise training zones.</p>
              </div>

              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-4">Lactate Threshold</h4>
                <p className="text-gray-700">Identify your LT1 and LT2 for exact heart rate and power-based training zones.</p>
              </div>

              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-4">Resting Metabolic Rate</h4>
                <p className="text-gray-700">Optimize your daily energy needs and fueling strategies with precision.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-4">Sweat & Hydration</h4>
                <p className="text-gray-700">Build your personalized hydration strategy based on your sweat rate and sodium concentration.</p>
              </div>

              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h4 className="text-lg font-bold mb-4">Anthropometry & Body Composition</h4>
                <p className="text-gray-700">Get precise measurements of your body composition using advanced bioelectrical impedance or skinfold analysis.</p>
              </div>
            </div>

            <p className="text-gray-600 mb-8">All tests include follow-up analysis and personalized training recommendations.</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition">
              Schedule Your Performance Test
            </button>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently asked questions</h2>

          <div className="space-y-8">
            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">1. Who should get tested?</h3>
              <p className="text-gray-700">
                Any athlete serious about performance improvement. Testing reveals your specific limiters and helps you train with precision instead of guessing. Whether you're competitive or fitness-focused, testing accelerates progress.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">2. How long does testing take?</h3>
              <p className="text-gray-700">
                Approximately 60 minutes total, with the actual test taking between 9-12 minutes depending on the protocol. This includes setup, the test itself, and initial data review.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">3. What equipment do I need to bring?</h3>
              <p className="text-gray-700">
                For cycling tests, bring your bike (11-speed preferred) and riding equipment. For running tests, bring your running shoes and clothes. We provide all lab equipment and measurement tools.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">4. Can I combine multiple tests?</h3>
              <p className="text-gray-700">
                Yes! Many athletes choose multiple tests for a complete 360-degree view of their physiology. Contact us to design a testing package that addresses your specific goals.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">5. What happens with my results?</h3>
              <p className="text-gray-700">
                You'll receive a follow-up analysis meeting where we explain your results and give you precise training recommendations. Your data integrates with the Asciende App for ongoing performance tracking.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">6. Can video analysis be done remotely?</h3>
              <p className="text-gray-700">
                Yes! For gait and stroke analysis, you can send your videos recorded on a smartphone or GoPro. We'll provide specific guidelines on angles and technique before you record.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">7. How do I use my test data for training?</h3>
              <p className="text-gray-700">
                Your data is translated directly into actionable training recommendations. We explain your thresholds, optimal training zones, fuel strategy, and specific adaptations you need. This becomes your training roadmap.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to Unlock Your Potential?</h2>
            <div className="bg-gray-50 p-12 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Schedule Your Performance Test</h3>
              <p className="text-lg text-gray-700 mb-8">
                Get real data. Train with precision. See real performance gains. Discover exactly what your body needs to reach the next level.
              </p>
              <button onClick={() => setIsModalOpen(true)} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition">
                Book Your Test Now
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
                title="Schedule Your Performance Test"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

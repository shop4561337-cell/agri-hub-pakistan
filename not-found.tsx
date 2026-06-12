import { Link } from "wouter";
import { Sprout, CloudSun, Bug, FlaskConical, MessageSquare, BarChart3, Shield, Users, ArrowRight, CheckCircle2, Leaf, Tractor } from "lucide-react";
import PublicNav from "@/components/PublicNav";
import img1 from "@assets/1_1781158005529.png";
import img2 from "@assets/2_1781158005530.png";
import img3 from "@assets/3_1781158005530.png";
import img4 from "@assets/4_1781158005530.png";
import img5 from "@assets/5_1781158005531.png";
import img6 from "@assets/6_1781158005531.png";

const galleryItems = [
  { src: img1, alt: "Wheat fields in Punjab, Pakistan", caption: "Wheat Fields — Punjab" },
  { src: img2, alt: "Farmer on tractor harvesting sugarcane", caption: "Sugarcane Harvest" },
  { src: img3, alt: "Farmer holding cotton in his fields", caption: "Cotton Farmer — Sindh" },
  { src: img4, alt: "Fresh vegetables at a farm market", caption: "Fresh Farm Produce" },
  { src: img5, alt: "Modern irrigation system in a field", caption: "Smart Irrigation" },
  { src: img6, alt: "Orange orchard with irrigation canal", caption: "Orange Orchards" },
];

const features = [
  { icon: BarChart3, title: "Smart Dashboard", desc: "Get a real-time overview of all your farm operations — crop status, weather, and activity at a glance." },
  { icon: Leaf, title: "Crop Management", desc: "Track every crop from planting to harvest. Monitor growth stages, field areas, and expected yields." },
  { icon: CloudSun, title: "Weather Updates", desc: "Live weather conditions and 7-day forecasts tailored to your farm location. Plan ahead with confidence." },
  { icon: MessageSquare, title: "AI Assistant", desc: "Chat with an AI agriculture expert 24/7. Get instant advice on crops, pests, soil health, and more." },
  { icon: FlaskConical, title: "Fertilizer Guide", desc: "Data-driven fertilizer recommendations by crop type, growth stage, and season." },
  { icon: Bug, title: "Pest & Disease Info", desc: "Identify and treat common pests and diseases with detailed symptom guides and treatment plans." },
];

const benefits = [
  "Increase crop yields by up to 30%",
  "Reduce fertilizer waste with smart recommendations",
  "Early pest detection before damage spreads",
  "AI-powered advice available anytime",
  "Comprehensive farm record keeping",
  "Mobile-friendly — manage from the field",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(100,25%,13%)] via-[hsl(100,22%,18%)] to-[hsl(88,30%,22%)] text-white">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6 text-[hsl(38,65%,62%)]">
              <Sprout className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">Modern Agriculture Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Grow Smarter.<br />
              Farm <span className="text-[hsl(38,65%,62%)]">Better.</span>
            </h1>
            <p className="text-lg text-white/75 mb-10 leading-relaxed max-w-2xl">
              AgroSmart is the all-in-one farm management platform that combines real-time weather, AI-powered advice, crop tracking, and expert recommendations — built for the modern farmer.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[hsl(38,65%,52%)] text-white font-semibold hover:bg-[hsl(38,65%,45%)] transition-colors shadow-lg" data-testid="button-hero-register">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-background" style={{clipPath: "ellipse(55% 100% at 50% 100%)"}} />
      </section>

      {/* Stats */}
      <section className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "10,000+", label: "Registered Farmers" },
              { value: "50+", label: "Crops Supported" },
              { value: "98%", label: "Uptime Guarantee" },
              { value: "24/7", label: "AI Support" },
            ].map(s => (
              <div key={s.label} className="text-center p-6 rounded-xl bg-card border border-card-border shadow-sm">
                <div className="text-3xl font-serif font-bold text-primary mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">Everything You Need to Succeed</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A complete toolkit for modern agriculture — from field to harvest.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-card-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">From the Fields of Pakistan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Real farming, real land, real people — the heart of Pakistani agriculture.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl shadow-md group ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 ? "h-64 lg:h-full" : "h-48 lg:h-56"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white text-sm font-semibold drop-shadow">{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-6">Why Farmers Choose AgroSmart</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Thousands of farmers across the country trust AgroSmart to manage their operations, increase yields, and reduce waste — all from a single platform.
              </p>
              <ul className="space-y-3">
                {benefits.map(b => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity" data-testid="button-benefits-cta">
                Start For Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Tractor, label: "Precision Farming", color: "bg-primary/10 text-primary" },
                { icon: Shield, label: "Data Security", color: "bg-amber-100 text-amber-700" },
                { icon: Users, label: "Community Support", color: "bg-blue-100 text-blue-700" },
                { icon: BarChart3, label: "Yield Analytics", color: "bg-green-100 text-green-700" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="bg-card border border-card-border rounded-xl p-6 shadow-sm flex flex-col items-center text-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-[hsl(88,40%,30%)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-white/80 mb-8">Join thousands of farmers already using AgroSmart to grow smarter and harvest more.</p>
          <Link href="/register" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[hsl(38,65%,52%)] text-white font-semibold hover:bg-[hsl(38,65%,45%)] transition-colors shadow-lg" data-testid="button-footer-cta">
            Create Free Account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(100,25%,13%)] text-white/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Sprout className="w-5 h-5 text-[hsl(88,48%,42%)]" />
            <span className="font-serif">AgroSmart</span>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} AgroSmart. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

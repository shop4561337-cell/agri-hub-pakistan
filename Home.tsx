import { Sprout, Target, Heart, Users, Award, Leaf } from "lucide-react";
import PublicNav from "@/components/PublicNav";

const team = [
  { name: "Dr. Samuel Okafor", role: "Founder & CEO", bio: "20+ years in agronomy and precision agriculture. PhD in Crop Science from University of Agriculture.", initials: "SO" },
  { name: "Amina Diallo", role: "Head of Technology", bio: "Former lead engineer at AgriTech Africa. Passionate about using AI to solve real farming challenges.", initials: "AD" },
  { name: "James Mwangi", role: "Lead Agronomist", bio: "Field agronomist with expertise in soil health, pest management, and sustainable farming practices.", initials: "JM" },
  { name: "Grace Osei", role: "Customer Success", bio: "Dedicated to helping farmers get the most out of AgroSmart through training and ongoing support.", initials: "GO" },
];

const values = [
  { icon: Target, title: "Mission-Driven", desc: "Our mission is to empower every farmer with the tools and knowledge to maximize their harvests sustainably." },
  { icon: Heart, title: "Farmer-First", desc: "Every feature we build starts with a real farmer's problem. We listen, learn, and build what matters." },
  { icon: Leaf, title: "Sustainability", desc: "We believe in farming that nourishes the land for future generations — less waste, more yield." },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards in data accuracy, platform reliability, and customer support." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[hsl(100,25%,13%)] to-[hsl(88,30%,22%)] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-[hsl(88,48%,42%)] flex items-center justify-center">
              <Sprout className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">About AgroSmart</h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
            We are on a mission to transform agriculture through technology — making precision farming accessible to every farmer, everywhere.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>AgroSmart was founded in 2019 when Dr. Samuel Okafor noticed that farmers in his home region were struggling with unpredictable weather, pest outbreaks, and inefficient fertilizer use — problems that technology could solve.</p>
                <p>What started as a simple crop tracking tool has grown into a comprehensive platform used by over 10,000 farmers across the continent. We have helped farmers increase yields by an average of 28% while reducing fertilizer costs by 20%.</p>
                <p>Today, AgroSmart combines real-time data, AI, and decades of agronomy expertise into one easy-to-use platform — available on any device, from the office or the field.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Founded", value: "2019" },
                { label: "Farmers Served", value: "10,000+" },
                { label: "Avg. Yield Increase", value: "28%" },
                { label: "Countries", value: "12" },
              ].map(s => (
                <div key={s.label} className="bg-card border border-card-border rounded-xl p-6 text-center shadow-sm">
                  <div className="text-3xl font-serif font-bold text-primary mb-1">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-3">Our Values</h2>
            <p className="text-muted-foreground">The principles that guide everything we do.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-card-border rounded-xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-3">Meet the Team</h2>
            <p className="text-muted-foreground">The people behind AgroSmart's mission.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="bg-card border border-card-border rounded-xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                <div className="text-xs font-medium text-primary mb-3 uppercase tracking-wide">{member.role}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

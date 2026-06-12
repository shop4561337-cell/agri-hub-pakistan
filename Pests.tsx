import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import PublicNav from "@/components/PublicNav";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <section className="bg-gradient-to-br from-[hsl(100,25%,13%)] to-[hsl(88,30%,22%)] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-white/75 text-lg">We are here to help. Reach out with questions, feedback, or support requests.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">Send us a Message</h2>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-64 bg-card border border-card-border rounded-xl p-8 text-center shadow-sm">
                  <CheckCircle2 className="w-14 h-14 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm">Thank you for reaching out. We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="input-contact-email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      placeholder="How can we help?"
                      className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      data-testid="input-contact-subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us more about your question or concern..."
                      className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      data-testid="input-contact-message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                    data-testid="button-contact-submit"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold mb-6">Get in Touch</h2>
              {[
                { icon: Mail, label: "Email", value: "support@agrosmart.com", sub: "We reply within 24 hours" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", sub: "Mon–Fri, 8am–6pm" },
                { icon: MapPin, label: "Address", value: "123 Harvest Road, AgriCity", sub: "Farm Innovation Hub, Suite 201" },
                { icon: Clock, label: "Support Hours", value: "Monday to Friday", sub: "8:00 AM – 6:00 PM (GMT)" },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex items-start gap-4 p-5 bg-card border border-card-border rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">{label}</div>
                    <div className="font-semibold text-foreground">{value}</div>
                    <div className="text-sm text-muted-foreground">{sub}</div>
                  </div>
                </div>
              ))}

              <div className="p-5 bg-primary/5 border border-primary/20 rounded-xl">
                <h3 className="font-semibold text-foreground mb-2">Frequently Asked Questions</h3>
                <p className="text-sm text-muted-foreground mb-3">Before reaching out, check our FAQ section — your question might already be answered.</p>
                <a href="#" className="text-sm text-primary font-medium hover:underline">Browse FAQ &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

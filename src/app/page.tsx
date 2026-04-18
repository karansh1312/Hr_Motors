'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Settings, 
  ShieldCheck, 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X, 
  Target, 
  Truck, 
  Search, 
  Zap 
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { useState } from "react";

const services = [
  { 
    icon: <Search className="w-8 h-8 text-primary" />, 
    title: "Global Part Sourcing", 
    description: "Our expert team tracks down genuine and rare parts from our global network of verified suppliers." 
  },
  { 
    icon: <Truck className="w-8 h-8 text-primary" />, 
    title: "Rapid Logistics", 
    description: "Premium shipping solutions ensuring your parts arrive safely and on time, anywhere in the UK." 
  },
  { 
    icon: <Target className="w-8 h-8 text-primary" />, 
    title: "Quality Verification", 
    description: "Every part undergoes a rigorous inspection process to meet our strict quality and performance standards." 
  },
  { 
    icon: <Zap className="w-8 h-8 text-primary" />, 
    title: "Emergency Sourcing", 
    description: "Vehicle down? We prioritize urgent requests to get you back on the road in the shortest possible time." 
  }
];

const features = [
  { icon: <ShieldCheck className="w-10 h-10 mb-4 text-primary" />, title: "Certified Parts", description: "Only manufacturer-approved components sourced specifically for your model." },
  { icon: <Clock className="w-10 h-10 mb-4 text-primary" />, title: "Tracked Delivery", description: "Real-time updates from our warehouse to your front door or workshop." },
  { icon: <Users className="w-10 h-10 mb-4 text-primary" />, title: "Dedicated Support", description: "A personal account manager to handle all your sourcing and service needs." },
  { icon: <Settings className="w-10 h-10 mb-4 text-primary" />, title: "Expert Knowledge", description: "Decades of combined experience in the UK automotive and parts industry." }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-xl border-b border-border">
        <div className="w-full px-6 md:px-10">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center glow">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tighter">HR<span className="text-primary italic">Motors</span></span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              {['Services', 'Standards', 'About', 'Contact'].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} className="text-muted-foreground hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">
                  {item}
                </Link>
              ))}
              <a href="http://billing.hrmotors.uk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white transition-colors text-xs font-black tracking-widest uppercase">
                Billing
              </a>
            </div>

            <div className="hidden md:flex">
              <Link href="#contact" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95 glow">
                Get a Quote
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="p-2 text-foreground hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-card/95 backdrop-blur-2xl border-b border-border"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {['Services', 'Standards', 'About', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="block px-4 py-3 text-lg font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  {item}
                </Link>
              ))}
              <a 
                href="http://billing.hrmotors.uk/" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)} 
                className="block px-4 py-3 text-lg font-bold text-primary hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                Billing
              </a>
              <div className="pt-4 px-4">
                <Link 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="block w-full text-center bg-primary text-white py-4 rounded-xl font-bold"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-garage.png"
              alt="Premium Parts Sourcing"
              fill
              sizes="100vw"
              priority
              className="object-cover opacity-40 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="w-full px-6 md:px-12 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">UK Exclusive Parts Provider</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-4 text-gradient uppercase"
              >
                Premium <br /> 
                <span className="italic">Part</span> Services
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm md:text-base text-muted-foreground max-w-md mb-8 leading-relaxed"
              >
                We specialize in sourcing, verifying, and delivering elite vehicle components for car and bike enthusiasts across the United Kingdom.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-5"
              >
                <Link href="#contact" className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-3 active:scale-95 glow">
                  Inquire Now
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link href="#services" className="px-8 py-4 glass hover:bg-white/5 text-white rounded-full font-bold text-lg transition-all inline-flex items-center justify-center">
                  Our Services
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 relative bg-background">
          <div className="w-full px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">Core Expertise</h2>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tighter">Specialist Part Solutions</h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">From sourcing discontinued components to managing bulk workshop orders, we handle it all.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group p-7 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5"
                >
                  <div className="bg-muted w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                  <p className="text-muted-foreground text-base leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Standards section */}
        <section id="standards" className="py-32 bg-card/50">
          <div className="w-full px-6 md:px-12">
            <div className="text-center mb-24">
              <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">Our Standards</h2>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tighter">Engineered for Reliability</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group text-center"
                >
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                  <h4 className="text-lg font-bold mb-3 tracking-tight">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-full bg-primary/2 blur-[120px] rounded-full -z-10" />
          
          <div className="w-full px-6 md:px-12">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 relative"
              >
                <div className="relative h-[600px] w-full rounded-[3rem] overflow-hidden border border-border glow">
                  <Image
                    src="/images/mechanic-working.png"
                    alt="Precision Service"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-10 left-10 glass p-8 rounded-3xl max-w-xs">
                    <p className="text-4xl font-black text-white mb-2">15+</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-primary">Years of Excellence</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2"
              >
                <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">About HR Motors</h2>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4 leading-[1.1]">The UK&apos;s Trusted <br /> Parts Sourcing Partner</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  Founded on a passion for precision engineering, HR Motors has grown from a local supplier to a nationwide service provider for elite automotive components. We bridge the gap between quality manufacturers and the mechanics who need them most.
                </p>
                <div className="space-y-4 mb-10">
                  {[
                    'Direct Relationships with Global Manufacturers', 
                    'Technical Support & Expert Sourcing', 
                    'Comprehensive Part Verification Process'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-base font-medium">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
                <Link href="#contact" className="inline-block px-12 py-5 bg-white text-black font-black text-xl rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95">
                  Partner with Us
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-card relative overflow-hidden">
          <div className="w-full px-6 md:px-12 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">Quick Inquiry</h2>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tighter">Sourcing Request</h3>
              <p className="mt-4 text-muted-foreground text-base max-w-xl italic mx-auto">Provide details of the part you need and our experts will get back to you within 24 hours.</p>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border pt-24 pb-12">
        <div className="w-full px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center glow">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl tracking-tighter">HR<span className="text-primary">Motors</span></span>
              </div>
              <p className="text-xl text-muted-foreground mb-8 max-w-md leading-relaxed">
                Empowering the UK automotive industry with precision sourcing and exceptional part services. Your vision, our parts.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-primary">Navigation</h4>
              <ul className="space-y-4">
                {['Services', 'Standards', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="text-muted-foreground hover:text-white transition-colors text-lg">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-primary">Connect</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-muted-foreground hover:text-white transition-colors">
                  <Phone className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-lg">+44 792 716 1349</span>
                </li>
                <li className="flex items-start gap-4 text-muted-foreground hover:text-white transition-colors">
                  <Mail className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-lg">hrmotorsint@gmail.com</span>
                </li>
                <li className="flex items-start gap-4 text-muted-foreground hover:text-white transition-colors">
                  <MapPin className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-lg">London, United Kingdom</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-16 flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-2 group">
              <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.5em] opacity-50 group-hover:opacity-100 transition-opacity">Powered by</span>
              <a 
                href="https://aurevatech.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-white transition-all duration-500 font-black text-2xl md:text-4xl tracking-tighter hover:glow uppercase"
              >
                AurevaTech
              </a>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between w-full items-center gap-6 pt-10 border-t border-border/50">
              <p className="text-muted-foreground text-sm font-medium">
                &copy; {new Date().getFullYear()} HR Motors. Engineered Excellence.
              </p>
              <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

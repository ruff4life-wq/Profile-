/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Cpu, 
  Network, 
  Cloud, 
  Mail, 
  Linkedin, 
  ExternalLink, 
  Award, 
  BookOpen, 
  Terminal,
  CheckCircle2,
  Copy,
  ChevronRight,
  Sun,
  Moon,
  FileText,
  Newspaper,
  BarChart3
} from 'lucide-react';

// --- Data ---
const RESUME_DATA = {
  name: "Marvin Ruff",
  alias: "Marvin Vibes DNA",
  title: "Security & AI Governance Specialist",
  location: "Hampton, GA",
  email: "marvinruffcs@gmail.com",
  linkedin: "linkedin.com/in/marvin-ruff-it",
  summary: "Infrastructure Engineer and Security specialist with extensive experience in IAM, cloud security, and AI governance. Proven track record in orchestrating enterprise-level infrastructure and mitigating vulnerabilities in complex cloud environments.",
  experience: [
    {
      company: "R1",
      role: "Infrastructure Engineer / Rapid Response",
      period: "02/2022 - 04/2025",
      points: [
        "Orchestrated onboarding/offboarding for enterprise users via ServiceNow and Active Directory.",
        "Managed software applications and mitigated security vulnerabilities within AWS cloud environments.",
        "Led legacy system migrations to cloud-based platforms, improving efficiency and reducing costs.",
        "Optimized network configurations and monitored system health proactively."
      ]
    },
    {
      company: "Samsara",
      role: "Tier 2 Support Representative",
      period: "07/2021 - 02/2022",
      points: [
        "Resolved inbound customer requests with a 'Customer Obsessed' growth mindset.",
        "Collaborated with cross-functional teams to reduce escalated cases by 30%.",
        "Analyzed support trends to implement long-term fixes for critical pain points."
      ]
    },
    {
      company: "Sierra Wireless",
      role: "Tier 2 Network Support Specialist",
      period: "07/2019 - 06/2020",
      points: [
        "Provided 24/7 technical resolution for end-user issues and escalated advanced cases.",
        "Managed network support for high-priority enterprise clients during organizational transitions.",
        "Troubleshot advanced cellular gateway and IoT infrastructure bottlenecks."
      ]
    }
  ],
  skills: {
    security: ["Identity & Access Management (IAM)", "Zero Trust Models", "SOC 2", "NIST Standards", "HIPAA", "GDPR"],
    cloud: ["Azure AD", "AWS", "Google Cloud Platform (GCP)", "IaaS", "VMware"],
    technical: ["ServiceNow", "Jira", "Active Directory", "Office 365", "Remote Support"],
    networking: ["TCP/IP", "VPN", "Firewall Configuration", "LAN/WAN"]
  },
  certifications: [
    { name: "AI Security and Governance", issuer: "Securiti", date: "03/2026" },
    { name: "Generative AI: Introduction and Applications", issuer: "IBM", date: "03/2026" },
    { name: "Google AI Professional", issuer: "Google", date: "02/2026" },
    { name: "Certified in Cybersecurity (CC)", issuer: "ISC2", date: "03/2025" }
  ],
  education: [
    { degree: "B.S. in Information Technology (Cybersecurity)", school: "ITT Technical Institute" },
    { degree: "B.A. in Legal Studies", school: "John Jay College of Criminal Justice" }
  ],
  projects: [
    {
      title: "AI Governance Framework",
      description: "Developed a comprehensive framework for ethical AI deployment and risk mitigation in enterprise environments.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
      tags: ["AI Ethics", "Governance", "Risk Management"]
    },
    {
      title: "Zero Trust IAM Architecture",
      description: "Designed and implemented a Zero Trust identity model for a multi-cloud infrastructure, reducing unauthorized access by 90%.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop",
      tags: ["IAM", "Zero Trust", "Azure AD"]
    },
    {
      title: "Cloud Security Orchestration",
      description: "Automated security vulnerability patching and monitoring across AWS and GCP environments using custom scripts.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
      tags: ["Cloud Security", "Automation", "AWS"]
    }
  ],
  proficiency: [
    { name: "Identity & Access Management (IAM)", level: 95 },
    { name: "Cloud Security", level: 92 },
    { name: "AI Governance", level: 88 }
  ]
};

// --- Components ---

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode, icon: any }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-[#00fddc]/10 rounded-lg">
      <Icon className="w-5 h-5 text-[#00fddc]" />
    </div>
    <h2 className="text-xl font-semibold tracking-widest text-white uppercase">
      {children}
    </h2>
    <div className="flex-1 h-[1px] bg-white/10 ml-4" />
  </div>
);

export default function App() {
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check system preference on initial load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RESUME_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-slate-900'} font-sans selection:bg-emerald-500/30`}>
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] ${isDarkMode ? 'bg-emerald-900/10' : 'bg-emerald-500/5'} blur-[120px] rounded-full`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] ${isDarkMode ? 'bg-blue-900/10' : 'bg-blue-500/5'} blur-[120px] rounded-full`} />
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 border-b ${isDarkMode ? 'border-white/5 bg-[#050505]/80' : 'border-black/5 bg-white/80'} backdrop-blur-md`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-500" />
            <span className="font-bold tracking-tighter text-lg uppercase">VIBE DNA</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#about" className={`${isDarkMode ? 'text-white/60 hover:text-[#00fddc]' : 'text-slate-600 hover:text-[#00fddc]'} transition-colors`}>About</a>
            <a href="#experience" className={`${isDarkMode ? 'text-white/60 hover:text-[#00fddc]' : 'text-slate-600 hover:text-[#00fddc]'} transition-colors`}>Experience</a>
            <a href="#projects" className={`${isDarkMode ? 'text-white/60 hover:text-[#00fddc]' : 'text-slate-600 hover:text-[#00fddc]'} transition-colors`}>Projects</a>
            <a href="#skills" className={`${isDarkMode ? 'text-white/60 hover:text-[#00fddc]' : 'text-slate-600 hover:text-[#00fddc]'} transition-colors`}>Skills</a>
            
            <div className="flex items-center gap-4 ml-4">
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-[#00fddc]' : 'bg-black/5 hover:bg-black/10 text-[#00fddc]'}`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button 
                onClick={handleCopyEmail}
                className="px-4 py-2 bg-[#00fddc] text-black rounded-full text-xs font-bold hover:bg-[#00fddc]/80 transition-all active:scale-95"
              >
                {copied ? 'COPIED!' : 'CONTACT'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-24 space-y-32">
        
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <Terminal className="w-3 h-3" />
              Available for AI Governance Projects
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              MARVIN <br />
              <span className="text-emerald-500">RUFF</span>
            </h1>
            <p className={`text-xl max-w-md font-light leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
              {RESUME_DATA.title}. Specializing in secure infrastructure, IAM, and the intersection of Cybersecurity and Generative AI.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={handleCopyEmail}
                className={`group flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${isDarkMode ? 'bg-white text-black hover:bg-emerald-400' : 'bg-slate-900 text-white hover:bg-emerald-600'}`}
              >
                <Mail className="w-4 h-4" />
                {copied ? 'Email Copied' : 'Get in Touch'}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="/AI².pdf" 
                download 
                className={`group flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${isDarkMode ? 'bg-white text-black hover:bg-emerald-400' : 'bg-slate-900 text-white hover:bg-emerald-600'}`}
              >
                <FileText className="w-4 h-4" />
                Download Resume
              </a>
              <a 
                href={`https://${RESUME_DATA.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 border rounded-full transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5 text-slate-900'}`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`relative aspect-square md:aspect-[4/5] overflow-hidden rounded-3xl border group ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
          >
            {/* 
              Note: Using a placeholder if the local image isn't found. 
              The user provided an image in the prompt, which I'll assume is named 'profile.jpg'
            */}
            <img 
              src="/profile.jpg" 
              alt="Marvin Ruff" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                if (img.src.endsWith('/profile.jpg')) {
                  img.src = '/Profile.jpg';
                } else {
                  img.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop";
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-8 left-8">
              <div className="text-xs font-mono text-emerald-400 mb-1 tracking-widest uppercase">Identity Verified</div>
              <div className="text-2xl font-bold tracking-tight">VIBE DNA</div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <SectionHeading icon={BookOpen}>Philosophy</SectionHeading>
            <p className={`leading-loose italic ${isDarkMode ? 'text-white/50' : 'text-slate-500'}`}>
              "Security is not a product, but a process. In the age of AI, governance is the bridge between innovation and integrity."
            </p>
          </div>
          <div className="md:col-span-2 space-y-8">
            <p className={`text-2xl font-light leading-loose ${isDarkMode ? 'text-white/80' : 'text-slate-700'}`}>
              {RESUME_DATA.summary}
            </p>
            <div className="grid grid-cols-2 gap-8">
              {RESUME_DATA.education.map((edu, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-xs text-emerald-500 font-bold uppercase tracking-widest">Education</div>
                  <div className="font-bold">{edu.degree}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>{edu.school}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <SectionHeading icon={Terminal}>Professional Path</SectionHeading>
          <div className="space-y-12">
            {RESUME_DATA.experience.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`group grid md:grid-cols-4 gap-4 md:gap-12 p-8 rounded-2xl border transition-all ${isDarkMode ? 'border-white/5 hover:border-emerald-500/20 hover:bg-white/[0.02]' : 'border-black/5 hover:border-emerald-500/20 hover:bg-black/[0.01]'}`}
              >
                <div className="md:col-span-1">
                  <div className="text-xl font-bold text-emerald-500">{exp.company}</div>
                  <div className={`text-sm font-mono mt-1 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>{exp.period}</div>
                </div>
                <div className="md:col-span-3 space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-emerald-500 transition-colors">
                    {exp.role}
                  </h3>
                  <ul className="space-y-3">
                    {exp.points.map((point, j) => (
                      <li key={j} className={`flex gap-3 leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500/40 shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <SectionHeading icon={Network}>Featured Projects</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {RESUME_DATA.projects.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl border transition-all ${isDarkMode ? 'border-white/5 bg-white/[0.02] hover:border-emerald-500/20' : 'border-black/5 bg-black/[0.01] hover:border-emerald-500/20'}`}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${isDarkMode ? 'grayscale group-hover:grayscale-0' : ''}`}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-emerald-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60 px-2 py-1 rounded bg-emerald-500/5 border border-emerald-500/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills & Certs */}
        <section id="skills" className="grid md:grid-cols-2 gap-24">
          <div className="space-y-12">
            <SectionHeading icon={Cpu}>Technical Stack</SectionHeading>
            <div className="space-y-8">
              {Object.entries(RESUME_DATA.skills).map(([category, items]) => (
                <div key={category} className="space-y-4">
                  <h4 className={`text-xs font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map(skill => (
                      <span key={skill} className={`px-3 py-1 text-xs font-mono font-medium border rounded-full transition-colors cursor-default ${isDarkMode ? 'border-white/10 bg-white/5 text-emerald-100 hover:border-emerald-500/50' : 'border-black/10 bg-black/5 text-slate-700 hover:border-emerald-500/50'}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-12 space-y-8">
              <SectionHeading icon={BarChart3}>Skill Proficiency</SectionHeading>
              <div className="space-y-6">
                {RESUME_DATA.proficiency.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold tracking-tight">{skill.name}</span>
                      <span className="text-xs font-mono text-[#00fddc]">{skill.level}%</span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-[#00fddc] shadow-[0_0_10px_rgba(0,253,220,0.3)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <SectionHeading icon={Award}>Certifications</SectionHeading>
            <div className="grid gap-4">
              {RESUME_DATA.certifications.map((cert, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${isDarkMode ? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]' : 'border-black/5 bg-black/[0.01] hover:bg-black/[0.03]'}`}>
                  <div>
                    <div className="font-bold text-sm">{cert.name}</div>
                    <div className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>{cert.issuer}</div>
                  </div>
                  <div className={`text-xs font-mono ${isDarkMode ? 'text-emerald-500/60' : 'text-emerald-600'}`}>{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer / CTA */}
        <footer className={`pt-24 pb-12 border-t text-center space-y-8 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tighter">LET'S SECURE THE FUTURE.</h2>
            <p className={isDarkMode ? 'text-white/40' : 'text-slate-500'}>Open for consultations on AI Governance and Cloud Security.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleCopyEmail}
              className="flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black rounded-full font-bold hover:bg-emerald-400 transition-all"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Email Copied!' : 'Copy Email Address'}
            </button>
            <a 
              href={`https://${RESUME_DATA.linkedin}`}
              className={`flex items-center gap-2 px-8 py-4 border rounded-full font-bold transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5 text-slate-900'}`}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn Profile
            </a>
          </div>
          <div className={`pt-12 text-[10px] font-mono uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/20' : 'text-slate-400'}`}>
            © 2026 MARVIN RUFF • VIBE DNA • ALL RIGHTS RESERVED
          </div>
        </footer>

      </main>
    </div>
  );
}

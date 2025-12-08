
import React from 'react';
import { Section, PageHeader } from '../components/Section';
import { Button } from '../components/Button';
import { Page } from '../types';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  link?: string;
}

export const BlogPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const posts: BlogPost[] = [
    {
      id: 7,
      title: "30-Minute Wash Days? Yes, It's Possible. Here's The Routine",
      excerpt: "Tired of 3-hour wash days? Discover actionable afro hair hacks for 2025 tailored for busy professionals. From the 'Time-Audit' routine to heatless stretching secrets, learn how to save time without sacrificing moisture.",
      date: "Dec 08, 2025",
      author: "Melanie S.",
      category: "Trends & Techniques",
      image: "https://picsum.photos/600/400?random=26",
      link: "https://aistudio.google.com/apps/drive/1bLVYiML8B7fMEDMzs4HStmrGLVl18Hg-?showPreview=true&showAssistant=true"
    },
    {
      id: 1,
      title: "5 Ways to Fill Empty Chairs in January",
      excerpt: "The post-holiday slump doesn't have to mean zero income. Here are five proven strategies to keep your calendar full when everyone else is quiet.",
      date: "Jan 12, 2025",
      author: "Melanie S.",
      category: "Growth Strategy",
      image: "https://picsum.photos/600/400?random=20"
    },
    {
      id: 2,
      title: "Why Your Instagram Likes Aren't Turning into Bookings",
      excerpt: "Vanity metrics look good, but they don't pay the rent. Learn how to optimize your bio and content to drive actual appointments.",
      date: "Dec 28, 2024",
      author: "Sarah J.",
      category: "Social Media",
      image: "https://picsum.photos/600/400?random=21"
    },
    {
      id: 3,
      title: "The True Cost of a Missed Call: Afro Salon Edition",
      excerpt: "We analyzed data from 50 UK salons. The amount of revenue lost to unanswered phones shocked us. Here is the data.",
      date: "Dec 15, 2024",
      author: "David O.",
      category: "Operations",
      image: "https://picsum.photos/600/400?random=22"
    },
    {
      id: 4,
      title: "AI Receptionists: The Future of Salon Management?",
      excerpt: "Can a robot really handle a consultation for a relaxer? We dive into the capabilities of Voice AI for niche hair businesses.",
      date: "Nov 30, 2024",
      author: "Melanie S.",
      category: "Technology",
      image: "https://picsum.photos/600/400?random=23"
    },
    {
      id: 5,
      title: "Pricing Your Silk Press Correctly in 2025",
      excerpt: "Inflation has hit products and energy hard. Is your pricing menu eating into your profit margins? Let's do the math.",
      date: "Nov 12, 2024",
      author: "Tola A.",
      category: "Finance",
      image: "https://picsum.photos/600/400?random=24"
    },
    {
      id: 6,
      title: "Client Retention Strategies for Natural Hair Salons",
      excerpt: "Acquiring a new client costs 5x more than keeping an existing one. Here is how to build a loyalty loop that lasts.",
      date: "Oct 24, 2024",
      author: "Sarah J.",
      category: "Marketing",
      image: "https://picsum.photos/600/400?random=25"
    }
  ];

  return (
    <>
      <PageHeader 
        title="Insights & Strategy" 
        subtitle="Expert advice, industry trends, and growth hacks for the modern Afro hair business." 
      />
      
      <Section background="light" pattern>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
                <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col h-full group"
                >
                    <div className="relative h-48 overflow-hidden">
                        {post.link ? (
                            <a href={post.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer">
                                <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </a>
                        ) : (
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                        )}
                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide text-primary dark:text-secondary border border-slate-200 dark:border-slate-700 pointer-events-none">
                            {post.category}
                        </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {post.date}
                            </div>
                            <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {post.author}
                            </div>
                        </div>

                        {post.link ? (
                            <a href={post.link} target="_blank" rel="noopener noreferrer" className="block group/title">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-serif leading-tight group-hover/title:text-primary dark:group-hover/title:text-secondary transition-colors">
                                    {post.title}
                                </h3>
                            </a>
                        ) : (
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-serif leading-tight group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                                {post.title}
                            </h3>
                        )}
                        
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                            {post.excerpt}
                        </p>
                        
                        <a 
                            href={post.link || '#'}
                            target={post.link ? "_blank" : undefined}
                            rel={post.link ? "noopener noreferrer" : undefined}
                            className="flex items-center gap-2 text-sm font-bold text-primary dark:text-secondary group/btn w-fit cursor-pointer hover:underline"
                            onClick={(e) => {
                                if (!post.link) {
                                    e.preventDefault();
                                    /* Placeholder for internal navigation or modal */
                                }
                            }}
                        >
                            Read Article 
                            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="mt-16 bg-primary rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl font-serif text-white mb-4">Don't Miss an Update</h2>
                <p className="text-blue-100 mb-8">Join 500+ salon owners receiving our weekly growth tips straight to their inbox.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="px-6 py-3 rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-secondary w-full sm:w-80"
                    />
                    <Button variant="secondary" className="whitespace-nowrap">Subscribe Free</Button>
                </div>
            </div>
        </div>
      </Section>
    </>
  );
};

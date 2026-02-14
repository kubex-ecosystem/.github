import React from 'react';
import { ExternalLink, Calendar, Clock, Terminal } from 'lucide-react';
import { getLatestArticles } from '../../lib/devto';
import { Card, CardContent } from '../ui';

export async function DevLogFeed() {
  const articles = await getLatestArticles();

  // Oculta a seção inteira se não houver artigos (comportamento original restaurado)
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section id="devlog" className="py-24 bg-bg-base relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary-glow/30 bg-secondary-glow/10 text-secondary-glow text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 bg-secondary-glow rounded-full animate-pulse"></span>
              Keep Alive: Activity Feed
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
              Latest DevLog
            </h2>
          </div>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest md:text-right">
            [ UPDATING VIA DEV.TO ]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <a 
              key={article.id} 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="h-full border-white/10 bg-surface/20 group-hover:border-secondary-glow/30 transition-all duration-500 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tag_list.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[9px] font-mono uppercase tracking-widest text-slate-300 border border-white/10 bg-white/10 px-1.5 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-secondary-glow transition-colors leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm text-slate-300 font-normal line-clamp-2 mb-6 leading-relaxed">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {new Date(article.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {article.reading_time_minutes} min read
                      </span>
                    </div>
                    <ExternalLink size={14} className="text-slate-400 group-hover:text-secondary-glow transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="https://dev.to/faelmori" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors py-2 px-4 border border-white/10 hover:border-white/20 rounded-lg"
          >
            <Terminal size={12} />
            View all entries on dev.to
          </a>
        </div>
      </div>
    </section>
  );
}

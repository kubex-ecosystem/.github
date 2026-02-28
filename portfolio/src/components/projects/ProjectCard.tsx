'use client';

import { Download, ExternalLink, Github, Star, Eye } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '../ui';
import ProjectExtractor from '../ProjectExtractor';

export function ProjectCard({ project, isPt, getStatusLabel, downloadLookatniFile }: any) {
    const [isInspecting, setIsInspecting] = useState(false);

    return (
        <>
            <Card className="h-full overflow-hidden group border-white/10 bg-surface/30 flex flex-col">
                {/* Project Image */}
                <div className="relative overflow-hidden aspect-video">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-bg-base/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                        <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded border font-bold ${project.status === 'completed'
                                ? 'border-secondary-glow/50 bg-secondary-glow/20 text-secondary-glow'
                                : project.status === 'in-progress'
                                    ? 'border-tertiary-glow/50 bg-tertiary-glow/20 text-tertiary-glow'
                                    : 'border-slate-600 bg-slate-800/80 text-slate-200'
                            }`}>
                            {getStatusLabel(project.status)}
                        </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                        <div className="absolute top-4 left-4">
                            <div className="flex items-center gap-1 border border-primary-glow/50 bg-primary-glow/20 text-primary-glow px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                                <Star size={10} fill="currentColor" />
                                {isPt ? 'Destaque' : 'Featured'}
                            </div>
                        </div>
                    )}
                </div>

                <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 tracking-tight text-white">
                        {project.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-4 line-clamp-3 font-normal leading-relaxed">
                        {isPt && project.descriptionPt ? project.descriptionPt : project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 4).map((tech: unknown, index: number) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 text-[10px] font-mono border border-white/10 bg-white/5 text-slate-300 rounded transition-colors group-hover:border-primary-glow/40 font-medium"
                            >
                                {((tech || '') as string).toUpperCase()}
                            </span>
                        ))}
                    </div>

                    <div className="mt-auto"></div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        {project.github && (
                            <button
                                onClick={() => window.open(project.github, '_blank')}
                                className="flex-[0.8] flex items-center justify-center gap-2 py-2 text-xs font-mono uppercase tracking-widest border border-white/10 hover:border-primary-glow/50 hover:bg-primary-glow/5 transition-all duration-300 rounded"
                            >
                                <Github size={14} />
                            </button>
                        )}

                        {project.demo && (
                            <button
                                onClick={() => window.open(project.demo, '_blank')}
                                className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-mono uppercase tracking-widest border border-white/10 hover:border-primary-glow/50 hover:bg-primary-glow/5 transition-all duration-300 rounded"
                            >
                                <ExternalLink size={14} />
                                Live
                            </button>
                        )}

                        {project.lookatniFile && (
                            <button
                                onClick={() => setIsInspecting(true)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-mono uppercase tracking-widest bg-primary-glow hover:bg-primary-glow/90 text-white transition-all duration-300 rounded"
                            >
                                <Eye size={14} />
                                Inspect
                            </button>
                        )}

                        {project.lookatniFile && downloadLookatniFile && (
                            <button
                                onClick={() => downloadLookatniFile(project.lookatniFile)}
                                className="flex-[0.8] flex items-center justify-center gap-2 py-2 text-xs font-mono uppercase tracking-widest border border-white/10 hover:border-primary-glow/50 hover:bg-primary-glow/5 transition-all duration-300 rounded"
                            >
                                <Download size={14} />
                            </button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Modal for ProjectExtractor */}
            {isInspecting && project.lookatniFile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-5xl bg-bg-base border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-surface/50">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Eye className="w-5 h-5 text-primary-glow" />
                                {project.title} - File Inspector
                            </h3>
                            <button
                                onClick={() => setIsInspecting(false)}
                                className="text-slate-400 hover:text-white transition-colors p-1"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="overflow-y-auto flex-1 p-4 bg-gray-50/5 dark:bg-black/50">
                            <ProjectExtractor
                                projectFile={project.lookatniFile}
                                projectName={project.title}
                                description={isPt && project.descriptionPt ? project.descriptionPt : project.description}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

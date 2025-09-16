export type Project = { name: string; tagline: string; repo: string; badges?: string[] }
export const projects: Project[] = [
  { name: 'GoBE', tagline: 'Zero-config secure backend in Go.', repo: 'https://github.com/kubex-ecosystem/gobe', badges: ['Go', 'REST', 'MCP'] },
  { name: 'Grompt', tagline: 'Prompt engineering as code.', repo: 'https://github.com/kubex-ecosystem/grompt', badges: ['Go', 'CLI'] },
  { name: 'Kortex', tagline: 'Operational dashboard for AI/DevOps.', repo: 'https://github.com/kubex-ecosystem/kortex', badges: ['Next.js', 'WS'] },
  { name: 'LookAtni', tagline: 'Composable prompt/manifest format.', repo: 'https://github.com/kubex-ecosystem/lookatni', badges: ['Spec', 'Parsers'] },
  { name: 'kbxctl', tagline: 'Kubex CLI orchestrator.', repo: 'https://github.com/kubex-ecosystem/kbxctl', badges: ['Go', 'CLI'] },
  { name: 'Logz', tagline: 'Structured logging + notifiers.', repo: 'https://github.com/kubex-ecosystem/logz', badges: ['Go', 'Obs'] },
]

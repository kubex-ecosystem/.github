import JSZip from 'jszip';
import { NextRequest, NextResponse } from 'next/server';

// Interface para resultados da extração de código AI
interface ParsedMarker {
  filename: string;
  content: string;
  startLine: number;
  endLine: number;
}

interface ExtractionResults {
  totalMarkers: number;
  totalFiles: number;
  totalBytes: number;
  errors: Array<{ line: number; message: string }>;
  markers: ParsedMarker[];
}

// Parser de marcadores para código AI
class AIMarkerParser {
  private readonly FS_CHAR = String.fromCharCode(28);
  private readonly markerRegex = new RegExp(`^\\/\\/${this.FS_CHAR.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/ (.+?) \\/${this.FS_CHAR.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/\\/$`);

  parseAICode(code: string): ExtractionResults {
    const results: ExtractionResults = {
      totalMarkers: 0,
      totalFiles: 0,
      totalBytes: 0,
      errors: [],
      markers: []
    };

    try {
      const lines = code.split('\n');

      let currentMarker: Partial<ParsedMarker> | null = null;
      let currentContent: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNumber = i + 1;

        const markerMatch = line.match(this.markerRegex);

        if (markerMatch) {
          // Salvar marcador anterior se existir
          if (currentMarker && currentMarker.filename) {
            const marker: ParsedMarker = {
              filename: currentMarker.filename,
              content: currentContent.join('\n'),
              startLine: currentMarker.startLine || 0,
              endLine: lineNumber - 1
            };
            results.markers.push(marker);
            results.totalBytes += marker.content.length;
          }

          // Iniciar novo marcador
          currentMarker = {
            filename: markerMatch[1],
            startLine: lineNumber + 1
          };
          currentContent = [];
          results.totalMarkers++;
        } else if (currentMarker) {
          currentContent.push(line);
        }
      }

      // Salvar último marcador
      if (currentMarker && currentMarker.filename) {
        const marker: ParsedMarker = {
          filename: currentMarker.filename,
          content: currentContent.join('\n'),
          startLine: currentMarker.startLine || 0,
          endLine: lines.length
        };
        results.markers.push(marker);
        results.totalBytes += marker.content.length;
      }

      results.totalFiles = results.markers.length;

    } catch (error) {
      results.errors.push({
        line: 0,
        message: `Erro ao processar código AI: ${error}`
      });
    }

    return results;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code, format = 'json', projectName = 'ai-generated-project' } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Code content required' }, { status: 400 });
    }

    const parser = new AIMarkerParser();
    const results = parser.parseAICode(code);

    if (results.errors.length > 0) {
      return NextResponse.json({
        error: 'Failed to parse AI code',
        details: results.errors
      }, { status: 400 });
    }

    if (results.markers.length === 0) {
      return NextResponse.json({
        error: 'No valid markers found in code',
        hint: 'Make sure your AI-generated code contains LookAtni invisible markers'
      }, { status: 400 });
    }

    if (format === 'zip') {
      // Criar ZIP com todos os arquivos extraídos
      const zip = new JSZip();

      // Criar estrutura de pastas automaticamente
      results.markers.forEach(marker => {
        zip.file(marker.filename, marker.content);
      });

      // Adicionar arquivo README com informações da extração
      const readmeContent = `# ${projectName}

Este projeto foi extraído usando LookAtni File Markers a partir de código gerado por IA.

## Estatísticas da Extração

- **Total de Arquivos**: ${results.totalFiles}
- **Total de Marcadores**: ${results.totalMarkers}
- **Tamanho Total**: ${Math.round(results.totalBytes / 1024)}KB
- **Data da Extração**: ${new Date().toLocaleString('pt-BR')}

## Estrutura de Arquivos

${results.markers.map(marker => `- \`${marker.filename}\` (${marker.content.split('\n').length} linhas)`).join('\n')}

## Como Foi Extraído

1. Código AI foi colado no LookAtni Playground
2. Marcadores invisíveis foram detectados automaticamente
3. Estrutura de arquivos foi extraída e empacotada
4. ZIP foi gerado com todos os arquivos

---

*Gerado por [LookAtni File Markers](https://github.com/kubex-ecosystem/lookatni-file-markers)*
`;

      zip.file('README_EXTRACTION.md', readmeContent);

      const zipBuffer = await zip.generateAsync({ type: 'uint8array' });
      const arrayBuffer = new ArrayBuffer(zipBuffer.length);
      const view = new Uint8Array(arrayBuffer);
      view.set(zipBuffer);

      return new Response(arrayBuffer, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${projectName.replace(/\s+/g, '-')}.zip"`
        }
      });
    }

    // Retorno JSON com detalhes da extração
    return NextResponse.json({
      success: true,
      extracted: true,
      projectName,
      stats: {
        totalFiles: results.totalFiles,
        totalMarkers: results.totalMarkers,
        totalBytes: results.totalBytes,
        extractedAt: new Date().toISOString()
      },
      files: results.markers.map(marker => ({
        path: marker.filename,
        content: marker.content,
        size: marker.content.length,
        lines: marker.content.split('\n').length,
        preview: marker.content.substring(0, 200) + (marker.content.length > 200 ? '...' : '')
      })),
      downloadUrl: `/api/extract-ai-project?code=${encodeURIComponent(code)}&format=zip&projectName=${encodeURIComponent(projectName)}`
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Failed to extract AI project',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const format = searchParams.get('format') || 'json';
  const projectName = searchParams.get('projectName') || 'ai-generated-project';

  if (!code) {
    return NextResponse.json({ error: 'Code parameter required' }, { status: 400 });
  }

  // Redirecionar para POST com os mesmos parâmetros
  return POST(new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ code: decodeURIComponent(code), format, projectName }),
    headers: { 'Content-Type': 'application/json' }
  }));
}

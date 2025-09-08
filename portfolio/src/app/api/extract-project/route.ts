import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import JSZip from 'jszip';

// Interface para resultados da extração
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

// Parser de marcadores (baseado na sua extensão)
class MarkerParser {
  private readonly FS_CHAR = String.fromCharCode(28);
  private readonly markerRegex = new RegExp(`^\\/\\/${this.FS_CHAR.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/ (.+?) \\/${this.FS_CHAR.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/\\/$`);

  parseMarkedFile(filePath: string): ExtractionResults {
    const results: ExtractionResults = {
      totalMarkers: 0,
      totalFiles: 0,
      totalBytes: 0,
      errors: [],
      markers: []
    };

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      
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
        message: `Erro ao ler arquivo: ${error}`
      });
    }
    
    return results;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectFile = searchParams.get('project');
  
  if (!projectFile) {
    return NextResponse.json({ error: 'Project file parameter required' }, { status: 400 });
  }
  
  try {
    const projectPath = path.join(process.cwd(), 'public', 'projects', projectFile);
    
    if (!fs.existsSync(projectPath)) {
      return NextResponse.json({ error: 'Project file not found' }, { status: 404 });
    }
    
    const parser = new MarkerParser();
    const results = parser.parseMarkedFile(projectPath);
    
    return NextResponse.json({
      success: true,
      projectName: projectFile,
      stats: {
        totalFiles: results.totalFiles,
        totalMarkers: results.totalMarkers,
        totalBytes: results.totalBytes,
        errors: results.errors
      },
      files: results.markers.map(marker => ({
        path: marker.filename,
        content: marker.content,
        size: marker.content.length,
        lines: marker.content.split('\n').length
      }))
    });
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to process project', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { projectFile, format = 'json' } = await request.json();
    
    if (!projectFile) {
      return NextResponse.json({ error: 'Project file required' }, { status: 400 });
    }
    
    const projectPath = path.join(process.cwd(), 'public', 'projects', projectFile);
    
    if (!fs.existsSync(projectPath)) {
      return NextResponse.json({ error: 'Project file not found' }, { status: 404 });
    }
    
    const parser = new MarkerParser();
    const results = parser.parseMarkedFile(projectPath);
    
    if (format === 'zip') {
      // Criar ZIP com todos os arquivos
      const zip = new JSZip();
      
      results.markers.forEach(marker => {
        zip.file(marker.filename, marker.content);
      });
      
      const zipBuffer = await zip.generateAsync({ type: 'uint8array' });
      const arrayBuffer = new ArrayBuffer(zipBuffer.length);
      const view = new Uint8Array(arrayBuffer);
      view.set(zipBuffer);
      
      return new Response(arrayBuffer, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${projectFile.replace('.txt', '')}.zip"`
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      extracted: true,
      projectName: projectFile,
      stats: {
        totalFiles: results.totalFiles,
        totalMarkers: results.totalMarkers,
        totalBytes: results.totalBytes
      },
      files: results.markers
    });
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to extract project', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

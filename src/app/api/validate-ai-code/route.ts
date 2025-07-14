import { NextRequest, NextResponse } from 'next/server';

// Interface para validação de código AI
interface ValidationResult {
  isValid: boolean;
  markerCount: number;
  estimatedFiles: number;
  errors: string[];
  warnings: string[];
  projectStructure: string[];
}

class AICodeValidator {
  private readonly FS_CHAR = String.fromCharCode(28);
  private readonly markerRegex = new RegExp(`^\\/\\/${this.FS_CHAR.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/ (.+?) \\/${this.FS_CHAR.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/\\/$`);

  validateAICode(code: string): ValidationResult {
    const result: ValidationResult = {
      isValid: false,
      markerCount: 0,
      estimatedFiles: 0,
      errors: [],
      warnings: [],
      projectStructure: []
    };

    try {
      const lines = code.split('\n');
      const foundMarkers: string[] = [];
      const duplicateFiles: string[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const markerMatch = line.match(this.markerRegex);
        
        if (markerMatch) {
          const filename = markerMatch[1];
          result.markerCount++;
          
          // Verificar duplicatas
          if (foundMarkers.includes(filename)) {
            duplicateFiles.push(filename);
            result.errors.push(`Arquivo duplicado encontrado: ${filename}`);
          } else {
            foundMarkers.push(filename);
            result.projectStructure.push(filename);
          }
          
          // Validar nome do arquivo
          if (filename.includes('..')) {
            result.errors.push(`Nome de arquivo inseguro: ${filename}`);
          }
          
          // Verificar extensões válidas
          const validExtensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.java', '.cpp', '.c', '.h', '.css', '.scss', '.html', '.md', '.json', '.yml', '.yaml', '.xml', '.txt', '.env', '.gitignore', '.dockerfile'];
          const hasValidExtension = validExtensions.some(ext => filename.toLowerCase().endsWith(ext));
          
          if (!hasValidExtension && !filename.includes('/')) {
            result.warnings.push(`Extensão de arquivo desconhecida: ${filename}`);
          }
        }
      }
      
      result.estimatedFiles = foundMarkers.length;
      
      // Validações gerais
      if (result.markerCount === 0) {
        result.errors.push('Nenhum marcador de arquivo encontrado no código');
      } else if (result.markerCount < 3) {
        result.warnings.push('Projeto muito pequeno (menos de 3 arquivos)');
      }
      
      if (duplicateFiles.length > 0) {
        result.errors.push(`Arquivos duplicados: ${duplicateFiles.join(', ')}`);
      }
      
      // Verificar estrutura básica de projeto
      const hasPackageJson = foundMarkers.some(f => f.endsWith('package.json'));
      const hasMainFile = foundMarkers.some(f => f.includes('index.') || f.includes('main.') || f.includes('app.'));
      const hasReadme = foundMarkers.some(f => f.toLowerCase().includes('readme'));
      
      if (!hasPackageJson && foundMarkers.some(f => f.endsWith('.js') || f.endsWith('.ts'))) {
        result.warnings.push('Projeto JavaScript/TypeScript sem package.json');
      }
      
      if (!hasMainFile) {
        result.warnings.push('Nenhum arquivo principal identificado');
      }
      
      if (!hasReadme) {
        result.warnings.push('Projeto sem README');
      }
      
      // Determinar se é válido
      result.isValid = result.errors.length === 0 && result.markerCount > 0;
      
    } catch (error) {
      result.errors.push(`Erro ao processar código: ${error}`);
    }
    
    return result;
  }
  
  extractProjectInfo(code: string) {
    const lines = code.split('\n');
    const projectInfo = {
      name: 'Unknown Project',
      description: '',
      language: 'Unknown',
      framework: 'Unknown',
      estimatedSize: code.length
    };
    
    // Tentar extrair informações do código
    for (const line of lines.slice(0, 10)) {
      if (line.includes('# ') && !projectInfo.name.includes('Unknown')) {
        projectInfo.name = line.replace('# ', '').trim();
      }
      if (line.includes('package.json') || line.includes('.js') || line.includes('.ts')) {
        projectInfo.language = 'JavaScript/TypeScript';
      }
      if (line.includes('react') || line.includes('React')) {
        projectInfo.framework = 'React';
      }
      if (line.includes('next') || line.includes('Next')) {
        projectInfo.framework = 'Next.js';
      }
      if (line.includes('vue') || line.includes('Vue')) {
        projectInfo.framework = 'Vue.js';
      }
    }
    
    return projectInfo;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Code content required' }, { status: 400 });
    }
    
    const validator = new AICodeValidator();
    const validationResult = validator.validateAICode(code);
    const projectInfo = validator.extractProjectInfo(code);
    
    return NextResponse.json({
      success: true,
      validation: validationResult,
      projectInfo,
      suggestions: generateSuggestions(validationResult, projectInfo)
    });
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to validate AI code', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

function generateSuggestions(validation: ValidationResult, projectInfo: any): string[] {
  const suggestions: string[] = [];
  
  if (!validation.isValid) {
    suggestions.push('🔧 Código não contém marcadores válidos do LookAtni');
    suggestions.push('💡 Peça para a IA gerar código com marcadores invisíveis');
  }
  
  if (validation.warnings.length > 0) {
    suggestions.push('⚠️ Há alguns avisos sobre a estrutura do projeto');
  }
  
  if (validation.markerCount > 0) {
    suggestions.push(`✅ ${validation.markerCount} arquivos detectados`);
    suggestions.push('🚀 Clique em "Extrair Projeto" para baixar');
  }
  
  if (projectInfo.framework !== 'Unknown') {
    suggestions.push(`🎯 Projeto ${projectInfo.framework} detectado`);
  }
  
  return suggestions;
}

/** @type {import('next').NextConfig} */

const normalizeString = (strToNormalize = '') => {
  try {
    // Load libraries inside the function with require to avoid issues with Next.js build
    const os = require('os');
    const targetPlatform = os.platform()
    
    // Here we can normalize the string to be used as a build name and transform it
    // to a format that is safe for the platform that we are using.
    // For example, on Windows we need to replace backslashes with dashes,
    // on macOS and Linux we need to replace slashes with dashes.
    // This is a simple normalization, but it can be extended to handle more cases.
    switch (targetPlatform) {
      case 'win32':
        strToNormalize = `${strToNormalize.replace(/\\/g, '-')}`;
        break;
      case 'darwin':
        strToNormalize = `${strToNormalize.replace(/\//g, '-')}`;
        break;
      case 'android':
        strToNormalize = `${strToNormalize.replace(/\//g, '-')}`;
        break;
      case 'ios':
        strToNormalize = `${strToNormalize.replace(/\//g, '-')}`;
        break;
      case 'freebsd':
        strToNormalize = `${strToNormalize.replace(/\//g, '-')}`;
        break;
      case 'sunos':
        strToNormalize = `${strToNormalize.replace(/\//g, '-')}`;
        break;
      default:
        strToNormalize = `${strToNormalize.replace(/\//g, '-')}`;
    }

    return strToNormalize.toLowerCase();
  } catch (error) {
    console.error('Error normalizing build name:', error);
    return strToNormalize; // Return the original if normalization fails
  }
}

const constructBuildLabel = (buildName, version) => {
  try {
    // If exists process.env.BUILD_NAME, use only this value
    // If not, use process.env.BUILD_NAME_SUFFIX, process.env.GIT_BRANCH,
    // process.env.GIT_COMMIT, process.env.GIT_TAG in this order
    let buildNameSuffix = '';

    if (process.env.BUILD_NAME && process.env.BUILD_NAME !== '') {
      buildNameSuffix = `${process.env.BUILD_NAME}`;
    } else {
      if (process.env.BUILD_NAME_SUFFIX && process.env.BUILD_NAME_SUFFIX !== '') {
        buildNameSuffix = `${process.env.BUILD_NAME_SUFFIX}`;
      } else if (process.env.GIT_BRANCH && process.env.GIT_BRANCH !== '') {
        buildNameSuffix = `${process.env.GIT_BRANCH}`;
      } else if (process.env.GIT_COMMIT && process.env.GIT_COMMIT !== '') {
        buildNameSuffix = `${process.env.GIT_COMMIT}`;
      } else if (process.env.GIT_TAG && process.env.GIT_TAG !== '') {
        buildNameSuffix = `${process.env.GIT_TAG}`;
      }
    }

    if (!buildNameSuffix || buildNameSuffix === '') {
      return `${normalizeString(buildName)}_${normalizeString(version)}`;
    }

    return `${normalizeString(buildName)}-${normalizeString(buildNameSuffix)}_${normalizeString(version)}`;
  } catch (error) {
    console.error('Error generating build name:', error);
    return `${normalizeString(buildName)}-${normalizeString(version)}`; // Fallback to a simple format
  }
}

const getBuildName = (defaultName) => {
  defaultName = defaultName || 'default-build';
  try {
    // Load libraries inside the function with require to avoid issues with Next.js build
    const path = require('path');
    const fs = require('fs');

    const currentDir = path.resolve(__dirname);
    const packageJsonPath = path.join(currentDir, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      return defaultName;
    }
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (!packageJson.version) {
      return defaultName;
    }
    
    const buildName = constructBuildLabel(packageJson.name || 'app', packageJson.version || '0.0.0') || normalizeString(defaultName);

    return buildName || defaultName;
  } catch (error) {
    console.error('Error generating build name suffix:', error);
    return defaultName; // Fallback to default name if any error occurs
  }
};

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  //distDir: `build/${getBuildName('out')}`,
  distDir: 'out',
  reactStrictMode: true,
  staticPageGenerationTimeout: 60,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

// Function to extract Brotli files
function extractBrotliFiles() {
  const buildDir = path.join(__dirname, 'Build');
  
  if (!fileExists(buildDir)) {
    console.log('Build directory not found');
    return;
  }
  
  const files = fs.readdirSync(buildDir);
  
  for (const file of files) {
    if (file.endsWith('.br')) {
      const brFilePath = path.join(buildDir, file);
      const outputFilePath = path.join(buildDir, file.replace('.br', ''));
      
      if (!fileExists(outputFilePath)) {
        console.log(`Extracting ${file} to ${file.replace('.br', '')}`);
        
        try {
          // Use PowerShell to extract the Brotli file
          const command = `
            $brFile = [System.IO.File]::ReadAllBytes("${brFilePath.replace(/\\/g, '\\\\')}");
            $ms = New-Object System.IO.MemoryStream($brFile);
            $br = New-Object System.IO.Compression.BrotliStream($ms, [System.IO.Compression.CompressionMode]::Decompress);
            $output = New-Object System.IO.MemoryStream;
            $br.CopyTo($output);
            [System.IO.File]::WriteAllBytes("${outputFilePath.replace(/\\/g, '\\\\')}", $output.ToArray());
          `;
          
          execSync(`powershell -Command "${command}"`, { stdio: 'inherit' });
          console.log(`Successfully extracted ${file}`);
        } catch (err) {
          console.error(`Error extracting ${file}:`, err);
        }
      } else {
        console.log(`File ${file.replace('.br', '')} already exists, skipping extraction`);
      }
    }
  }
}

// Run the extraction
console.log('Starting Brotli extraction...');
extractBrotliFiles();
console.log('Brotli extraction complete');
// Script para limpiar la caché de Next.js y resolver problemas de chunks
console.log('Limpiando caché de Next.js...');

// Función para eliminar directorios
const fs = require('fs');
const path = require('path');

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const filePath = path.join(folderPath, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        deleteFolderRecursive(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(folderPath);
    console.log(`Directorio eliminado: ${folderPath}`);
  }
}

// Directorios a limpiar
const cacheDirs = [
  '.next',
  'node_modules/.cache',
  '.parcel-cache'
];

// Eliminar directorios de caché
cacheDirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  try {
    deleteFolderRecursive(fullPath);
    console.log(`✓ ${dir} eliminado`);
  } catch (error) {
    console.log(`⚠ No se pudo eliminar ${dir}:`, error.message);
  }
});

console.log('Limpieza completada. Por favor, reinicia el servidor de desarrollo.');
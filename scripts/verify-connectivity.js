#!/usr/bin/env node

/**
 * Script de verificación de conectividad para la integración de ColombiaTIC AI
 * 
 * Este script verifica la conectividad con los servicios backend y WebSocket
 * requeridos para la integración del frontend con el backend principal y el Meta-Agent.
 */

const https = require('https');
const http = require('http');
const { execSync } = require('child_process');

// Configuración de los endpoints a verificar
const CONFIG = {
  API_ENDPOINT: process.env.API_BASE_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net',
  WEBSOCKET_ENDPOINT: process.env.WEBSOCKET_URL || 'http://localhost:3007',
  TENANT_ID: process.env.TENANT_ID || '7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba'
};

/**
 * Verifica la conectividad HTTP/HTTPS con un endpoint
 * @param {string} url - URL del endpoint a verificar
 * @returns {Promise<Object>} Resultado de la verificación
 */
function checkHttpEndpoint(url) {
  return new Promise((resolve) => {
    console.log(`🔍 Verificando conectividad con: ${url}`);
    
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, (res) => {
      resolve({
        success: res.statusCode >= 200 && res.statusCode < 400,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        url: url
      });
    });
    
    req.on('error', (err) => {
      resolve({
        success: false,
        error: err.message,
        url: url
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Timeout',
        url: url
      });
    });
    
    req.setTimeout(5000); // 5 segundos de timeout
  });
}

/**
 * Verifica la conectividad WebSocket
 * @param {string} url - URL del WebSocket a verificar
 * @returns {Promise<Object>} Resultado de la verificación
 */
function checkWebSocketEndpoint(url) {
  return new Promise((resolve) => {
    console.log(`🔍 Verificando conectividad WebSocket con: ${url}`);
    
    try {
      // Intentar resolver el DNS primero
      const { hostname } = new URL(url);
      
      require('dns').lookup(hostname, (err) => {
        if (err) {
          resolve({
            success: false,
            error: `No se puede resolver el hostname: ${hostname}`,
            url: url
          });
          return;
        }
        
        // Para WebSocket, verificamos que el puerto esté accesible
        const { port } = new URL(url);
        if (port) {
          // Usar telnet-like approach para verificar el puerto
          const net = require('net');
          const socket = net.createConnection(port, hostname, () => {
            socket.end();
            resolve({
              success: true,
              message: `Puerto ${port} accesible en ${hostname}`,
              url: url
            });
          });
          
          socket.on('error', (err) => {
            resolve({
              success: false,
              error: `No se puede conectar al puerto ${port}: ${err.message}`,
              url: url
            });
          });
          
          socket.setTimeout(5000);
          socket.on('timeout', () => {
            socket.destroy();
            resolve({
              success: false,
              error: `Timeout al conectar al puerto ${port}`,
              url: url
            });
          });
        } else {
          resolve({
            success: true,
            message: 'Endpoint WebSocket accesible',
            url: url
          });
        }
      });
    } catch (err) {
      resolve({
        success: false,
        error: `Error al parsear la URL: ${err.message}`,
        url: url
      });
    }
  });
}

/**
 * Verifica las variables de entorno requeridas
 * @returns {Array} Lista de variables faltantes
 */
function checkEnvironmentVariables() {
  console.log('🔍 Verificando variables de entorno...');
  
  const requiredVars = ['TENANT_ID', 'API_BASE_URL', 'WEBSOCKET_URL'];
  const missingVars = [];
  
  for (const envVar of requiredVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  }
  
  return missingVars;
}

/**
 * Verifica la instalación de dependencias requeridas
 * @returns {Promise<Array>} Lista de dependencias faltantes
 */
async function checkDependencies() {
  console.log('🔍 Verificando dependencias...');
  
  const dependencies = [
    'axios',
    'socket.io-client',
    'lucide-react'
  ];
  
  const missingDeps = [];
  
  for (const dep of dependencies) {
    try {
      require.resolve(dep);
    } catch (err) {
      missingDeps.push(dep);
    }
  }
  
  return missingDeps;
}

/**
 * Muestra un resumen de la verificación
 * @param {Array} results - Resultados de las verificaciones
 */
function printSummary(results) {
  console.log('\n📋 RESUMEN DE VERIFICACIÓN:');
  console.log('========================');
  
  let allPassed = true;
  
  for (const result of results) {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.url || result.name || result.type}`);
    
    if (result.success) {
      if (result.statusCode) {
        console.log(`   Código: ${result.statusCode} ${result.statusMessage || ''}`);
      }
      if (result.message) {
        console.log(`   Mensaje: ${result.message}`);
      }
    } else {
      console.log(`   Error: ${result.error}`);
      allPassed = false;
    }
  }
  
  console.log('\n');
  
  if (allPassed) {
    console.log('🎉 ¡Todas las verificaciones pasaron exitosamente!');
    console.log('   La integración está lista para funcionar.');
  } else {
    console.log('⚠️  Algunas verificaciones fallaron.');
    console.log('   Por favor, revise los errores e intente nuevamente.');
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando verificación de conectividad para ColombiaTIC AI Integration');
  console.log('=====================================================================\n');
  
  // Verificar variables de entorno
  const missingEnvVars = checkEnvironmentVariables();
  const envCheckResult = {
    name: 'Variables de entorno',
    success: missingEnvVars.length === 0,
    error: missingEnvVars.length > 0 ? `Variables faltantes: ${missingEnvVars.join(', ')}` : null
  };
  
  // Verificar dependencias
  const missingDeps = await checkDependencies();
  const depsCheckResult = {
    name: 'Dependencias',
    success: missingDeps.length === 0,
    error: missingDeps.length > 0 ? `Dependencias faltantes: ${missingDeps.join(', ')}` : null
  };
  
  // Verificar conectividad HTTP
  const apiResult = await checkHttpEndpoint(CONFIG.API_ENDPOINT);
  
  // Verificar conectividad WebSocket
  const wsResult = await checkWebSocketEndpoint(CONFIG.WEBSOCKET_ENDPOINT);
  
  // Mostrar resumen
  printSummary([
    envCheckResult,
    depsCheckResult,
    apiResult,
    wsResult
  ]);
  
  // Salir con código de error si alguna verificación falló
  const allPassed = [envCheckResult, depsCheckResult, apiResult, wsResult].every(r => r.success);
  process.exit(allPassed ? 0 : 1);
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main().catch(err => {
    console.error('Error fatal:', err);
    process.exit(1);
  });
}

module.exports = {
  checkHttpEndpoint,
  checkWebSocketEndpoint,
  checkEnvironmentVariables,
  checkDependencies
};
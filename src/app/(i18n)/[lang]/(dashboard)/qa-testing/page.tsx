// src/app/(i18n)/[lang]/(dashboard)/qa-testing/page.tsx
"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { withAuth } from '@/components/hoc/withAuth';
import { 
  TestTube, 
  Play, 
  Square, 
  RotateCcw, 
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  FileText
} from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  duration: string;
  lastRun: string;
}

function QATestingPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: 'TC-001',
      name: 'Validación de inicio de sesión',
      description: 'Verificar que los usuarios puedan iniciar sesión correctamente',
      status: 'passed',
      duration: '2.3s',
      lastRun: '2023-06-20 14:30'
    },
    {
      id: 'TC-002',
      name: 'Prueba de carga del dashboard',
      description: 'Verificar tiempos de carga del dashboard principal',
      status: 'running',
      duration: '1.8s',
      lastRun: '2023-06-20 14:32'
    },
    {
      id: 'TC-003',
      name: 'Funcionalidad del chatbot',
      description: 'Verificar respuestas correctas del asistente virtual',
      status: 'failed',
      duration: '5.1s',
      lastRun: '2023-06-20 14:25'
    },
    {
      id: 'TC-004',
      name: 'Integración con servicios externos',
      description: 'Verificar conectividad con APIs de terceros',
      status: 'passed',
      duration: '3.7s',
      lastRun: '2023-06-20 14:20'
    }
  ]);
  const [isRunningAll, setIsRunningAll] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-500';
      case 'running': return 'bg-blue-500';
      case 'passed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'running': return 'Ejecutando';
      case 'passed': return 'Pasó';
      case 'failed': return 'Falló';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'running': return <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>;
      case 'passed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const runAllTests = () => {
    setIsRunningAll(true);
    // Simulate running all tests
    setTimeout(() => {
      setTestCases(testCases.map(tc => ({
        ...tc,
        status: tc.status === 'failed' ? 'running' : tc.status
      })));
      
      // Simulate test completion
      setTimeout(() => {
        setTestCases(prev => prev.map(tc => ({
          ...tc,
          status: tc.status === 'running' ? (Math.random() > 0.3 ? 'passed' : 'failed') : tc.status,
          lastRun: new Date().toLocaleString('es-ES', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }).replace(',', '')
        })));
        setIsRunningAll(false);
      }, 3000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">QA Testing</h1>
            <p className="text-gray-400">Gestiona y ejecuta pruebas de calidad automatizadas</p>
          </div>
          <div className="flex gap-2">
            <button 
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={() => router.push('/dashboard/documentation')}
            >
              <FileText className="w-4 h-4" />
              Documentación
            </button>
            <button 
              className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              onClick={runAllTests}
              disabled={isRunningAll}
            >
              {isRunningAll ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  Ejecutando...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Ejecutar Todo
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Pruebas</p>
              <p className="text-2xl font-bold text-white">{testCases.length}</p>
            </div>
            <TestTube className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pasaron</p>
              <p className="text-2xl font-bold text-white text-green-500">
                {testCases.filter(tc => tc.status === 'passed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Fallaron</p>
              <p className="text-2xl font-bold text-white text-red-500">
                {testCases.filter(tc => tc.status === 'failed').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pendientes</p>
              <p className="text-2xl font-bold text-white text-yellow-500">
                {testCases.filter(tc => tc.status === 'pending' || tc.status === 'running').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Test Cases Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Casos de Prueba</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Duración
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Última Ejecución
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {testCases.map((testCase) => (
                <tr key={testCase.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {testCase.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {testCase.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                    {testCase.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {testCase.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {testCase.lastRun}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(testCase.status)} text-white`}>
                      {getStatusIcon(testCase.status)}
                      <span className="ml-1">{getStatusText(testCase.status)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-gray-400 hover:text-white p-1 rounded">
                        <Play className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-white p-1 rounded">
                        <RotateCcw className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-white p-1 rounded">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withAuth(QATestingPage);
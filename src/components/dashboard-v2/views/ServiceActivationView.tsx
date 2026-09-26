// src/components/dashboard-v2/views/ServiceActivationView.tsx
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Rocket, 
  Settings, 
  CreditCard,
  CheckCircle2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';

interface ServiceActivationViewProps {
  data: Record<string, any>;
}

type Step = 'plan' | 'config' | 'payment' | 'confirm';

const STEPS: { id: Step; label: string; icon: any }[] = [
  { id: 'plan', label: 'Seleccionar Plan', icon: Settings },
  { id: 'config', label: 'Configuración', icon: Settings },
  { id: 'payment', label: 'Pago', icon: CreditCard },
  { id: 'confirm', label: 'Confirmación', icon: CheckCircle2 },
];

export default function ServiceActivationView({ data }: ServiceActivationViewProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>('plan');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [config, setConfig] = useState({
    apiKey: '',
    webhookUrl: '',
    timezone: 'America/Bogota'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const { serviceId, serviceName } = data;

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      features: ['Hasta 1,000 conversaciones/mes', 'Soporte básico', '1 canal']
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 99,
      features: ['Conversaciones ilimitadas', 'Soporte prioritario', '5 canales', 'Analytics avanzado'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      features: ['Todo en Pro', 'Soporte 24/7', 'Canales ilimitados', 'IA personalizada', 'SLA garantizado']
    }
  ];

  const getCurrentStepIndex = () => STEPS.findIndex(s => s.id === currentStep);

  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1].id);
    }
  };

  const handleActivate = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showToast(`¡${serviceName} activado exitosamente!`, 'success');
      setCurrentStep('confirm');
    } catch (error) {
      showToast('Error al activar el servicio', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'plan':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Selecciona tu Plan</h2>
              <p className="text-gray-400">Elige el plan que mejor se adapte a tus necesidades</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xs font-bold text-white">
                      MÁS POPULAR
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-blue-400">${plan.price}</span>
                      <span className="text-gray-500">/mes</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {selectedPlan === plan.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'config':
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Configuración del Servicio</h2>
              <p className="text-gray-400">Personaliza los parámetros de {serviceName}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  API Key (opcional)
                </label>
                <input
                  type="text"
                  value={config.apiKey}
                  onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                  placeholder="Genera automáticamente si está vacío"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={config.webhookUrl}
                  onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                  placeholder="https://tu-dominio.com/webhook"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Zona Horaria
                </label>
                <select
                  value={config.timezone}
                  onChange={(e) => setConfig({ ...config, timezone: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="America/Bogota">Colombia (Bogotá)</option>
                  <option value="America/Mexico_City">México (Ciudad de México)</option>
                  <option value="America/Lima">Perú (Lima)</option>
                  <option value="America/Buenos_Aires">Argentina (Buenos Aires)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Método de Pago</h2>
              <p className="text-gray-400">Completa tu información de pago</p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Plan seleccionado</span>
                <span className="text-white font-bold">
                  {plans.find(p => p.id === selectedPlan)?.name}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Precio mensual</span>
                <span className="text-2xl font-bold text-blue-400">
                  ${plans.find(p => p.id === selectedPlan)?.price}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Puedes cancelar en cualquier momento</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <p className="text-sm text-blue-300">
                <strong>Nota:</strong> El pago será procesado de forma segura a través de nuestra pasarela de pagos.
              </p>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-2">¡Activación Exitosa!</h2>
              <p className="text-gray-400 text-lg">
                {serviceName} ha sido activado correctamente en tu cuenta
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 text-left">
              <h3 className="font-bold text-white mb-4">Próximos Pasos:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <span className="text-gray-300">Revisa tu email para instrucciones de configuración</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <span className="text-gray-300">Configura tus canales de comunicación</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <span className="text-gray-300">Comienza a utilizar {serviceName}</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
              >
                Ir al Dashboard
              </button>
              <button
                onClick={() => router.push('/dashboard/settings')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors flex items-center gap-2"
              >
                <Settings className="w-5 h-5" />
                Configurar Ahora
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = getCurrentStepIndex() > index;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : isCompleted
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-700 bg-gray-800 text-gray-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <span className="text-xs text-gray-400 mt-2 text-center">{step.label}</span>
                </div>
                
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {currentStep !== 'confirm' && (
        <div className="flex items-center justify-between mt-12 max-w-2xl">
          <button
            onClick={handleBack}
            disabled={currentStep === 'plan'}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Atrás
          </button>

          {currentStep === 'payment' ? (
            <button
              onClick={handleActivate}
              disabled={!selectedPlan || isProcessing}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Activando...
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5" />
                  Activar Servicio
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentStep === 'plan' && !selectedPlan}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              Siguiente
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

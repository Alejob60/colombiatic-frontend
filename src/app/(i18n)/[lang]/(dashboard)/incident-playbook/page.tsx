// src/app/(i18n)/[lang]/(dashboard)/incident-playbook/page.tsx
// Incident Response Playbook

"use client";

import React, { useState } from 'react';
import { withAuth } from '@/components/hoc/withAuth';
import { Button } from '@/components/ui/Button';
import { 
  AlertTriangle, 
  Play, 
  CheckCircle,
  Clock,
  User,
  Phone,
  Mail,
  Copy
} from 'lucide-react';

const IncidentPlaybook = () => {
  const [activeIncident, setActiveIncident] = useState<any>(null);
  const [incidentLog, setIncidentLog] = useState<any[]>([]);

  const playbooks = [
    {
      id: 'database-outage',
      title: 'Database Outage Response',
      severity: 'critical',
      steps: [
        { id: 1, title: 'Confirm outage', status: 'completed' },
        { id: 2, title: 'Notify team leads', status: 'completed' },
        { id: 3, title: 'Check database logs', status: 'in-progress' },
        { id: 4, title: 'Restart database service', status: 'pending' },
        { id: 5, title: 'Verify system recovery', status: 'pending' },
        { id: 6, title: 'Document incident', status: 'pending' }
      ]
    },
    {
      id: 'api-performance',
      title: 'API Performance Degradation',
      severity: 'high',
      steps: [
        { id: 1, title: 'Monitor API response times', status: 'completed' },
        { id: 2, title: 'Check server resources', status: 'in-progress' },
        { id: 3, title: 'Scale up instances', status: 'pending' },
        { id: 4, title: 'Optimize database queries', status: 'pending' },
        { id: 5, title: 'Implement caching', status: 'pending' }
      ]
    },
    {
      id: 'security-breach',
      title: 'Security Breach Protocol',
      severity: 'critical',
      steps: [
        { id: 1, title: 'Isolate affected systems', status: 'pending' },
        { id: 2, title: 'Change all passwords', status: 'pending' },
        { id: 3, title: 'Audit access logs', status: 'pending' },
        { id: 4, title: 'Notify authorities', status: 'pending' },
        { id: 5, title: 'Implement additional security measures', status: 'pending' }
      ]
    }
  ];

  const teamMembers = [
    { id: 1, name: 'Alex Johnson', role: 'DevOps Lead', phone: '+1 (555) 123-4567', email: 'alex.j@colombiatic.com.co' },
    { id: 2, name: 'Maria Garcia', role: 'Security Officer', phone: '+1 (555) 234-5678', email: 'maria.g@colombiatic.com.co' },
    { id: 3, name: 'David Chen', role: 'Database Admin', phone: '+1 (555) 345-6789', email: 'david.c@colombiatic.com.co' },
    { id: 4, name: 'Sarah Williams', role: 'Support Manager', phone: '+1 (555) 456-7890', email: 'sarah.w@colombiatic.com.co' }
  ];

  const handleStartPlaybook = (playbookId: string) => {
    const playbook = playbooks.find(p => p.id === playbookId);
    if (playbook) {
      setActiveIncident({
        ...playbook,
        startTime: new Date().toISOString(),
        status: 'active'
      });
      
      // Add to incident log
      setIncidentLog(prev => [{
        id: Date.now(),
        playbookId,
        title: playbook.title,
        startTime: new Date().toISOString(),
        status: 'active'
      }, ...prev]);
    }
  };

  const handleCopyContact = (contact: string) => {
    navigator.clipboard.writeText(contact);
    alert('Contact copied to clipboard');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-900 text-red-300';
      case 'high': return 'bg-orange-900 text-orange-300';
      case 'medium': return 'bg-yellow-900 text-yellow-300';
      case 'low': return 'bg-green-900 text-green-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'pending': return <div className="h-5 w-5 rounded-full border-2 border-gray-500"></div>;
      default: return <div className="h-5 w-5 rounded-full border-2 border-gray-500"></div>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <AlertTriangle className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-white">Incident Response Playbook</h1>
        </div>
        <Button variant="outline">
          <Play className="h-4 w-4 mr-2" />
          Report New Incident
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Playbook List */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Available Playbooks</h3>
            <div className="space-y-4">
              {playbooks.map((playbook) => (
                <div key={playbook.id} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-medium text-white">{playbook.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(playbook.severity)}`}>
                      {playbook.severity.charAt(0).toUpperCase() + playbook.severity.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{playbook.steps.length} steps</span>
                    <Button 
                      size="sm" 
                      onClick={() => handleStartPlaybook(playbook.id)}
                      disabled={activeIncident?.id === playbook.id}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {activeIncident?.id === playbook.id ? 'Active' : 'Start'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Incident */}
          {activeIncident && (
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Active Incident: {activeIncident.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(activeIncident.severity)}`}>
                  {activeIncident.severity.charAt(0).toUpperCase() + activeIncident.severity.slice(1)}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                {activeIncident.steps.map((step: any) => (
                  <div key={step.id} className="flex items-center p-3 bg-gray-900 rounded-lg">
                    <div className="mr-3">
                      {getStepStatusIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <span className={step.status === 'completed' ? 'line-through text-gray-500' : 'text-white'}>
                        {step.title}
                      </span>
                    </div>
                    {step.status === 'pending' && (
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline">Mark as Resolved</Button>
                <Button variant="secondary">Escalate</Button>
              </div>
            </div>
          )}
        </div>

        {/* Team Contacts */}
        <div>
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Emergency Contacts</h3>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-gray-700 p-2 rounded-lg mr-3">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{member.name}</h4>
                      <p className="text-sm text-gray-400">{member.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {member.phone}
                      </span>
                      <button 
                        onClick={() => handleCopyContact(member.phone)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400 flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {member.email}
                      </span>
                      <button 
                        onClick={() => handleCopyContact(member.email)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incident History */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Recent Incidents</h3>
            <div className="space-y-3">
              {incidentLog.slice(0, 5).map((incident) => (
                <div key={incident.id} className="p-3 bg-gray-900 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-white text-sm">{incident.title}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(incident.startTime).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      incident.status === 'active' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-xs text-gray-400 capitalize">{incident.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(IncidentPlaybook);
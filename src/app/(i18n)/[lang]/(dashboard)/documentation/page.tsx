// src/app/(i18n)/[lang]/(dashboard)/documentation/page.tsx
// Customer Documentation Portal

"use client";

import React, { useState } from 'react';
import { withAuth } from '@/components/hoc/withAuth';
import { Button } from '@/components/ui/Button';
import { 
  BookOpen, 
  FileText, 
  Download, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

const DocumentationPortal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents = [
    {
      id: 'onboarding-guide',
      title: 'Customer Onboarding Guide',
      category: 'getting-started',
      description: 'Complete guide to setting up and configuring your ColombiaTIC account',
      lastUpdated: '2025-11-20',
      version: '2.1.0',
      type: 'PDF'
    },
    {
      id: 'api-documentation',
      title: 'API Documentation',
      category: 'developers',
      description: 'Comprehensive guide to integrating with ColombiaTIC APIs',
      lastUpdated: '2025-11-15',
      version: '1.5.2',
      type: 'HTML'
    },
    {
      id: 'user-manual',
      title: 'User Manual',
      category: 'users',
      description: 'Detailed instructions for using all platform features',
      lastUpdated: '2025-11-10',
      version: '3.0.1',
      type: 'PDF'
    },
    {
      id: 'security-policy',
      title: 'Security Policy',
      category: 'legal',
      description: 'Our commitment to data protection and security practices',
      lastUpdated: '2025-11-05',
      version: '1.2.0',
      type: 'PDF'
    },
    {
      id: 'terms-of-service',
      title: 'Terms of Service',
      category: 'legal',
      description: 'Legal agreement between ColombiaTIC and customers',
      lastUpdated: '2025-11-01',
      version: '2.3.1',
      type: 'PDF'
    },
    {
      id: 'integration-guide',
      title: 'Third-Party Integration Guide',
      category: 'developers',
      description: 'Instructions for connecting external services to ColombiaTIC',
      lastUpdated: '2025-10-28',
      version: '1.1.0',
      type: 'HTML'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'users', name: 'User Guides' },
    { id: 'developers', name: 'Developer Resources' },
    { id: 'legal', name: 'Legal Agreements' }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (docId: string) => {
    // Simulate document download
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      alert(`Downloading ${doc.title} (${doc.type})`);
    }
  };

  const handleViewOnline = (docId: string) => {
    // Simulate online viewing
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      alert(`Opening ${doc.title} in browser`);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BookOpen className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-white">Documentation Portal</h1>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Search
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-500 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                {doc.type}
              </span>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{doc.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{doc.description}</p>
            <div className="flex justify-between text-xs text-gray-500 mb-4">
              <span>Version {doc.version}</span>
              <span>Updated {doc.lastUpdated}</span>
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => handleViewOnline(doc.id)}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => handleDownload(doc.id)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Documentation Stats */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Documentation Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-gray-400 text-sm">Total Documents</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">18</div>
            <div className="text-gray-400 text-sm">Up to Date</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">4</div>
            <div className="text-gray-400 text-sm">Needs Review</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">98%</div>
            <div className="text-gray-400 text-sm">Coverage</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(DocumentationPortal);
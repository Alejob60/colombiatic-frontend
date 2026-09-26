// src/app/dashboard/web-builder/editor/Toolbar.tsx
"use client";

import { useTranslations } from '@/lib/i18n';
import { 
  Undo, 
  Redo, 
  Save, 
  Eye, 
  Monitor, 
  Smartphone, 
  Tablet,
  Settings,
  Download,
  Upload
} from 'lucide-react';

export default function EditorToolbar() {
  const { t } = useTranslations();

  return (
    <div className="bg-surface border-b border-gray-700 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700">
          <Undo className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700">
          <Redo className="h-5 w-5" />
        </button>
        <div className="w-px h-6 bg-gray-700 mx-2"></div>
        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700">
          <Save className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700">
          <Eye className="h-5 w-5" />
        </button>
        <div className="flex items-center bg-gray-800 rounded-lg p-1">
          <button className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-700">
            <Monitor className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-700">
            <Tablet className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-700">
            <Smartphone className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700">
          <Upload className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700">
          <Download className="h-5 w-5" />
        </button>
        <div className="w-px h-6 bg-gray-700 mx-2"></div>
        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
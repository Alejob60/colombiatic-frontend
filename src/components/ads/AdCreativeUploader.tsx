// src/components/ads/AdCreativeUploader.tsx
// Ad Creative Uploader Component

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Upload, 
  Image, 
  FileText, 
  X,
  CheckCircle
} from 'lucide-react';

interface Creative {
  id: string;
  name: string;
  type: 'image' | 'text';
  content: string;
  size?: string;
  url?: string;
}

interface AdCreativeUploaderProps {
  onCreativesChange: (creatives: Creative[]) => void;
  existingCreatives?: Creative[];
}

const AdCreativeUploader: React.FC<AdCreativeUploaderProps> = ({ 
  onCreativesChange,
  existingCreatives = []
}) => {
  const [creatives, setCreatives] = useState<Creative[]>(existingCreatives);
  const [activeTab, setActiveTab] = useState<'image' | 'text'>('image');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [textContent, setTextContent] = useState('');
  const [creativeName, setCreativeName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCreative = () => {
    if (activeTab === 'image' && imagePreview) {
      const newCreative: Creative = {
        id: Date.now().toString(),
        name: creativeName || `Image Creative ${creatives.length + 1}`,
        type: 'image',
        content: imagePreview,
        size: '300x250',
        url: imagePreview
      };
      
      const updatedCreatives = [...creatives, newCreative];
      setCreatives(updatedCreatives);
      onCreativesChange(updatedCreatives);
      
      // Reset form
      setImagePreview(null);
      setCreativeName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else if (activeTab === 'text' && textContent.trim()) {
      const newCreative: Creative = {
        id: Date.now().toString(),
        name: creativeName || `Text Creative ${creatives.length + 1}`,
        type: 'text',
        content: textContent
      };
      
      const updatedCreatives = [...creatives, newCreative];
      setCreatives(updatedCreatives);
      onCreativesChange(updatedCreatives);
      
      // Reset form
      setTextContent('');
      setCreativeName('');
    }
  };

  const handleRemoveCreative = (id: string) => {
    const updatedCreatives = creatives.filter(creative => creative.id !== id);
    setCreatives(updatedCreatives);
    onCreativesChange(updatedCreatives);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-4">Ad Creatives</h3>
      
      {/* Tabs for Image/Text */}
      <div className="border-b border-gray-700 mb-6">
        <div className="flex">
          <button
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              activeTab === 'image'
                ? 'text-white border-b-2 border-primary'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('image')}
          >
            <Image className="h-4 w-4 mr-2" />
            Image
          </button>
          <button
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              activeTab === 'text'
                ? 'text-white border-b-2 border-primary'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('text')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Text
          </button>
        </div>
      </div>

      {/* Creative Creation Form */}
      <div className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Creative Name
            </label>
            <Input
              value={creativeName}
              onChange={(e) => setCreativeName(e.target.value)}
              placeholder="Enter creative name"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {activeTab === 'image' ? (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Upload Image
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500"
                >
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-xs text-gray-400 mt-1">Upload</span>
                    </div>
                  )}
                </label>
                {imagePreview && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setImagePreview(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Text Content
              </label>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter your ad text content..."
                rows={4}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          <Button
            onClick={handleAddCreative}
            disabled={
              (activeTab === 'image' && !imagePreview) || 
              (activeTab === 'text' && !textContent.trim())
            }
          >
            <Upload className="h-4 w-4 mr-2" />
            Add Creative
          </Button>
        </div>
      </div>

      {/* Existing Creatives */}
      {creatives.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-white mb-3">Your Creatives</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creatives.map((creative) => (
              <div key={creative.id} className="bg-gray-700 rounded-lg p-3 relative">
                <button
                  onClick={() => handleRemoveCreative(creative.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </button>
                
                <div className="flex items-center mb-2">
                  {creative.type === 'image' ? (
                    <Image className="h-4 w-4 text-blue-400 mr-2" />
                  ) : (
                    <FileText className="h-4 w-4 text-green-400 mr-2" />
                  )}
                  <span className="text-sm font-medium text-white truncate">
                    {creative.name}
                  </span>
                </div>
                
                {creative.type === 'image' ? (
                  <div className="aspect-video bg-gray-600 rounded flex items-center justify-center">
                    {creative.url ? (
                      <img 
                        src={creative.url} 
                        alt={creative.name} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Image className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-600 rounded p-3 h-24 overflow-hidden">
                    <p className="text-xs text-gray-300 line-clamp-4">
                      {creative.content}
                    </p>
                  </div>
                )}
                
                <div className="mt-2 flex items-center text-xs text-gray-400">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Ready to use
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdCreativeUploader;
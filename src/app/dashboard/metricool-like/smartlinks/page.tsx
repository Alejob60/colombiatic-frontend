'use client';

import { useTranslations } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  LinkIcon, 
  PlusIcon,
  CopyIcon,
  BarChartIcon,
  EditIcon,
  TrashIcon,
  FilterIcon,
  SearchIcon
} from 'lucide-react';
import { useState } from 'react';

export default function SmartLinksPage() {
  const { t } = useTranslations();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [links, setLinks] = useState([
    {
      id: '1',
      title: 'Producto destacado - Campaña Enero',
      originalUrl: 'https://colombiatic.com.co/products/premium-package',
      smartUrl: 'https://clbt.ic/abc123',
      clicks: 1242,
      conversions: 42,
      conversionRate: '3.38%',
      createdAt: '2026-01-01',
      utmParams: {
        source: 'email',
        medium: 'newsletter',
        campaign: 'enero-promo'
      }
    },
    {
      id: '2',
      title: 'Webinar Marketing Digital',
      originalUrl: 'https://colombiatic.com.co/webinars/marketing-2026',
      smartUrl: 'https://clbt.ic/def456',
      clicks: 856,
      conversions: 28,
      conversionRate: '3.27%',
      createdAt: '2026-01-03',
      utmParams: {
        source: 'social',
        medium: 'facebook',
        campaign: 'webinar-ene26'
      }
    },
    {
      id: '3',
      title: 'Descarga Ebook SEO',
      originalUrl: 'https://colombiatic.com.co/resources/seo-guide.pdf',
      smartUrl: 'https://clbt.ic/ghi789',
      clicks: 2103,
      conversions: 156,
      conversionRate: '7.42%',
      createdAt: '2026-01-05',
      utmParams: {
        source: 'blog',
        medium: 'content',
        campaign: 'seo-ebook'
      }
    }
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newLink, setNewLink] = useState({
    title: '',
    originalUrl: '',
    customSlug: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: ''
  });

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateLink = () => {
    if (!newLink.title || !newLink.originalUrl) return;
    
    // Generar slug aleatorio si no se proporciona uno personalizado
    const slug = newLink.customSlug || Math.random().toString(36).substring(2, 8);
    
    const smartUrl = `https://clbt.ic/${slug}`;
    
    const newLinkObj = {
      id: (links.length + 1).toString(),
      title: newLink.title,
      originalUrl: newLink.originalUrl,
      smartUrl,
      clicks: 0,
      conversions: 0,
      conversionRate: '0%',
      createdAt: new Date().toISOString().split('T')[0],
      utmParams: {
        source: newLink.utmSource,
        medium: newLink.utmMedium,
        campaign: newLink.utmCampaign
      }
    };
    
    setLinks(prev => [...prev, newLinkObj]);
    setNewLink({
      title: '',
      originalUrl: '',
      customSlug: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: ''
    });
    setShowCreateForm(false);
  };

  const handleEdit = (id: string) => {
    console.log(`Editar link ${id}`);
  };

  const handleDelete = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  const handleViewAnalytics = (id: string) => {
    console.log(`Ver analíticas del link ${id}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setNewLink(prev => ({ ...prev, [field]: value }));
  };

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    if (showCreateForm) {
      setNewLink({
        title: '',
        originalUrl: '',
        customSlug: '',
        utmSource: '',
        utmMedium: '',
        utmCampaign: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('metricoolLike.smartlinks.title')}</h1>
          <p className="text-muted-foreground">{t('metricoolLike.smartlinks.description')}</p>
        </div>
        <Button onClick={toggleCreateForm} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          {showCreateForm ? t('metricoolLike.smartlinks.cancel') : t('metricoolLike.smartlinks.createLink')}
        </Button>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder={t('metricoolLike.smartlinks.searchLinks')}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <FilterIcon className="h-4 w-4" />
          {t('metricoolLike.smartlinks.filter')}
        </Button>
      </div>

      {/* Lista de links */}
      <div className="space-y-4">
        {links.map((link) => (
          <Card key={link.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">{t('metricoolLike.smartlinks.original')}:</span>
                      <a 
                        href={link.originalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-1 text-primary hover:underline"
                      >
                        {link.originalUrl}
                      </a>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">{t('metricoolLike.smartlinks.smart')}:</span>
                      <div className="flex items-center gap-2 ml-1">
                        <a 
                          href={link.smartUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {link.smartUrl}
                        </a>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCopy(link.smartUrl, link.id)}
                        >
                          <CopyIcon className="h-4 w-4" />
                          {copiedId === link.id ? t('metricoolLike.smartlinks.copied') : ''}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewAnalytics(link.id)} className="gap-2">
                    <BarChartIcon className="h-4 w-4" />
                    {t('metricoolLike.smartlinks.analytics')}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(link.id)}>
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(link.id)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('metricoolLike.smartlinks.clicks')}</p>
                  <p className="text-xl font-bold">{link.clicks.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('metricoolLike.smartlinks.conversions')}</p>
                  <p className="text-xl font-bold">{link.conversions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('metricoolLike.smartlinks.conversionRate')}</p>
                  <p className="text-xl font-bold">{link.conversionRate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('metricoolLike.smartlinks.created')}</p>
                  <p className="text-xl font-bold">{link.createdAt}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Formulario para crear nuevo link */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t('metricoolLike.smartlinks.createTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('metricoolLike.smartlinks.linkTitle')}
                </label>
                <input
                  type="text"
                  value={newLink.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder={t('metricoolLike.smartlinks.titlePlaceholder')}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('metricoolLike.smartlinks.destinationUrl')}
                </label>
                <input
                  type="url"
                  value={newLink.originalUrl}
                  onChange={(e) => handleInputChange('originalUrl', e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('metricoolLike.smartlinks.customSlug')}
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-muted bg-muted">
                    clbt.ic/
                  </span>
                  <input
                    type="text"
                    value={newLink.customSlug}
                    onChange={(e) => handleInputChange('customSlug', e.target.value)}
                    placeholder="mi-link-personalizado"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Parámetros UTM */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('metricoolLike.smartlinks.utmSource')}
                </label>
                <input
                  type="text"
                  value={newLink.utmSource}
                  onChange={(e) => handleInputChange('utmSource', e.target.value)}
                  placeholder="google, newsletter, facebook"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('metricoolLike.smartlinks.utmMedium')}
                </label>
                <input
                  type="text"
                  value={newLink.utmMedium}
                  onChange={(e) => handleInputChange('utmMedium', e.target.value)}
                  placeholder="cpc, banner, email"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('metricoolLike.smartlinks.utmCampaign')}
                </label>
                <input
                  type="text"
                  value={newLink.utmCampaign}
                  onChange={(e) => handleInputChange('utmCampaign', e.target.value)}
                  placeholder="nombre-de-campaña"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2 flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={toggleCreateForm}>
                  {t('metricoolLike.smartlinks.cancel')}
                </Button>
                <Button onClick={handleCreateLink} disabled={!newLink.title || !newLink.originalUrl}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  {t('metricoolLike.smartlinks.generateLink')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
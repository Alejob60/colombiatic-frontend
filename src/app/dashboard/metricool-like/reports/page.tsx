'use client';

import { useTranslations } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  FileTextIcon, 
  DownloadIcon,
  CalendarIcon,
  FilterIcon,
  PlayIcon,
  ClockIcon
} from 'lucide-react';
import { useState } from 'react';

export default function ReportsPage() {
  const { t } = useTranslations();
  const [autoReportsEnabled, setAutoReportsEnabled] = useState(true);
  
  // Reportes de ejemplo
  const reports = [
    {
      id: '1',
      title: t('metricoolLike.reports.weeklySummary'),
      period: '01-07 Ene 2026',
      status: 'generated',
      createdAt: '2026-01-08',
      format: 'PDF'
    },
    {
      id: '2',
      title: t('metricoolLike.reports.monthlyPerformance'),
      period: 'Diciembre 2025',
      status: 'generated',
      createdAt: '2026-01-01',
      format: 'PDF'
    },
    {
      id: '3',
      title: t('metricoolLike.reports.quarterlyAnalysis'),
      period: 'Oct-Dic 2025',
      status: 'generated',
      createdAt: '2025-12-31',
      format: 'PDF'
    }
  ];

  const scheduledReports = [
    {
      id: '1',
      title: t('metricoolLike.reports.weeklyReport'),
      frequency: t('metricoolLike.reports.everyMonday'),
      nextRun: '2026-01-12',
      recipients: ['admin@empresa.com', 'marketing@empresa.com']
    },
    {
      id: '2',
      title: t('metricoolLike.reports.monthlyReport'),
      frequency: t('metricoolLike.reports.firstDayOfMonth'),
      nextRun: '2026-02-01',
      recipients: ['admin@empresa.com', 'ceo@empresa.com']
    }
  ];

  const handleGenerateReport = () => {
    console.log('Generar nuevo reporte');
  };

  const handleDownload = (id: string) => {
    console.log(`Descargar reporte ${id}`);
  };

  const handleScheduleReport = () => {
    console.log('Programar nuevo reporte');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('metricoolLike.reports.title')}</h1>
          <p className="text-muted-foreground">{t('metricoolLike.reports.description')}</p>
        </div>
        <Button onClick={handleGenerateReport} className="gap-2">
          <FileTextIcon className="h-4 w-4" />
          {t('metricoolLike.reports.generateReport')}
        </Button>
      </div>

      {/* Configuración de reportes automáticos */}
      <Card>
        <CardHeader>
          <CardTitle>{t('metricoolLike.reports.autoReports')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('metricoolLike.reports.enableAutoReports')}</p>
              <p className="text-sm text-muted-foreground">
                {t('metricoolLike.reports.autoReportsDescription')}
              </p>
            </div>
            <Button 
              variant={autoReportsEnabled ? "default" : "outline"}
              onClick={() => setAutoReportsEnabled(!autoReportsEnabled)}
            >
              {autoReportsEnabled ? t('metricoolLike.reports.enabled') : t('metricoolLike.reports.disabled')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reportes generados */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('metricoolLike.reports.generatedReports')}</h2>
          <Button variant="outline" className="gap-2">
            <FilterIcon className="h-4 w-4" />
            {t('metricoolLike.reports.filter')}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    {t('metricoolLike.reports.status.generated')}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{report.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{report.format}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{report.createdAt}</span>
                  </div>
                  <Button 
                    onClick={() => handleDownload(report.id)} 
                    className="w-full mt-4 gap-2"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    {t('metricoolLike.reports.download')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Reportes programados */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('metricoolLike.reports.scheduledReports')}</h2>
          <Button onClick={handleScheduleReport} className="gap-2">
            <PlayIcon className="h-4 w-4" />
            {t('metricoolLike.reports.scheduleReport')}
          </Button>
        </div>
        
        <div className="space-y-4">
          {scheduledReports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <CardTitle>{report.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('metricoolLike.reports.frequency')}</p>
                    <p>{report.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('metricoolLike.reports.nextRun')}</p>
                    <p>{report.nextRun}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('metricoolLike.reports.recipients')}</p>
                    <div className="flex flex-wrap gap-1">
                      {report.recipients.map((recipient, index) => (
                        <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                          {recipient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    {t('metricoolLike.reports.edit')}
                  </Button>
                  <Button variant="outline" size="sm">
                    {t('metricoolLike.reports.pause')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Formulario para generar reporte personalizado */}
      <Card>
        <CardHeader>
          <CardTitle>{t('metricoolLike.reports.customReport')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('metricoolLike.reports.reportType')}
              </label>
              <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>{t('metricoolLike.reports.selectType')}</option>
                <option>{t('metricoolLike.reports.performanceReport')}</option>
                <option>{t('metricoolLike.reports.engagementReport')}</option>
                <option>{t('metricoolLike.reports.audienceReport')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('metricoolLike.reports.dateRange')}
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <input
                  type="date"
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('metricoolLike.reports.format')}
              </label>
              <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <FileTextIcon className="h-4 w-4 mr-2" />
                {t('metricoolLike.reports.generate')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
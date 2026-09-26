// src/services/observability/metricsService.ts
// Observability service for collecting and reporting application metrics

export interface Metric {
  name: string;
  value: number;
  timestamp: string;
  labels?: Record<string, string>;
}

export interface HistogramMetric {
  name: string;
  values: number[];
  timestamp: string;
  labels?: Record<string, string>;
}

export interface CounterMetric {
  name: string;
  count: number;
  timestamp: string;
  labels?: Record<string, string>;
}

class MetricsService {
  private metrics: Metric[] = [];
  private counters: Record<string, CounterMetric> = {};
  private histograms: Record<string, HistogramMetric> = {};
  private isEnabled: boolean = true;

  // Enable/disable metrics collection
  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  // Record a gauge metric
  public recordGauge(name: string, value: number, labels?: Record<string, string>): void {
    if (!this.isEnabled) return;
    
    const metric: Metric = {
      name,
      value,
      timestamp: new Date().toISOString(),
      labels
    };
    
    this.metrics.push(metric);
    
    // Keep only the last 1000 metrics to prevent memory issues
    if (this.metrics.length > 1000) {
      this.metrics.shift();
    }
  }

  // Increment a counter metric
  public incrementCounter(name: string, labels?: Record<string, string>): void {
    if (!this.isEnabled) return;
    
    const key = this.getMetricKey(name, labels);
    
    if (!this.counters[key]) {
      this.counters[key] = {
        name,
        count: 0,
        timestamp: new Date().toISOString(),
        labels
      };
    }
    
    this.counters[key].count++;
    this.counters[key].timestamp = new Date().toISOString();
  }

  // Record a histogram value
  public recordHistogram(name: string, value: number, labels?: Record<string, string>): void {
    if (!this.isEnabled) return;
    
    const key = this.getMetricKey(name, labels);
    
    if (!this.histograms[key]) {
      this.histograms[key] = {
        name,
        values: [],
        timestamp: new Date().toISOString(),
        labels
      };
    }
    
    this.histograms[key].values.push(value);
    this.histograms[key].timestamp = new Date().toISOString();
    
    // Keep only the last 1000 values to prevent memory issues
    if (this.histograms[key].values.length > 1000) {
      this.histograms[key].values.shift();
    }
  }

  // Record HTTP request metrics
  public recordHttpRequest(
    method: string, 
    path: string, 
    statusCode: number, 
    duration: number
  ): void {
    if (!this.isEnabled) return;
    
    const labels = { method, path, status: statusCode.toString() };
    
    this.incrementCounter('http_requests_total', labels);
    this.recordHistogram('http_request_duration_ms', duration, labels);
    
    // Record response size if available
    // this.recordHistogram('http_response_size_bytes', responseSize, labels);
  }

  // Record user action metrics
  public recordUserAction(action: string, userId?: string): void {
    if (!this.isEnabled) return;
    
    const labels: Record<string, string> = { action };
    if (userId) {
      labels.user_id = userId;
    }
    
    this.incrementCounter('user_actions_total', labels);
  }

  // Record error metrics
  public recordError(errorType: string, errorMessage: string, stackTrace?: string): void {
    if (!this.isEnabled) return;
    
    const labels = { type: errorType };
    
    this.incrementCounter('errors_total', labels);
    
    // Store error details for debugging (in a real implementation, this would go to a logging service)
    console.error(`Error recorded: ${errorType} - ${errorMessage}`, stackTrace);
  }

  // Get current metrics
  public getMetrics(): {
    gauges: Metric[];
    counters: CounterMetric[];
    histograms: HistogramMetric[];
  } {
    return {
      gauges: [...this.metrics],
      counters: Object.values(this.counters),
      histograms: Object.values(this.histograms)
    };
  }

  // Get counter value
  public getCounterValue(name: string, labels?: Record<string, string>): number {
    const key = this.getMetricKey(name, labels);
    return this.counters[key]?.count || 0;
  }

  // Get histogram statistics
  public getHistogramStats(name: string, labels?: Record<string, string>): {
    count: number;
    sum: number;
    average: number;
    min: number;
    max: number;
    p50: number;
    p90: number;
    p95: number;
    p99: number;
  } | null {
    const key = this.getMetricKey(name, labels);
    const histogram = this.histograms[key];
    
    if (!histogram || histogram.values.length === 0) {
      return null;
    }
    
    const sortedValues = [...histogram.values].sort((a, b) => a - b);
    const count = sortedValues.length;
    const sum = sortedValues.reduce((acc, val) => acc + val, 0);
    const average = sum / count;
    const min = sortedValues[0];
    const max = sortedValues[count - 1];
    
    // Calculate percentiles
    const p50 = this.percentile(sortedValues, 50);
    const p90 = this.percentile(sortedValues, 90);
    const p95 = this.percentile(sortedValues, 95);
    const p99 = this.percentile(sortedValues, 99);
    
    return {
      count,
      sum,
      average,
      min,
      max,
      p50,
      p90,
      p95,
      p99
    };
  }

  // Calculate percentile
  private percentile(values: number[], percentile: number): number {
    const index = (percentile / 100) * (values.length - 1);
    const lower = Math.floor(index);
    const upper = lower + 1;
    const weight = index % 1;
    
    if (upper >= values.length) {
      return values[lower];
    }
    
    return values[lower] * (1 - weight) + values[upper] * weight;
  }

  // Generate a unique key for metrics with labels
  private getMetricKey(name: string, labels?: Record<string, string>): string {
    if (!labels) return name;
    
    const labelStrings = Object.entries(labels)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}="${value}"`);
    
    return `${name}{${labelStrings.join(',')}}`;
  }

  // Clear all metrics (for testing)
  public clearMetrics(): void {
    this.metrics = [];
    this.counters = {};
    this.histograms = {};
  }

  // Export metrics in Prometheus format
  public exportPrometheus(): string {
    let output = '';
    
    // Export counters
    Object.values(this.counters).forEach(counter => {
      const labels = counter.labels 
        ? `{${Object.entries(counter.labels).map(([k, v]) => `${k}="${v}"`).join(',')}}` 
        : '';
      output += `# TYPE ${counter.name} counter\n`;
      output += `${counter.name}${labels} ${counter.count}\n\n`;
    });
    
    // Export histograms
    Object.values(this.histograms).forEach(histogram => {
      const stats = this.getHistogramStats(histogram.name, histogram.labels);
      if (stats) {
        const labels = histogram.labels 
          ? `{${Object.entries(histogram.labels).map(([k, v]) => `${k}="${v}"`).join(',')}}` 
          : '';
        output += `# TYPE ${histogram.name} summary\n`;
        output += `${histogram.name}_count${labels} ${stats.count}\n`;
        output += `${histogram.name}_sum${labels} ${stats.sum}\n`;
        output += `${histogram.name}{quantile="0.5"}${labels} ${stats.p50}\n`;
        output += `${histogram.name}{quantile="0.9"}${labels} ${stats.p90}\n`;
        output += `${histogram.name}{quantile="0.95"}${labels} ${stats.p95}\n`;
        output += `${histogram.name}{quantile="0.99"}${labels} ${stats.p99}\n\n`;
      }
    });
    
    return output;
  }
}

// Create singleton instance
export const metricsService = new MetricsService();

// Initialize some default metrics
if (typeof window !== 'undefined') {
  // Record page load time
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    metricsService.recordHistogram('page_load_time_ms', loadTime);
  });
  
  // Record navigation metrics
  if ('navigation' in performance) {
    try {
      // @ts-ignore
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        // @ts-ignore
        const navEntry = navEntries[0];
        // @ts-ignore
        if (navEntry.domComplete) {
          // @ts-ignore
          metricsService.recordHistogram('dom_complete_time_ms', navEntry.domComplete);
        }
        // @ts-ignore
        if (navEntry.loadEventEnd && navEntry.loadEventStart) {
          // @ts-ignore
          metricsService.recordHistogram('load_event_time_ms', navEntry.loadEventEnd - navEntry.loadEventStart);
        }
      }
    } catch (error) {
      console.warn('Could not collect navigation metrics:', error);
    }
  }
}
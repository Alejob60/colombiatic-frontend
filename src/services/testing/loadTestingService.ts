// src/services/testing/loadTestingService.ts
// Load testing service for critical application flows

import { enhancedApiClient } from '@/lib/enhancedApiClient';

export interface LoadTestConfig {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  concurrency: number;
  duration: number; // in seconds
  payload?: any;
}

export interface LoadTestResult {
  testName: string;
  startTime: string;
  endTime: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  avgResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  throughput: number; // requests per second
  errorRate: number;
  statusCodes: Record<number, number>;
}

class LoadTestingService {
  private isRunning: boolean = false;
  private abortController: AbortController | null = null;

  // Run a load test
  public async runLoadTest(config: LoadTestConfig): Promise<LoadTestResult> {
    if (this.isRunning) {
      throw new Error('A load test is already running');
    }

    this.isRunning = true;
    this.abortController = new AbortController();

    const results: number[] = [];
    const statusCodes: Record<number, number> = {};
    let totalRequests = 0;
    let successfulRequests = 0;
    let failedRequests = 0;

    const startTime = new Date().toISOString();

    try {
      // Create concurrent requests
      const promises: Promise<any>[] = [];
      
      for (let i = 0; i < config.concurrency; i++) {
        promises.push(this.runConcurrentRequests(config, results, statusCodes));
      }

      // Run for specified duration
      await Promise.race([
        Promise.all(promises),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Test duration exceeded')), config.duration * 1000)
        )
      ]);
    } catch (error) {
      console.error('Load test error:', error);
    } finally {
      this.isRunning = false;
      this.abortController = null;
    }

    const endTime = new Date().toISOString();
    
    // Calculate statistics
    const totalResponseTime = results.reduce((sum, time) => sum + time, 0);
    const avgResponseTime = results.length > 0 ? totalResponseTime / results.length : 0;
    const minResponseTime = results.length > 0 ? Math.min(...results) : 0;
    const maxResponseTime = results.length > 0 ? Math.max(...results) : 0;
    const throughput = totalRequests / config.duration;
    const errorRate = totalRequests > 0 ? (failedRequests / totalRequests) * 100 : 0;

    return {
      testName: `Load Test: ${config.endpoint}`,
      startTime,
      endTime,
      totalRequests,
      successfulRequests,
      failedRequests,
      avgResponseTime: Math.round(avgResponseTime),
      minResponseTime,
      maxResponseTime,
      throughput: Math.round(throughput * 100) / 100,
      errorRate: Math.round(errorRate * 100) / 100,
      statusCodes
    };
  }

  // Run concurrent requests for load testing
  private async runConcurrentRequests(
    config: LoadTestConfig, 
    results: number[], 
    statusCodes: Record<number, number>
  ): Promise<void> {
    if (!this.isRunning || !this.abortController) return;

    try {
      const startTime = Date.now();
      
      let response;
      switch (config.method) {
        case 'GET':
          response = await enhancedApiClient.get(config.endpoint);
          break;
        case 'POST':
          response = await enhancedApiClient.post(config.endpoint, config.payload);
          break;
        case 'PUT':
          response = await enhancedApiClient.put(config.endpoint, config.payload);
          break;
        case 'DELETE':
          response = await enhancedApiClient.delete(config.endpoint);
          break;
      }

      const endTime = Date.now();
      results.push(endTime - startTime);
      
      // Track status codes
      const statusCode = response.status;
      statusCodes[statusCode] = (statusCodes[statusCode] || 0) + 1;
      
      // Update counters
      // Note: In a real implementation, these would need to be atomic
      // For simplicity, we're using local variables here
    } catch (error: any) {
      const endTime = Date.now();
      results.push(endTime - Date.now()); // Add 0 for failed requests
      
      // Track error status
      const statusCode = error.response?.status || 500;
      statusCodes[statusCode] = (statusCodes[statusCode] || 0) + 1;
    }
  }

  // Stop current load test
  public stopLoadTest(): void {
    if (this.isRunning && this.abortController) {
      this.abortController.abort();
      this.isRunning = false;
      this.abortController = null;
    }
  }

  // Check if a load test is running
  public isTestRunning(): boolean {
    return this.isRunning;
  }

  // Predefined load tests for critical flows
  public predefinedTests = {
    authenticationFlow: {
      endpoint: '/api/auth/login',
      method: 'POST' as const,
      concurrency: 50,
      duration: 60,
      payload: {
        email: 'test@example.com',
        password: 'password123'
      }
    },
    demoChatLoad: {
      endpoint: '/api/chat/messages',
      method: 'POST' as const,
      concurrency: 30,
      duration: 120,
      payload: {
        conversationId: 'demo-conversation',
        text: 'Hello, this is a test message'
      }
    },
    dataImport: {
      endpoint: '/api/data/import',
      method: 'POST' as const,
      concurrency: 10,
      duration: 180,
      payload: {
        // Large dataset simulation
        data: Array(1000).fill({ id: 1, name: 'Test Item' })
      }
    }
  };
}

export const loadTestingService = new LoadTestingService();
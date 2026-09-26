// src/services/api.ts
// API service for connecting to meta-agent backend

const API_BASE_URL = `${process.env.NEXT_PUBLIC_META_AGENT_URL}${process.env.NEXT_PUBLIC_API_BASE_PATH}`;

export interface ApiRequestOptions extends RequestInit {
  responseType?: 'json' | 'blob';
}

class ApiService {
  async makeRequest<T = any>(endpoint: string, options: RequestInit = {}, responseType: 'json' | 'blob' = 'json'): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`Making request to: ${url}`);
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      return (responseType === 'blob' ? await response.blob() : await response.json()) as T;
    } catch (error: any) {
      console.error('API request failed:', error);
      // Provide more specific error messages
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error(`Failed to connect to Meta-Agent service at ${url}. Please ensure the service is running on ${process.env.NEXT_PUBLIC_META_AGENT_URL}.`);
      }
      throw error;
    }
  }

  private async request<T = any>(method: string, endpoint: string, body?: unknown, options: ApiRequestOptions = {}): Promise<{ data: T }> {
    const { responseType = 'json', ...init } = options;
    const requestInit: RequestInit = { ...init, method };

    if (body !== undefined) {
      requestInit.body = JSON.stringify(body);
    }

    return { data: await this.makeRequest<T>(endpoint, requestInit, responseType) };
  }

  async get<T = any>(endpoint: string, options?: ApiRequestOptions): Promise<{ data: T }> {
    return this.request<T>('GET', endpoint, undefined, options);
  }

  async post<T = any>(endpoint: string, body?: unknown, options?: ApiRequestOptions): Promise<{ data: T }> {
    return this.request<T>('POST', endpoint, body, options);
  }

  async put<T = any>(endpoint: string, body?: unknown, options?: ApiRequestOptions): Promise<{ data: T }> {
    return this.request<T>('PUT', endpoint, body, options);
  }

  async patch<T = any>(endpoint: string, body?: unknown, options?: ApiRequestOptions): Promise<{ data: T }> {
    return this.request<T>('PATCH', endpoint, body, options);
  }

  async delete<T = any>(endpoint: string, options?: ApiRequestOptions): Promise<{ data: T }> {
    return this.request<T>('DELETE', endpoint, undefined, options);
  }

  // Example method to get agent status
  async getAgentStatus(agentName: string) {
    return this.makeRequest(`/v2/agents/${agentName}`, {
      method: 'GET'
    });
  }

  // Example method to execute an agent
  async executeAgent(agentName: string, payload: any) {
    // For front-desk agent, use the correct V2 endpoint
    if (agentName === 'front-desk') {
      return this.makeRequest(`/v2/agents/${agentName}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }
    
    // For other agents, use the original endpoint
    return this.makeRequest(`/agents/${agentName}/execute`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Method to execute an agent with tenant context
  async executeAgentWithTenant(agentName: string, payload: any, tenantId: string) {
    // For front-desk agent, use the correct V2 endpoint with tenant context
    if (agentName === 'front-desk') {
      return this.makeRequest(`/v2/agents/${agentName}`, {
        method: 'POST',
        headers: {
          'X-Tenant-ID': tenantId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          context: {
            ...payload.context,
            tenantId
          }
        }),
      });
    }
    
    // For other agents, use the original endpoint with tenant context
    return this.makeRequest(`/agents/${agentName}/execute`, {
      method: 'POST',
      headers: {
        'X-Tenant-ID': tenantId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        context: {
          ...payload.context,
          tenantId
        }
      }),
    });
  }
}

export default new ApiService();
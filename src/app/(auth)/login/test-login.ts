// Simple test script to verify login and token storage
// This can be run in the browser console for debugging

async function testLogin() {
  console.log('Testing login flow...');
  
  // Check if we're in a secure context
  console.log('Secure context:', typeof window !== 'undefined' ? window.location.protocol : 'unknown');
  console.log('Hostname:', typeof window !== 'undefined' ? window.location.hostname : 'unknown');
  
  // Try to store a test token
  try {
    const testToken = {
      accessToken: 'test_token_' + Date.now(),
      userId: 'test_user',
      expiresAt: Date.now() + 3600000 // 1 hour
    };
    
    console.log('Attempting to store test token...');
    localStorage.setItem('test_token_storage', JSON.stringify(testToken));
    console.log('Test token stored successfully');
    
    // Try to retrieve it
    const retrieved = localStorage.getItem('test_token_storage');
    console.log('Retrieved test token:', retrieved);
    
    // Clean up
    localStorage.removeItem('test_token_storage');
  } catch (error) {
    console.error('Error with localStorage test:', error);
  }
  
  // Check if our token manager is working
  try {
    const { storeTokens, getTokens } = await import('@/lib/tokenManager');
    
    console.log('Testing token manager...');
    const testTokens = {
      accessToken: 'test_access_token_' + Date.now(),
      refreshToken: 'test_refresh_token_' + Date.now(),
      userId: 'test_user',
      expiresAt: Date.now() + 3600000 // 1 hour
    };
    
    storeTokens(testTokens);
    console.log('Tokens stored via tokenManager');
    
    const retrievedTokens = getTokens();
    console.log('Tokens retrieved via tokenManager:', retrievedTokens);
  } catch (error) {
    console.error('Error with token manager test:', error);
  }
}

// Run the test
testLogin();
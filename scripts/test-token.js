const fetch = require('node-fetch');

const tokenUrl = 'https://api-uat.corelogic.com/oauth/token';
const clientId = 'HxpE8wc0OUvZL1zrWG7NmXjEExD2vx9t';
const clientSecret = 'FbT6Ac1UHvdpxcVD';

async function testToken() {
  try {
    // Basic Auth approach with api scope
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('scope', 'api');

    console.log('Making request to:', tokenUrl);
    console.log('Request details:', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic [HIDDEN]',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });

    const text = await response.text();
    console.log('Response Status:', response.status);
    console.log('Response Body:', text);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} body: ${text}`);
    }

    const data = JSON.parse(text);
    console.log('Success! Token:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testToken();

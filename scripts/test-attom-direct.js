const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const https = require('https');

async function testAttomAPI() {
  const address = "4920 Island View Street";
  const city = "Oxnard";
  const state = "CA";
  const zip = "93035";

  const formattedAddress = [address, city, state, zip].join(' ');
  const url = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address=${encodeURIComponent(formattedAddress)}`;

  try {
    console.log('ATTOM API Key:', process.env.ATTOM_API_KEY?.substring(0, 8) + '...');
    console.log('Testing address:', formattedAddress);
    
    const options = {
      method: 'GET',
      headers: {
        'apikey': process.env.ATTOM_API_KEY,
        'accept': 'application/json',
      },
    };

    const req = https.request(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          throw new Error(`ATTOM API error (${res.statusCode}): ${data}`);
        }
        console.log(JSON.stringify(JSON.parse(data), null, 2));
      });
    });

    req.on('error', (error) => {
      throw error;
    });

    req.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAttomAPI();

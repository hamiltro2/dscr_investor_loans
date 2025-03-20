import fetch from 'node-fetch';

const address = "4920 Island View Street Oxnard CA 93035";
const encodedAddress = encodeURIComponent(address);

async function testProperty() {
  try {
    const response = await fetch(`http://localhost:3000/api/attom/property?address=${encodedAddress}`);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testProperty();

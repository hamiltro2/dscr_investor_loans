const axios = require('axios');

const propertyData = {
  address: "4920 Island View Street",
  city: "Oxnard",
  state: "CA",
  zip: "93035"
};

async function testProperty() {
  try {
    const response = await axios.post('http://localhost:3000/api/attom/property', propertyData);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testProperty();

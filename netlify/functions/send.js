exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  let body;
  try { body = JSON.parse(event.body); } 
  catch(e) { return { statusCode: 400, body: 'Invalid JSON' }; }
  const { webhookUrl, payload } = body;
  if (!webhookUrl) return { statusCode: 400, body: 'Missing webhookUrl' };
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return { statusCode: 200, body: JSON.stringify({ ok: true, status: response.status }) };
  } catch(e) {
    return { statusCode: 500, body: 'Webhook forward failed: ' + e.message };
  }
};

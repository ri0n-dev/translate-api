import { translate } from 'npm:@vitalets/google-translate-api';
import { serve } from 'std/http/server.ts';

serve(async (req: Request) => {
  const url = new URL(req.url);
  const text = url.searchParams.get('text');
  const to = url.searchParams.get('to');

  if (!text || !to) {
    return new Response(JSON.stringify({ error: 'Missing text or to parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const result = await translate(text, { to });
    return new Response(JSON.stringify({ translated: result.text, to }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}, { port: 8000 });
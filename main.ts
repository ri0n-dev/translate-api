import { translate } from '@vitalets/google-translate-api';

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const text = url.searchParams.get('text');
  let to = url.searchParams.get('to');

  if (!text || !to) {
    return new Response(JSON.stringify({ error: 'Missing text or to parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (to === 'jp') to = 'ja';

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
});
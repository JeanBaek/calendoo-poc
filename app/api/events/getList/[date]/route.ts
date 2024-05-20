import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { auth, EnrichedSession } from 'auth';

export async function GET(request: Request) {
  const parts = request.url!.split('/');
  const getListIndex = parts.indexOf('getList');
  const date = parts[getListIndex + 1];

  if (!date) {
    return new Response(
      JSON.stringify({ success: false, error: 'Missing or invalid event ID' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const session = (await auth()) as EnrichedSession;

  if (!session) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const clientId = process.env.AUTH_GOOGLE_ID;
  const clientSecret = process.env.AUTH_GOOGLE_SECRET;
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;

  const oauth2Client = new OAuth2Client({
    clientId,
    clientSecret,
  });

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const calendar = google.calendar({
    version: 'v3',
    auth: oauth2Client,
  });

  const timeMin = new Date(date + 'T00:00:00+09:00').toISOString();
  const timeMax = new Date(date + 'T23:59:59+09:00').toISOString();

  try {
    const calendarRes = await calendar.events.list({
      calendarId: 'primary',
      timeMin: timeMin,
      timeMax: timeMax,
      maxResults: 20,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = calendarRes.data.items;

    if (!events?.length) console.log('No upcoming events found.');

    return new Response(JSON.stringify({ success: true, events }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error retrieving events:', err);

    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

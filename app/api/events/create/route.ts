import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { auth, EnrichedSession } from 'auth';

export async function POST(request: Request) {
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

  const body = await request.json();

  const event = {
    summary: body.title,
    location: 'Seoul',
    description: '',
    start: {
      date: body.startDate,
      timeZone: 'Asia/Seoul',
    },
    end: {
      date: body.endDate,
      timeZone: 'Asia/Seoul',
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };

  try {
    const response = await (calendar.events.insert as any)({
      calendarId: 'primary',
      requestBody: event,
    });

    return new Response(
      JSON.stringify({ success: true, htmlLink: response.data.htmlLink }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Error creating event:', err);

    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

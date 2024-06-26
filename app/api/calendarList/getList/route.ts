import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { auth, EnrichedSession } from 'auth';

export async function GET(request: Request) {
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

  try {
    const calendarRes = await calendar.calendarList.list({
      maxResults: 10,
    });

    const calendarList = calendarRes.data.items;

    if (!calendarList?.length) {
      console.log('No calendar list found.');
      return new Response(
        JSON.stringify({ success: false, message: 'No calendar list found.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, events: calendarList }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Error retrieving calendar list:', err);

    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

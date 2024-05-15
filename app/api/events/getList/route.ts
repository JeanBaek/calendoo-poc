import {google} from "googleapis";
import {OAuth2Client} from "google-auth-library"
import {auth, EnrichedSession} from "auth";

export async function GET(request: Request) {
    const session = (await auth()) as EnrichedSession;

    console.log('Session inside the route ', session);

    if (!session) {
        return new Response('Unauthorized', {
            status: 401,
        })
    }

    const clientId = process.env.AUTH_GOOGLE_ID;
    const clientSecret = process.env.AUTH_GOOGLE_SECRET;
    const accessToken = session?.accessToken;
    const refreshToken = session?.refreshToken;

    const oauth2Client = new OAuth2Client({
        clientId,
        clientSecret
    })

    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });

    const calendar = google.calendar({
        version: 'v3',
        auth: oauth2Client,
    })

    const calendarRes = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
    });

    const events = calendarRes.data.items;

    if (events?.length) {
        console.log('Upcoming 10 events: ', events);
    } else {
        console.log('No upcoming events found.');
    }

    return Response.json({events})
}
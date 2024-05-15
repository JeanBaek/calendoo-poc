import {google} from "googleapis";
import {OAuth2Client} from "google-auth-library"
import {auth, EnrichedSession} from "auth";

export async function GET(request: Request) {
    const session = (await auth()) as EnrichedSession;

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

    const calendarRes = await calendar.calendarList.list({
        maxResults: 10,
    });

    const calendarList = calendarRes.data.items;

    if (calendarList?.length) {
        console.log('10 Calendar list: ', calendarList);
    } else {
        console.log('No calendar list found.');
    }

    return Response.json({events: calendarList})
}
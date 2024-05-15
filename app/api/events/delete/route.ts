import {google} from "googleapis";
import {OAuth2Client} from "google-auth-library"
import {auth, EnrichedSession} from "auth";

export async function DELETE(request: Request) {
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

    const calendarRes = await calendar.events.delete({
        calendarId: 'primary',
        eventId: 'cvld1lh7o445bjh57d108qr0e0' // TODO: request 값으로 수정
    });

    console.log('DELETE event: ', calendarRes)

    return new Response(JSON.stringify({success: calendarRes.status === 204}), {
        status: 200, // TODO: 204로 수정. 이것만 204로 바꾸면 'Uncaught (in promise) SyntaxError: Unexpected end of JSON input at createCalendarEvent' 에러남
        headers: {'Content-Type': 'application/json'}
    });
}
import {google} from "googleapis";
import {OAuth2Client} from "google-auth-library"
import {auth, EnrichedSession} from "auth";

export async function POST(request: Request) {
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

    // TODO: request로 받아서 처리하기
    const event = {
        summary: 'Calendoo-poc로 만든 이벤트 - 삭제 테스트 예정',
        location: 'Seoul',
        description: '장하다 백은진!',
        start: {
            dateTime: '2024-05-15T09:00:00-07:00',
            timeZone: 'Asia/Seoul',
        },
        end: {
            dateTime: '2024-05-15T17:00:00-07:00',
            timeZone: 'Asia/Seoul',
        },
        reminders: {
            useDefault: false,
            overrides: [
                {method: 'email', minutes: 24 * 60},
                {method: 'popup', minutes: 10},
            ],
        },
    };

    try {
        const response = await (calendar.events.insert as any)({
            calendarId: 'primary',
            requestBody: event
            // resource: event,
        });
        console.log('Event created: %s', response, response.data);
        return new Response(JSON.stringify({success: true, htmlLink: response.data.htmlLink}), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (err) {
        console.error('Error creating event:', err);
        return new Response(JSON.stringify({success: false, error: err}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        });
    }
}
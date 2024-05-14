import {CalendarResource, DateDto, Etag, EventsResource} from "./calendarValueDto";

// calendarList
// export type CalendarListGetReq = {}
// export type CalendarListGetRes = {}
export type CalendarListGetListReq = {
    pathParams: {},
    queryParams: {
        maxResults?: number; // integer
        minAccessRole?: string;
        pageToken?: string;
        showDeleted?: boolean;
        showHidden?: boolean;
        syncToken?: string;
    }
}
export type CalendarListGetListRes = {
    "kind": "calendar#calendarList" | string;
    "etag": Etag;
    "nextPageToken": string;
    "nextSyncToken": string;
    "items": CalendarResource[];
}
// export type CalendarListInsertReq = {
//     params: {},
//     body: {
//         id: string
//     },
// }
// export type CalendarListInsertRes = {}
// export type CalendarListUpdateReq = {}
// export type CalendarListUpdateRes = {}
// export type CalendarListDeleteReq = {}
// export type CalendarListDeleteRes = {}

// events
export type EventGetReq = {
    pathParams: {
        calendarId: string;
        eventId: string;
    },
    queryParams: {
        alwaysIncludeEmail?: boolean;
        maxAttendees?: number; // integer
        timeZone?: string;
    },
}
export type EventGetRes = EventsResource;
export type EventGetListReq = {
    pathParams: {
        calendarId: string;
    },
    queryParams: {
        alwaysIncludeEmail?: boolean;
        eventTypes?: "default" | "focusTime" | "fromGmail" | "outOfOffice" | "workingLocation";
        iCalUID?: string;
        maxAttendees?: number; // integer;
        maxResults?: number; // integer;
        orderBy?: "startTime" | "updated";
        pageToken?: string;
        privateExtendedProperty?: string;
        q?: string;
        sharedExtendedProperty?: string;
        showDeleted?: boolean;
        showHiddenInvitations?: boolean;
        singleEvents?: boolean;
        syncToken?: string;
        timeMax?: Date; // datetime;
        timeMin?: Date; // datetime;
        timeZone?: string;
        updatedMin?: Date; // datetime;
    },
}
export type EventGetListRes = {
    "kind": "calendar#events";
    "etag": Etag;
    "summary": string;
    "description": string;
    "updated": Date; // datetime
    "timeZone": string;
    "accessRole": string;
    "defaultReminders": [
        {
            "method": string;
            "minutes": number; // integer
        }
    ];
    "nextPageToken": string;
    "nextSyncToken": string;
    "items": EventsResource[];
}
export type EventCreateReq = {
    pathParams: {
        calendarId: string;
    },
    queryParams: {
        conferenceDataVersion?: 0 | 1;
        maxAttendees?: number; // integer;
        sendNotifications?: boolean;
        sendUpdates?: "all" | "externalOnly" | "none";
        supportsAttachments?: boolean;
    },
    body: {
        end: DateDto;
        start: DateDto;
        // 이 외에도 수많은 optional properties 존재. 참고: https://developers.google.com/calendar/api/v3/reference/events/insert#request-body
    },
}
export type EventCreateRes = EventsResource;
export type EventUpdateReq = {
    pathParams: {
        calendarId: string;
        eventId: string;
    },
    queryParams: {
        alwaysIncludeEmail?: boolean;
        conferenceDataVersion?: 0 | 1;
        maxAttendees?: number; // integer
        sendNotifications?: boolean;
        sendUpdates?: "all" | "externalOnly" | "none";
        supportsAttachments?: boolean;
    },
    body: {
        end: DateDto;
        start: DateDto;
        // 이 외에도 수많은 optional properties 존재. 참고: https://developers.google.com/calendar/api/v3/reference/events/update#request-body
    },
}
export type EventUpdateRes = EventsResource;
export type EventDeleteReq = {
    pathParams: {
        calendarId: string;
        eventId: string;
    },
    queryParams: {
        sendUpdates?: "all" | "externalOnly" | "none";
    },
}


export type Etag = string
export type CalendarResource = {
    "kind": "calendar#calendarListEntry",
    "etag": Etag,
    "id": string,
    "summary": string,
    "description": string,
    "location": string,
    "timeZone": string,
    "summaryOverride": string,
    "colorId": string,
    "backgroundColor": string,
    "foregroundColor": string,
    "hidden": boolean,
    "selected": boolean,
    "accessRole": string,
    "defaultReminders": [
        {
            "method": string,
            "minutes": number // integer
        }
    ],
    "notificationSettings": {
        "notifications": [
            {
                "type": string,
                "method": string
            }
        ]
    },
    "primary": boolean,
    "deleted": boolean,
    "conferenceProperties": {
        "allowedConferenceSolutionTypes": [
            string
        ]
    }
}

export type EventsResource = {
    "kind": "calendar#event";
    "etag": Etag;
    "id": string;
    "status": string;
    "htmlLink": string;
    "created": Date // datetime;
    "updated": Date // datetime;
    "summary": string;
    "description": string;
    "location": string;
    "colorId": string;
    "creator": {
        "id": string;
        "email": string;
        "displayName": string;
        "self": boolean
    };
    "organizer": {
        "id": string;
        "email": string;
        "displayName": string;
        "self": boolean
    };
    "start": DateDto;
    "end": DateDto;
    "endTimeUnspecified": boolean;
    "recurrence": [
        string
    ];
    "recurringEventId": string;
    "originalStartTime": DateDto;
    "transparency": string;
    "visibility": string;
    "iCalUID": string;
    "sequence": number; // integer;
    "attendees": [
        {
            "id": string;
            "email": string;
            "displayName": string;
            "organizer": boolean;
            "self": boolean;
            "resource": boolean;
            "optional": boolean;
            "responseStatus": string;
            "comment": string;
            "additionalGuests": number; // integer;
        }
    ];
    "attendeesOmitted": boolean;
    "extendedProperties": {
        "private": {
            (key: string): string
        };
        "shared": {
            (key: string): string
        }
    };
    "hangoutLink": string;
    "conferenceData": {
        "createRequest": {
            "requestId": string;
            "conferenceSolutionKey": {
                "type": string
            };
            "status": {
                "statusCode": string
            }
        };
        "entryPoints": [
            {
                "entryPointType": string;
                "uri": string;
                "label": string;
                "pin": string;
                "accessCode": string;
                "meetingCode": string;
                "passcode": string;
                "password": string
            }
        ];
        "conferenceSolution": {
            "key": {
                "type": string
            };
            "name": string;
            "iconUri": string
        };
        "conferenceId": string;
        "signature": string;
        "notes": string;
    };
    "gadget": {
        "type": string;
        "title": string;
        "link": string;
        "iconLink": string;
        "width": number; // integer;
        "height": number; // integer;
        "display": string;
        "preferences": {
            (key: string): string
        }
    };
    "anyoneCanAddSelf": boolean;
    "guestsCanInviteOthers": boolean;
    "guestsCanModify": boolean;
    "guestsCanSeeOtherGuests": boolean;
    "privateCopy": boolean;
    "locked": boolean;
    "reminders": {
        "useDefault": boolean;
        "overrides": [
            {
                "method": string;
                "minutes": number; // integer;
            }
        ]
    };
    "source": {
        "url": string;
        "title": string
    };
    "workingLocationProperties": {
        "type": string;
        "homeOffice": any; // (value: any);
        "customLocation": {
            "label": string
        };
        "officeLocation": {
            "buildingId": string;
            "floorId": string;
            "floorSectionId": string;
            "deskId": string;
            "label": string
        }
    };
    "outOfOfficeProperties": {
        "autoDeclineMode": string;
        "declineMessage": string
    };
    "focusTimeProperties": {
        "autoDeclineMode": string;
        "declineMessage": string;
        "chatStatus": string
    };
    "attachments": [
        {
            "fileUrl": string;
            "title": string;
            "mimeType": string;
            "iconLink": string;
            "fileId": string
        }
    ];
    "eventType": string
}

export type DateDto = {
    "date": Date; // date;
    "dateTime": Date; // datetime;
    "timeZone": string
}
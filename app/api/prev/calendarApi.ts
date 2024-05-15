// import {
//     CalendarListGetListReq,
//     CalendarListGetListRes, EventCreateReq, EventCreateRes, EventDeleteReq,
//     EventGetListReq, EventGetListRes,
//     EventGetReq,
//     EventGetRes, EventUpdateReq, EventUpdateRes
// } from "./calendarReqResDto";
// import axios, {Axios, AxiosInstance} from "axios";
// import {replacePathParams} from "./helper";
//
// const GOOGLE_CALENDAR_API_BASE_URL = "https://www.googleapis.com/calendar/v3";
//
// let api: AxiosInstance | null = null;
//
// export function updateAxiosInstance(credential: string) {
//     const instance = axios.create({
//         baseURL: GOOGLE_CALENDAR_API_BASE_URL,
//     });
//
//     instance.defaults.headers.common['Authorization'] = `Basic ${credential}`;
//
//     api = instance
// }
//
// const apiUris = {
//     calendarList: {
//         // get: '/users/me/calendarList/{calendarId}', // GET. Returns a calendar from the user's calendar list.
//         getList: '/users/me/calendarList', // GET. Returns the calendars on the user's calendar list.
//         // insert: '/users/me/calendarList', // POST. Inserts an existing calendar into the user's calendar list.
//         // patch: '/users/me/calendarList/{calendarId}', // PATCH. Updates an existing calendar on the user's calendar list. This method supports patch semantics. Note that each patch request consumes three quota units; prefer using a get followed by an update. The field values you specify replace the existing values. Fields that you don't specify in the request remain unchanged. Array fields, if specified, overwrite the existing arrays; this discards any previous array elements.
//         // update: '/users/me/calendarList/{calendarId}', // PUT. Updates an existing calendar on the user's calendar list.
//         // delete: '/users/me/calendarList/{calendarId}', // DELETE. Removes a calendar from the user's calendar list.
//         // watch: '/users/me/calendarList/watch' // Watch for changes to CalendarList resources.
//     },
//     events: {
//         get: '/calendars/{calendarId}/events/{eventId}', // GET. Returns an event based on its Google Calendar ID. To retrieve an event using its iCalendar ID, call the events.list method using the iCalUID parameter.
//         getList: '/calendars/{calendarId}/events', // GET. Returns events on the specified calendar.
//         create: '/calendars/{calendarId}/events', // POST. Creates an event.
//         // easyCreate: '/calendars/{calendarId}/events/quickAdd', // POST. Creates an event based on a simple text string. Required query parameters: text.
//         // instances: '/calendars/{calendarId}/events/{eventId}/instances', // GET. Returns instances of the specified recurring event.
//         // patch: '/calendars/{calendarId}/events/{eventId}', // PATCH. Updates an event. This method supports patch semantics. Note that each patch request consumes three quota units; prefer using a get followed by an update. The field values you specify replace the existing values. Fields that you don't specify in the request remain unchanged. Array fields, if specified, overwrite the existing arrays; this discards any previous array elements.
//         update: '/calendars/{calendarId}/events/eventId', // PUT. Updates an event. This method does not support patch semantics and always updates the entire event resource. To do a partial update, perform a get followed by an update using etags to ensure atomicity.
//         delete: '/calendars/{calendarId}/events/{eventId}', // DELETE. Deletes an event.
//         // watch: '/calendars/{calendarId}/events/watch' // POST. Watch for changes to Events resources.
//     },
//
// }
//
// export async function getCalendarList(requestDto?: CalendarListGetListReq): Promise<CalendarListGetListRes> {
//     try {
//         if (!api) throw Error();
//
//         const response = await api.get(apiUris.calendarList.getList, {
//             params: requestDto?.queryParams,
//         });
//         return response.data;
//     } catch (error) {
//         console.error('API Error:', error);
//         throw error;
//     }
// }
//
// export async function getEvent(requestDto: EventGetReq): Promise<EventGetRes> {
//     try {
//         if (!api) throw Error();
//
//         const response = await api.get(replacePathParams(apiUris.events.get, requestDto.pathParams), {
//             params: requestDto.queryParams,
//         });
//         return response.data;
//     } catch (error) {
//         console.error('API Error:', error);
//         throw error;
//     }
// }
//
// export async function getEventList(requestDto: EventGetListReq): Promise<EventGetListRes> {
//     try {
//         if (!api) throw Error();
//
//         const response = await api.get(replacePathParams(apiUris.events.getList, requestDto.pathParams), {
//             params: requestDto.queryParams,
//         });
//         return response.data;
//     } catch (error) {
//         console.error('API Error:', error);
//         throw error;
//     }
// }
//
// export async function createEvent(requestDto: EventCreateReq): Promise<EventCreateRes> {
//     try {
//         if (!api) throw Error();
//
//         const response = await api.post(replacePathParams(apiUris.events.create, requestDto.pathParams), requestDto.body, {
//             params: requestDto.queryParams,
//         });
//         return response.data;
//     } catch (error) {
//         console.error('API Error:', error);
//         throw error;
//     }
// }
//
// export async function updateEvent(requestDto: EventUpdateReq): Promise<EventUpdateRes> {
//     try {
//         if (!api) throw Error();
//
//         const response = await api.put(replacePathParams(apiUris.events.update, requestDto.pathParams), requestDto.body,{
//             params: requestDto.queryParams,
//         });
//         return response.data;
//     } catch (error) {
//         console.error('API Error:', error);
//         throw error;
//     }
// }
//
// export function deleteEvent(requestDto: EventDeleteReq): void {
//     try {
//         if (!api) throw Error();
//
//         api.delete(replacePathParams(apiUris.events.delete, requestDto.pathParams), {
//             params: requestDto.queryParams,
//         });
//     } catch (error) {
//         console.error('API Error:', error);
//         throw error;
//     }
// }
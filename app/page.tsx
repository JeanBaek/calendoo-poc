
import {auth, EnrichedSession} from "auth"
import {
  EventDeleteComponent,
  EventsCreateComponent,
  EventsListComponent,
  EventsUpdateComponent
} from "@/components/calendar-component";

export default async function Index() {
  const session = (await auth()) as EnrichedSession;

  const accessTokenExpiryDate = new Date(session.accessTokenExpiresAt).toLocaleString();
  const accessTokenIssueDate = new Date(session.accessTokenIssuedAt).toLocaleString();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">NextAuth.js Example</h1>
      <div className="flex flex-col bg-gray-100 rounded-md">
        <div className="p-4 font-bold bg-gray-200 rounded-t-md">
          Current Session
        </div>
        <pre className="py-6 px-4 whitespace-pre-wrap break-all">
          {JSON.stringify({...session, accessTokenExpiryDate, accessTokenIssueDate}, null, 2)}
        </pre>
      </div>
        <EventsListComponent/>
        <EventsCreateComponent/>
        <EventDeleteComponent/>
        <EventsUpdateComponent/>
    </div>
  )
}

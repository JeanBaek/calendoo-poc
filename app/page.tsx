// import { auth, EnrichedSession } from 'auth';
import dynamic from 'next/dynamic';

const TodoApp = dynamic(() => import('../components/todo-app'), {
  ssr: false, // 이 컴포넌트는 서버 사이드에서 렌더링하지 않습니다.
});

export default async function Index() {
  // const session = (await auth()) as EnrichedSession;
  // const accessTokenExpiryDate = new Date(
  //   session.accessTokenExpiresAt
  // ).toLocaleString();
  // const accessTokenIssueDate = new Date(
  //   session.accessTokenIssuedAt
  // ).toLocaleString();

  return (
    <div className="flex flex-col gap-6">
      {/*<pre className="py-6 px-4 whitespace-pre-wrap break-all">*/}
      {/*  Current Session*/}
      {/*  {JSON.stringify(*/}
      {/*    { ...session, accessTokenExpiryDate, accessTokenIssueDate },*/}
      {/*    null,*/}
      {/*    2*/}
      {/*  )}*/}
      {/*</pre>*/}
      <TodoApp />
    </div>
  );
}

import Call from "@/app/components/Call";


export default function Page({ params }) {
    return (
        <main className="flex w-full flex-col">
            <Call appId={"a5ffcd1a83d94bd8ae0a0fe0013042e7"} channelName={params.session_id}></Call>
        </main>
    );
}


import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

export default function newMeetup() {
    const router = useRouter();

    async function addMeetupHandler(enteredData) {


        const response = fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = (await response).json();

        console.log(data);

        router.push('/');
    }

    return <>
        <Head>
            <title>Add new meetup</title>
            <meta name="description" content="Add new meetup of your choice" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
}
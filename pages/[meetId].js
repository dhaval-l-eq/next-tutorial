import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head'

export default function MeetupDetailPage(props) {
    return <>

        <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <MeetupDetail image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    </>
}

export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://dhavalladani:N6E4SHShxid2EqIG@meetups.8x5rn0o.mongodb.net/test');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',  //false means that every page are included and if any other page is requested no page found will be shown
        paths: meetups.map(meetup => ({
            params: { meetId: meetup._id.toString() },
        }))
    }
}

export async function getStaticProps(context) {
    const { meetId } = context.params;

    const client = await MongoClient.connect('mongodb+srv://dhavalladani:N6E4SHShxid2EqIG@meetups.8x5rn0o.mongodb.net/test');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetup = await meetupsCollection.findOne({ _id: new ObjectId(meetId) });

    client.close();

    return {
        props: {
            meetupData: {
                image: meetup.image,
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                description: meetup.description,
            }
        }
    }
} 
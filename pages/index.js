import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import MeetupList from '@/components/meetups/MeetupList'
import { MongoClient } from 'mongodb';

const MEETUPS = [
  {
    id: 'm1',
    image: 'https://www.tripsavvy.com/thmb/gdhvU4tBn_De9xOSyYnh1dHAUEw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/beach-5b59c9b7c9e77c004b3e0ff0.jpg',
    title: 'A Beach',
    address: 'beach 1, Maldives',
  },
  {
    id: 'm2',
    image: 'https://www.tripsavvy.com/thmb/gdhvU4tBn_De9xOSyYnh1dHAUEw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/beach-5b59c9b7c9e77c004b3e0ff0.jpg',
    title: 'A similar Beach',
    address: 'beach 145, Diu',
  },
  {
    id: 'm3',
    image: 'https://www.tripsavvy.com/thmb/gdhvU4tBn_De9xOSyYnh1dHAUEw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/beach-5b59c9b7c9e77c004b3e0ff0.jpg',
    title: 'A different same Beach',
    address: 'beach 123, Goa',
  },
];

export default function Home(props) {



  return (
    <>
      <Head>
        <title>Meetup App</title>
        <meta name="description" content="Create meetup, view meetups created and view details" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <MeetupList meetups={props.meetups} />
      </main>
    </>
  )
}

export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv://dhavalladani:N6E4SHShxid2EqIG@meetups.8x5rn0o.mongodb.net/test');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');


  const meetupData = await meetupsCollection.find().toArray();

  client.close();

  const meetups = meetupData.map(meetup => ({
    title: meetup.title,
    image: meetup.image,
    address: meetup.address,
    id: meetup._id.toString(),

  }))

  return {
    props: {
      meetups: meetups,
    },
    revalidate: 10 // Number of seconds after which next re-renders this page if there is any changes in the incoming request.
  }
}

// If you need to re-render page frequently i.e. on every changed in incoming requests then there is another function as below:

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API 

//   return {
//     props: {
//       meetups: MEETUPS,
//     },
//   }
// }
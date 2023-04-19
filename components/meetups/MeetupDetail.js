import classes from './MeetupDetail.module.css';

export default function MeetupDetail(props) {

    return <section className={classes.section}>
        <img src={props.image} />
        <h1>{props.title}</h1>
        <p>{props.address}</p>
        <p>{props.description}</p>
    </section>
}
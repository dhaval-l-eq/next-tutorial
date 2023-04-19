import Link from "next/link";

export default function Menu() {
    return <>
    <h1>This is menu page</h1>
    <ul>
        <li><Link href='/menu/shoes'>Shoes</Link></li>
        <li><Link href='/menu/clothes'>Clothes</Link></li>
        <li><Link href='/menu/sandals'>Sandals</Link></li>
    </ul>
    </>
}
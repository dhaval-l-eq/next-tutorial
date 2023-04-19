import { useRouter } from "next/router"

export default function ItemDetail() {

    const router = useRouter();

    const id = router.query.itemID;

    return <h1>{id}</h1>
}
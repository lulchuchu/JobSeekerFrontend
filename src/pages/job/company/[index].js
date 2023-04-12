import Jobb from "..";
import { useRouter } from "next/router";

export default function Company() {
    const router = useRouter();

    const { index } = router.query;

    return (
        <>
            <Jobb companyId={index} />
        </>
    );
}

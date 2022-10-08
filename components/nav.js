import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Link from 'next/link'

function Navigation() {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <nav>
            <ul className="flex gap-4 text-white">
                <li className=""> <Link href="/"> Home </Link> </li>
                <li className=""> <Link href="/pricing"> Pricing </Link> </li>
                <li className=""> <Link href="/contact"> Contact </Link> </li>
                <li className=""> <Link href="#">
                    {session ? (<button onClick={() => signOut()}>Log out</button>)
                        : (
                            <a
                                onClick={() => {
                                    router.push("/api/auth/signin");
                                }}
                            >
                                Sign in
                            </a>
                        )}
                </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation
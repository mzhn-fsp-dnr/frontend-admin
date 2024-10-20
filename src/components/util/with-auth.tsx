import { useRouter } from "next/router";
import NoAuth from "./no-auth";
import RoleRequired from "./role-required";
import { redirect } from 'next/navigation';
import { useEffect } from "react";

const Redirect = () => {
    const router = useRouter();
    const handleRedirect = () => {
        router.push('/signin');
    };

    useEffect(() => {
        handleRedirect();
    }, [])

    return null;
}

const withAuth = (Component : any) => {
    const WithAuthWrappered = () => {
        return <>
            <RoleRequired>
                <Component />
            </RoleRequired>
            <NoAuth>
                <Redirect />
            </NoAuth>
        </>;
    }

    return WithAuthWrappered;
}

export default withAuth;

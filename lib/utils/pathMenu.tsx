"use client"
import { usePathname } from "next/navigation";
import Menu from "@/app/components/Menu";
import { Container } from "@mui/material";
import { Providers } from "@/app/providers";

const PathWithMenu = () => {


    const pathname = usePathname();
    const showMenu = ["/wallet", "/home", "/user", "/movement", "/profile"].includes(pathname)


    if (!showMenu) return null;

    return (

        <Container className="h-full" sx={{
            display: "flex",
            alignItems: "end",
            paddingBottom: "1vh",
            // position: "fixed",
            position: "absolute",
            bottom: 0,
            left: 0,
            // left: "24px",
            // width: "90%",
            height: "4vh"
        }}>
            <Providers>
                <Menu />

            </Providers>
        </Container>
    )
}

export {
    PathWithMenu
}
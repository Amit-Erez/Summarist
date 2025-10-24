import { AppDispatch } from "@/store/store";
import { setUser } from "@/slices/userSlice";
import { closeLogin } from "@/slices/uiLoginSlice";
import {store} from "@/store/store"


interface AuthUserData {
    uid: string;
    email: string | null;
    plan?: string | null;
}

export function handleAuth(user: AuthUserData, dispatch:AppDispatch) {

    dispatch(
        setUser({
            uid: user.uid,
            email: user.email ?? null,
            plan: user.plan ?? null,
            isLoggedIn: true,
        })
    );

    localStorage.setItem(
        "authUser",
        JSON.stringify({
            uid: user.uid,
            email: user.email,
            plan: user.plan ?? null,
        })
    );

    console.log("Guest user signed in:", store.getState().user);
    dispatch(closeLogin());
}
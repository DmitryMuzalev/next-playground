
import s from "./Loading.module.scss";


type Props = {
    message?: string;
}
export function Loading({ message = "Loading..." }: Props) {
    return (
        <div className={s.loading} aria-live="polite">
            <div className={s.spinner}></div>
            <p className={s.message}>{message}</p>
        </div>
    )
}

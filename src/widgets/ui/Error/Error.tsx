import s from './Error.module.scss';
type Props = {
    message?: string
}

export function Error({ message = "Error!" }: Props) {
    return (
        <div className={s.error}>
            <h2>{message}</h2>
            <p>Please try again later.</p>
        </div>
    );
}



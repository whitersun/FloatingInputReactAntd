import "./style.scss"

type PropsFloatingBox = {
    children: React.ReactNode,
    className?: string
}

export const FloatingBox = (props: PropsFloatingBox) => {
    const { children, className } = props;

    return (
        <div className={`floating-input ${className}`}>
            {children}
        </div>
    )
}
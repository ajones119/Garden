
type BasicButtonProps = {
    onClick: () => void;
    addedClass?: string;
    id?: string,
    children?: Element | string;
}

export default ({onClick, addedClass, id, children}: BasicButtonProps) => {

    return (
        <button
            onClick={onClick}
            class={`px-4 py-2 rounded-md font-bold text-white transition-colors bg-muted hover:bg-accent hover:cursor-pointer ${addedClass}`}
            id={id}
        >
            {children}
        </button>
    )
}
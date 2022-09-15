interface PropsBulletIcon {
    filled?: boolean,
}

export default function DotsIcon({ filled }: PropsBulletIcon): JSX.Element {
    return <div className={`dot-icon ${filled ? 'dot__filled-icon' : ''}`}></div>;
}

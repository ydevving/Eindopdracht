
export default function LicensePlate({ licensePlate }: { licensePlate: string }) {
    return (
        <>
            <div className="plate">
                <div className="eu-banner">
                    <svg className="eu-stars" viewBox="0 0 100 100">
                        <g transform="translate(50,50)">
                            <g fill="gold">
                                <g transform="rotate(0) translate(35,0)">
                                    <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" />
                                </g>
                                <g transform="rotate(30) translate(35,0)">
                                    <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" />
                                </g>
                                <g transform="rotate(60) translate(35,0)">
                                    <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" />
                                </g>
                                <g transform="rotate(90) translate(35,0)">
                                    <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" />
                                </g>
                                <g transform="rotate(120) translate(35,0)">
                                    <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" />
                                </g>
                                <g transform="rotate(150) translate(35,0)">
                                    <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" />
                                </g>
                                <g transform="rotate(180) translate(35,0)">
                                    <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" />
                                </g>
                                <g transform="rotate(210) translate(35,0)">
                                    <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" />
                                </g>
                                <g transform="rotate(240) translate(35,0)">
                                    <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" />
                                </g>
                                <g transform="rotate(270) translate(35,0)">
                                    <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" />
                                </g>
                                <g transform="rotate(300) translate(35,0)">
                                    <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" />
                                </g>
                                <g transform="rotate(330) translate(35,0)">
                                    <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" />
                                </g>
                            </g>
                        </g>
                    </svg>
                    <div>NL</div>
                </div>
                <div className="plate-number">{licensePlate}</div>
            </div>
        </>
    );
}

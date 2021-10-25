import { useEffect, useRef } from "react"

export default function JobCardComponent({ jobTitle, companyName, shortDesc, postedDate }) {
    // Reference to the job description paragraph to manipulate its text
    const description = useRef(null);

    // Change innerText in job description paragraph at the beginning
    useEffect(function () {
        let desc = description.current,
            content = desc.textContent.split(/\\n+/g).join('<br />');
        desc.innerHTML = content;
    }, []);

    return (
        <div className="container-sm">
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="c-text card-title">{jobTitle}</h5>
                    <p className="c-text card-text" ref={description}>{shortDesc}...</p>
                    <p className="c-text company-name">{companyName}</p>
                </div>
                <div className="card-footer text-muted">
                    {postedDate}
                </div>
            </div>

            <style jsx>{`
                // Import Google fonts
                @import url('https://fonts.googleapis.com/css2?family=Zen+Antique+Soft&display=swap');

                .card {
                    margin: 1.5em 0;
                    max-width: 650px;
                    transition: all .35s;
                }

                .card:hover {
                    box-shadow: 1px 1px 4px #888;
                }

                .c-text { text-align: left; }

                .card-title { font-size: 1.45em; }

                .card-text {
                    font-size: 1.1em;
                    margin: 1em 0;
                }

                .company-name {
                    margin: 0;
                    font-family: 'Zen Antique Soft', serif;
                }

                @media only screen and (min-width: 992px) {
                    .container-sm {
                        max-width: fit-content;
                    }
                }
            `}</style>
        </div>
    )
}
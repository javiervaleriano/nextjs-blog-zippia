// Import hooks:
import { useState, useEffect, useRef } from "react";

// Import external components:
import JobCardComponent from "../../../components/job/job";
import SelectOptComponent from "../../../components/btnSelect/selectOpt";


export default function Jobs({ jobs }) {
    // Variable to use the current moment for filtering
    let rightNow = new Date();

    /* This variable is used to save the reference to
    / the filter button 'select' and access its value */
    const select = useRef(null);

    // Only 10 jobs arranged chronologically
    const tenJobs = jobs.filter((item, index) => index < 10).sort((job1, job2) => (rightNow - new Date(job1.OBJpostingDate)) - (rightNow - new Date(job2.OBJpostingDate)));

    // State to store all the jobs
    const [postedJobs, setPostedJobs] = useState([{
        jobId: 1,
        jobTitle: '',
        companyName: '',
        shortDesc: '',
        OBJpostingDate: '',
        postedDate: ''
    }]);

    // State to store all company names of all published jobs
    let [companyNames, setCompanyNames] = useState([]);

    // State to determine if the filter of posts in the last 7 days was activated
    const [lastSevenD, setLastSevenD] = useState(false);


    // This runs at the beginning and when the 'jobs' prop changes
    useEffect(function () {
        // Set the state of all jobs
        setPostedJobs(tenJobs);
        
        // Ensures that company names are not repeated for use in select button
        let arrJobs = tenJobs.map(job => job.companyName);
        arrJobs = arrJobs.reduce(function (acc, item) {
            if (!acc.includes(item)) {
                acc.push(item);
            }

            return acc;
        }, []);
        // Set the state of all company names for all jobs
        setCompanyNames(arrJobs);
    }, [jobs]);

    // Function to control the filtering of the last 7 days
    function handleFilterDays() {
        setLastSevenD(!lastSevenD);

        let selectVal = select.current.value,
            filteredJobs;

        if (!lastSevenD && !selectVal) {
            filteredJobs = tenJobs.filter(job => (rightNow - new Date(job.OBJpostingDate)) < 691200000);

            setPostedJobs(filteredJobs);

        } else if (lastSevenD && !selectVal) {
            setPostedJobs(tenJobs);

        } else if (!lastSevenD && selectVal) {
            filteredJobs = tenJobs.filter(function (job) {
                if ((rightNow - new Date(job.OBJpostingDate)) < 691200000 && job.companyName === selectVal) return job;
            });

            setPostedJobs(filteredJobs);

        } else {
            filteredJobs = tenJobs.filter(job => job.companyName === selectVal);
            setPostedJobs(filteredJobs);
        }

    }

    // Function to control the filtering by company name
    function handleSelectChange({ target: { value } }) {
        let filteredJobs;
        
        if (value && !lastSevenD) {
            filteredJobs = tenJobs.filter(job => job.companyName === value);
            setPostedJobs(filteredJobs);

        } else if (value && lastSevenD) {
            filteredJobs = tenJobs.filter(function (job) {
                if ((rightNow - new Date(job.OBJpostingDate)) < 691200000 && job.companyName === value) {
                    return job;
                }
            });

            setPostedJobs(filteredJobs);

        } else if (!value && lastSevenD) {
            filteredJobs = tenJobs.filter(job => (rightNow - new Date(job.OBJpostingDate)) < 691200000);

            setPostedJobs(filteredJobs);

        } else {
            setPostedJobs(tenJobs);
        }
    }

    return (
        <div className="page-container">
            <h1>Find your ideal job!</h1>
            <div className="container-sm">
                <select className="form-select"
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                    ref={select}
                >
                    <option defaultValue value="">Choose a company</option>
                    {/* Returns a select option for each company name sorted alphabetically */}
                    { companyNames.sort((company1, company2) => company1 < company2 ? -1 : 1).map((name, i) => <SelectOptComponent company={name} key={i} />) }
                </select>
                <button type="button" onClick={handleFilterDays} className={lastSevenD ? 'btn btn-checked' : 'btn btn-light'}>
                    Last 7 days
                </button>
            </div>
            <section className="sec-jobs">
                {/* Returns a card for each job (JSON) of the array obtained from the API */}
                { postedJobs.map(function (job) {
                    return (
                        <JobCardComponent key={job.jobId}
                            jobTitle={job.jobTitle}
                            companyName={job.companyName}
                            shortDesc={job.shortDesc}
                            postedDate={job.postedDate}
                        />
                    )
                }) }
            </section>

            <style jsx>{`
                .page-container {
                    background: #ECE9E6;  /* fallback for old browsers */
                    background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
                    background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                    min-height: 100vh;
                }

                .container-sm {
                    margin-bottom: 3.5em;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-evenly;
                }

                h1 {
                    text-align: center;
                    margin: 0 0 1em 0;
                    padding-top: 2.7em;
                }

                .form-select {
                    min-width: fit-content;
                    max-width: fit-content;
                }

                select { margin-left: 1.15em; }

                .btn {
                    min-width: fit-content;
                    transition: all .35s;
                }

                .btn-unchecked { background-color: lightblue; }
                .btn-checked {
                    background-color: #000;
                    color: #fff;
                }

                .sec-jobs {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                @media only screen and (max-width: 475px) {
                    select { margin: 0 0 1.15em 0; }
                }
            `}</style>
        </div>
    );
}

/* Make the request to the API and pass the
/  info as a prop to the Jobs component */
Jobs.getInitialProps = async () => {
    let res = await fetch('https://www.zippia.com/api/jobs/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            "companySkills": true,
            "dismissedListingHashes": [],
            "fetchJobDesc": true,
            "jobTitle": "Business Analyst",
            "locations": [],
            "numJobs": 20,
            "previousListingHashes": []
        })
    }),
            json = await res.json();

    return { jobs: json.jobs };
};
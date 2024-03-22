import React from 'react';
import JobBlock from './JobBlock';

const JobBlocks = () => {
    const jobData = [
        {
            id: 1,
            title: 'Software Engineer',
            info: 'We are looking for a talented software engineer to join our team.',
            buttonText: 'View Details',
        },
        {
            id: 2,
            title: 'Data Analyst',
            info: 'We are seeking a data analyst to analyze and interpret data.',
            buttonText: 'View Details',
        },
        {
            id: 3,
            title: 'Product Manager',
            info: 'We are hiring a product manager to oversee product development.',
            buttonText: 'View Details',
        },
        // Additional job suggestions
        {
            id: 4,
            title: 'Frontend Developer',
            info: 'We are in need of a skilled frontend developer to work on our web applications.',
            buttonText: 'View Details',
        },
        {
            id: 5,
            title: 'Marketing Specialist',
            info: 'Looking for a marketing specialist to develop and implement marketing strategies.',
            buttonText: 'View Details',
        },
        {
            id: 6,
            title: 'Graphic Designer',
            info: 'We require a creative graphic designer to design various marketing materials.',
            buttonText: 'View Details',
        },
        {
            id: 7,
            title: 'HR Manager',
            info: 'Seeking an experienced HR manager to oversee human resources activities.',
            buttonText: 'View Details',
        },
        {
            id: 8,
            title: 'Financial Analyst',
            info: 'We are hiring a financial analyst to analyze financial data and make recommendations.',
            buttonText: 'View Details',
        },
        {
            id: 9,
            title: 'Content Writer',
            info: 'Looking for a talented content writer to create engaging content for our audience.',
            buttonText: 'View Details',
        },
        {
            id: 10,
            title: 'UI/UX Designer',
            info: 'We need a UI/UX designer to improve user experience and interface design.',
            buttonText: 'View Details',
        },
        {
            id: 11,
            title: 'Sales Manager',
            info: 'Hiring a sales manager to lead our sales team and drive revenue growth.',
            buttonText: 'View Details',
        },
        {
            id: 12,
            title: 'Network Administrator',
            info: 'We are looking for a network administrator to manage our network infrastructure.',
            buttonText: 'View Details',
        },
    ];

    return (
        <div>
            <div className="text-4xl font-bold leading-tight tracking-tight text-teal-500 md:text-3xl dark:text-white mb-8 text-center">My Jobs</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {jobData.map((job) => (
                    <JobBlock
                        key={job.id}
                        title={job.title}
                        info={job.info}
                        buttonText={job.buttonText}
                        onClick={() => {
                            // Handle button click event here
                            console.log(`Button clicked for job: ${job.title}`);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default JobBlocks;
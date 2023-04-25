import { getJobs, getJob, getJobsByCompany, createJob } from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
    Query: {
        job: async(_root, { id }) => {
            const job = await getJob(id);
            
            if(!job){
                errorHandler("Not job found of id" + id);
            
            };
            return job;
        },
        jobs: () => getJobs(),
        company: async(_root, { id }) => {
            const company = await getCompany(id);
            if(!company){
                errorHandler("Not company found by id" + id);
            };

            return company;
        }
    },

    Mutation: {
        createJob: (__root, { title, description }) => {
            const companyId = 'FjcJCHJALA4i';
            
            return createJob({ companyId, title, description});
        }
    },

    Company:{
        jobs: (job) => getJobsByCompany(job.id)
    },

    Job: {
        company: (job) => getCompany(job.companyId),
        date: (job) => toIsoDate(job.createdAt)
    }
};

function toIsoDate(date){
    return date.slice(0, 'yyyy-mm-dd'.length);
}

function errorHandler(message){
    throw new GraphQLError(message, {
        extensions: {code: "NOT_FOUND"}
    });
}
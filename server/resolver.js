import { getJobs, getJob, getJobsByCompany } from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
    Query: {
        trabajoPorId: async(_root, { id }) => {
            const job = await getJob(id);
            
            if(!job){
                errorHandler("Not job found of id" + id);
            
            };
            return job;
        },
        obtenerTrabajos: () => getJobs(),
        companyPorId: async(_root, { id }) => {
            const company = await getCompany(id);
            
            if(!company){
                errorHandler("Not company found by id" + id);
            };

            return company;
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
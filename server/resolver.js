import { getJobs, getJob, getJobsByCompany } from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
    Query: {
        trabajoPorId: (_root, { id }) => getJob(id),
        obtenerTrabajos: () => getJobs(),
        companyPorId: (_root, { id }) => getCompany(id)
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
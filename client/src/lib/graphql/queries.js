import { GraphQLClient, gql } from 'graphql-request'

const cliente = new GraphQLClient('http://localhost:9000/graphql');

export async function getJobs(){
    const query = gql`
        query {
            obtenerTrabajos{
                id
                date
                title
                company{
                    id
                    name
                }
            }
        }

    `;

    const { obtenerTrabajos } = await cliente.request(query);
    return obtenerTrabajos;
}

export async function getJob(id){
    const query = gql`
        query JobById($id: ID!){
            trabajoPorId(id: $id){
                id
                date
                title
                company{
                    id
                    name
                }
                description
            }
        }
    
    `;

    const { trabajoPorId } = await cliente.request(query, { id });
    return trabajoPorId;
}

export async function getCompany(id){
    const query = gql`
        query companyPorId($id: ID!){
            companyPorId(id: $id){
                name
                description
            }
        }

    `;

    const { companyPorId } = await cliente.request(query, { id });
    return companyPorId;
}
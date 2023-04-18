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
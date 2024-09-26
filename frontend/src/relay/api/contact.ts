import { graphql } from 'relay-runtime';

export const FormMutation = graphql`
    mutation contactMutation($data: ContactMessageInput!) {
        createContactMessage(data: $data) {
            documentId
        }
    }
`;

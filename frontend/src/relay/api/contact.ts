import { graphql } from 'relay-runtime';

export const FormMutation = graphql`
    mutation contactMutation($data: MessageInput!) {
        createMessage(data: $data) {
            data {
                id
            }
        }
    }
`;

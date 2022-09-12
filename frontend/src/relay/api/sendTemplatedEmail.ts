import { graphql } from 'relay-runtime';

export const SendTemplatedEmailQuery = graphql`
    query sendTemplatedEmailQuery($emailTo: String, $emailTemplate: Int, $variables: Variables) {
        sendEmail(emailTo: $emailTo, emailTemplate: $emailTemplate, variables: $variables)
    }
`;

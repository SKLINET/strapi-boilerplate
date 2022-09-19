import { graphql } from 'relay-runtime';

export const SendTemplatedEmailQuery = graphql`
    query sendTemplatedEmailQuery($emailTo: String, $emailTemplate: Int, $email: String, $firstName: String) {
        sendEmail(emailTo: $emailTo, emailTemplate: $emailTemplate, email: $email, firstName: $firstName)
    }
`;

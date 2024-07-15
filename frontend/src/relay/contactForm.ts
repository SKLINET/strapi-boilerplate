import { graphql } from 'relay-runtime';

graphql`
    fragment contactFormFragment on ContactFormEntity {
        id
        attributes {
            successMessage
            errorMessage
            checkboxLabel
            sendEmail {
                ...appSendEmailFragment @relay(mask: false)
            }
        }
    }
`;

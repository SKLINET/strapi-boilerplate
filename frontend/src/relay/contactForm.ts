import { graphql } from 'relay-runtime';

graphql`
    fragment contactFormFragment on ContactForm {
        documentId
        successMessage
        errorMessage
        checkboxLabel
        sendEmail {
            ...appSendEmailFragment @relay(mask: false)
        }
    }
`;

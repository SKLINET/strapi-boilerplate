import { graphql } from 'relay-runtime';

graphql`
    fragment contactFormFragment on ContactFormEntityResponse {
        data {
            attributes {
                mailFrom
                mailTo
                mailSubject
            }
        }
    }
`;

export const contactFormQuery = graphql`
    query contactFormQuery($publicationState: PublicationState, $locale: I18NLocaleCode) {
        item: contactForm(publicationState: $publicationState, locale: $locale) {
            ...contactFormFragment @relay(mask: false)
        }
    }
`;

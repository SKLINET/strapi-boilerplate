import { graphql } from 'relay-runtime';

export const SubscribeFormMutation = graphql`
    mutation subscribeMutation($data: NewsletterSubscriberInput!) {
        createNewsletterSubscriber(data: $data) {
            data {
                id
            }
        }
    }
`;

// export const MailchimpSettingsQuery = graphql`
//     query subscribeMailchimpQuery($publicationState: PublicationState) {
//         webSetting(publicationState: $publicationState) {
//             mailchimp {
//                 serverPrefix
//                 apiKey
//                 listId
//             }
//         }
//     }
// `;

// export const EcomailSettingsQuery = graphql`
//     query subscribeEcomailQuery($publicationState: PublicationState) {
//         newsletterBox(publicationState: $publicationState) {
//             ecomail {
//                 apiKey
//                 listId
//             }
//         }
//     }
// `;

import { graphql } from 'relay-runtime';

export const SubscribeFormMutation = graphql`
    mutation subscribeMutation($data: NewsletterSubscriberInput!) {
        createNewsletterSubscriber(data: $data) {
            documentId
        }
    }
`;

// export const MailchimpSettingsQuery = graphql`
//     query subscribeMailchimpQuery($status: PublicationState) {
//         webSetting(publicationState: $status) {
//             mailchimp {
//                 serverPrefix
//                 apiKey
//                 listId
//             }
//         }
//     }
// `;

// export const EcomailSettingsQuery = graphql`
//     query subscribeEcomailQuery($status: PublicationState) {
//         newsletterBox(publicationState: $status) {
//             ecomail {
//                 apiKey
//                 listId
//             }
//         }
//     }
// `;

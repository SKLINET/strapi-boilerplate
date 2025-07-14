import { ISendEmail } from '../../types/form';
import { appSendEmailFragment$data } from '../../relay/__generated__/appSendEmailFragment.graphql';

type Fragment = Omit<appSendEmailFragment$data, ' $fragmentType'>;

export const getSendEmailType = (e: Fragment | null | undefined): ISendEmail | null => {
    if (!e) return null;

    const { id, emailFrom, emailTo, subject } = e;

    return {
        id: id,
        from: emailFrom,
        to: emailTo,
        subject: subject,
    };
};

export const getSendEmailListType = (
    e: ReadonlyArray<Fragment | null | undefined> | null | undefined,
): ISendEmail[] => {
    const data: ISendEmail[] = [];

    e?.forEach((k) => {
        const item = getSendEmailType(k);

        if (!item) return;

        data.push(item);
    });

    return data;
};

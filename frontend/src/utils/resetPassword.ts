import axios from 'axios';

interface ResetUserPasswordProps {
    email: string;
    name: string;
}

export function resetUserPassword(data: ResetUserPasswordProps) {
    axios
        .post(`${process.env.API_BASE_PATH}/email-template-connector/reset/password`, {
            email: data?.email,
            name: data?.name,
        })
        .then((response) => {
            console.log(response.data);
        });
}

export interface IFile {
    id: string;
    name: string;
    href: string;
    size: string;
}

export interface IFileInput {
    typename: 'file';
    id: string;
    title: string;
    data: File;
}

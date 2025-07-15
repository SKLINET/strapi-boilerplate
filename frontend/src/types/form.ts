import { IFile } from './file';

export interface IBuiltForm {
    id: string;
    title: string;
    data: IFormField[];
    successMessage?: string | null;
    errorMessage?: string | null;
}

export interface ISelectedOption {
    key: string;
    label: string;
}

export interface IProduct {
    id: string;
    name: string;
    label: string;
    price: number;
}

export interface ICondition {
    id: string;
    fieldId: string;
    operator: IOperator;
    value: string | boolean | ISelectedOption | undefined;
}

export type IOperator = 'equals' | 'not-equals' | 'contains' | 'not-contains' | 'empty' | 'not-empty' | 'has-checked';

export type IFormField = {
    id: string;
    onFullWidth: boolean;
    conditionsEval?: 'and' | 'or';
    conditions?: ICondition[];
    type:
        | 'textinput'
        | 'textarea'
        | 'email'
        | 'phone'
        | 'file'
        | 'select'
        | 'checkbox'
        | 'checkboxGroup'
        | 'productsSelection'
        | 'amount'
        | 'submit'
        | 'title'
        | 'message'
        | 'divider'
        | 'special';
} & (
    | {
          type: 'textinput';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          useOnly: boolean;
      }
    | {
          type: 'textarea';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          useOnly: boolean;
      }
    | {
          type: 'email';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          useOnly: boolean;
      }
    | {
          type: 'phone';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          useOnly: boolean;
      }
    | {
          type: 'file';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          maxFileCount: number | null;
          allowedFileTypes: string[] | null;
          maxFileSize: number | null;
          useOnly: boolean;
      }
    | {
          type: 'select';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          options: ISelectedOption[];
          useOnly: boolean;
      }
    | {
          type: 'checkbox';
          name: string | null;
          label: string | null;
          required: boolean;
          useOnly: boolean;
      }
    | {
          type: 'checkboxGroup';
          name: string | null;
          label: string | null;
          options: ISelectedOption[];
          useOnly: boolean;
      }
    | {
          type: 'productsSelection';
          name: string | null;
          label: string | null;
          products: IProduct[];
          useOnly: boolean;
      }
    | {
          type: 'amount';
          name: string | null;
          label: string | null;
          fields: string[];
          useOnly: boolean;
      }
    | {
          type: 'submit';
          label: string | null;
      }
    | {
          type: 'title';
          label: string | null;
          isLarge: boolean;
      }
    | {
          type: 'message';
          label: string | null;
      }
    | {
          type: 'divider';
      }
    | {
          type: 'special';
          codename: string | null;
      }
);

export interface ISendEmail {
    id: string;
    from: string;
    to: string;
    subject: string;
}

export interface IFormModal {
    id: string;
    title: string;
    form: IBuiltForm;
    sendEmail: ISendEmail | null;
    gdprFile: IFile | null;
}

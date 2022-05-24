export default function nbsp(txt: string | null | undefined): string | undefined {
    return txt?.replace(/(\s|^)(\w)(\s)(\w)/g, '$1$2\u00A0$4');
}

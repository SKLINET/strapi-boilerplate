type ImgixParamsAuto = 'enhance' | 'format' | 'redeye' | 'compress';

type ImgixParamsBlendAlign = 'top' | 'bottom' | 'middle' | 'left' | 'right' | 'center';

type ImgixParamsBlendCrop = 'top' | 'bottom' | 'left' | 'right' | 'faces';

type ImgixParamsBlendFit = 'clamp' | 'clip' | 'crop' | 'scale' | 'max';

type ImgixParamsBlendMode =
    | 'color'
    | 'burn'
    | 'dodge'
    | 'darken'
    | 'difference'
    | 'exclusion'
    | 'hardlight'
    | 'hue'
    | 'lighten'
    | 'luminosity'
    | 'multiply'
    | 'overlay'
    | 'saturation'
    | 'screen'
    | 'softlight'
    | 'normal';

type ImgixParamsBlendSize = 'inherit';

type ImgixParamsCh = 'width' | 'dpr' | 'saveData';

type ImgixParamsCrop = 'top' | 'bottom' | 'left' | 'right' | 'faces' | 'entropy' | 'edges' | 'focalpoint';

type ImgixParamsCs = 'srgb' | 'adobergb1998' | 'tinysrgb' | 'strip';

type ImgixParamsFill = 'solid' | 'blur';

type ImgixParamsFit = 'clamp' | 'clip' | 'crop' | 'facearea' | 'fill' | 'fillmax' | 'max' | 'min' | 'scale';

type ImgixParamsFlip = 'h' | 'v' | 'hv';

type ImgixParamsFm =
    | 'gif'
    | 'jpg'
    | 'jp2'
    | 'json'
    | 'jxr'
    | 'pjpg'
    | 'mx4'
    | 'png'
    | 'pn8'
    | 'png32'
    | 'webp'
    | 'webm';

type ImgixParamsMarkAlign = 'top' | 'bottom' | 'middle' | 'left' | 'right' | 'center';

type ImgixParamsMarkFit = 'clip' | 'crop' | 'fill' | 'max' | 'scale';

type ImgixParamsPalette = 'css' | 'json';

type ImgixParamsTransparency = 'grid';

type ImgixParamsTrim = 'auto' | 'color';

type ImgixParamsTxtAlign = 'top' | 'bottom' | 'middle' | 'left' | 'right' | 'center';

type ImgixParamsTxtClip = 'start' | 'middle' | 'end' | 'ellipsis';

type ImgixParamsTxtFit = 'max';

interface ImgixParams {
    ar: string;
    auto: ImgixParamsAuto;
    bg: string;
    blendAlign: ImgixParamsBlendAlign;
    blendAlpha: number;
    blendColor: string;
    blendCrop: ImgixParamsBlendCrop;
    blendFit: ImgixParamsBlendFit;
    blendH: number;
    blendMode: ImgixParamsBlendMode;
    blendPad: number;
    blendSize: ImgixParamsBlendSize;
    blendW: number;
    blendX: number;
    blendY: number;
    blend: string;
    blur: number;
    borderBottom: number;
    borderLeft: number;
    borderRadiusInner: string;
    borderRadius: string;
    borderRight: number;
    borderTop: number;
    border: string;
    bri: number;
    ch: ImgixParamsCh;
    chromasub: number;
    colorquant: number;
    colors: number;
    con: number;
    cornerRadius: string;
    crop: ImgixParamsCrop;
    cs: ImgixParamsCs;
    dl: string;
    dpi: number;
    dpr: number;
    duotoneAlpha: number;
    duotone: string;
    exp: number;
    expires: number;
    faceindex: number;
    facepad: number;
    faces: number;
    fillColor: string;
    fill: ImgixParamsFill;
    fit: ImgixParamsFit;
    flip: ImgixParamsFlip;
    fm: ImgixParamsFm;
    fpDebug: boolean;
    fpX: number;
    fpY: number;
    fpZ: number;
    gam: number;
    gridColors: string;
    gridSize: number;
    h: number;
    high: number;
    htn: number;
    hue: number;
    invert: boolean;
    lossless: boolean;
    markAlign: ImgixParamsMarkAlign;
    markAlpha: number;
    markBase: string;
    markFit: ImgixParamsMarkFit;
    markH: number;
    markPad: number;
    markScale: number;
    markW: number;
    markX: number;
    markY: number;
    mark: string;
    maskBg: string;
    mask: string;
    maxH: number;
    maxW: number;
    minH: number;
    minW: number;
    monochrome: string;
    nr: number;
    nrs: number;
    orient: number;
    padBottom: number;
    padLeft: number;
    padRight: number;
    padTop: number;
    pad: number;
    page: number;
    palette: ImgixParamsPalette;
    prefix: string;
    px: number;
    q: number;
    rect: string;
    rot: number;
    sat: number;
    sepia: number;
    shad: number;
    sharp: number;
    transparency: ImgixParamsTransparency;
    trimColor: string;
    trimMd: number;
    trimPad: number;
    trimSd: number;
    trimTol: number;
    trim: ImgixParamsTrim;
    txtAlign: ImgixParamsTxtAlign;
    txtClip: ImgixParamsTxtClip;
    txtColor: string;
    txtFit: ImgixParamsTxtFit;
    txtFont: string;
    txtLead: number;
    txtLig: number;
    txtLineColor: string;
    txtLine: number;
    txtPad: number;
    txtShad: number;
    txtSize: number;
    txtTrack: number;
    txtWidth: number;
    txt: string;
    usm: number;
    usmrad: number;
    vib: number;
    w: number;
}

export type ImgixProps = Partial<ImgixParams>;

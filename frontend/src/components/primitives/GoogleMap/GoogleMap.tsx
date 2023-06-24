import React, { useState, ReactElement } from 'react';
import parse from 'html-react-parser';
import { GoogleMap as GoogleMapComponent, Marker, LoadScript, InfoBox } from '@react-google-maps/api';

export interface GoogleMapProps {
    readonly isMarkerShown: boolean;
    readonly latitude: number;
    readonly longitude: number;
    readonly bubbleText: string | null;
    readonly apiKey?: string;
}

interface TooltipProps {
    readonly text: string;
}

export const MapComponent = <div className="w-full h-full" />;
export const LoadingComponent = <div className="w-full h-full" />;
export const ContainerComponent = <div className="w-full h-96" />;

const TooltipComponent = ({ text }: TooltipProps): ReactElement<TooltipProps, 'div'> | null => (
    <div className="p-4 bg-secondary">{parse(text)}</div>
);

const GoogleMap = ({
    isMarkerShown,
    bubbleText,
    latitude,
    longitude,
    apiKey,
}: GoogleMapProps): ReactElement<GoogleMapProps, 'div'> | null => {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <LoadScript
                id="script-loader"
                googleMapsApiKey={apiKey || ''}
                loadingElement={<div className="w-full h-full" />}
            >
                <GoogleMapComponent
                    zoom={8}
                    center={{ lat: latitude, lng: longitude }}
                    mapContainerClassName="w-full h-96"
                >
                    {isMarkerShown && (
                        <>
                            <Marker position={{ lat: latitude, lng: longitude }} onClick={(): void => setVisible(true)}>
                                {bubbleText && visible && (
                                    <InfoBox onCloseClick={(): void => setVisible(false)}>
                                        <TooltipComponent text={bubbleText} />
                                    </InfoBox>
                                )}
                            </Marker>
                        </>
                    )}
                </GoogleMapComponent>
            </LoadScript>
        </div>
    );
};

GoogleMap.whyDidYouRender = true;

export { GoogleMap };

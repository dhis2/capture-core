// @flow
import * as React from 'react';

type Props = {
    open: boolean,
    anchorEl: ?HTMLElement,
    onClose: () => void,
    children: React.Node,
};

const defaultStyle = {
    position: 'absolute',
    zIndex: 200,
};

const D2DatePopup = (props: Props) => {
    const { open, children } = props;
    if (!open) {
        return null;
    }

    const style = { ...defaultStyle, top: 65, left: 0 };
    return (
        <div
            style={style}
        >
            {children}
        </div>
    );
};

export default D2DatePopup;

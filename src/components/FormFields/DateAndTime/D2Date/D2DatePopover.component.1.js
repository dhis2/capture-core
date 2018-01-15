// @flow
import * as React from 'react';
import Popover from 'material-ui-next/Popover';

type Props = {
    open: boolean,
    anchorEl: ?HTMLElement,
    onClose: () => void,
    children: React.Node,
};

const popoverProps = {
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'center',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'center',
    anchorReference: 'anchorEl',
};

const anchorOrigin = {
    vertical: popoverProps.anchorOriginVertical,
    horizontal: popoverProps.anchorOriginHorizontal,
};

const transformOrigin = {
    vertical: popoverProps.transformOriginVertical,
    horizontal: popoverProps.transformOriginHorizontal,
};

const defaultProps = {
    anchorOrigin,
    transformOrigin,
   
    anchorReference: popoverProps.anchorReference,
};

const D2DatePopover = (props: Props) => (
    <Popover
        {...defaultProps}
        {...props}
    />
);

export default D2DatePopover;

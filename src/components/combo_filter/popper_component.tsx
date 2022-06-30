/*
 * See SONAR_EULA file in the project root for full license information.
 */

import React from 'react';
import { Manager, Popper, Reference } from 'react-popper';

interface Props {
  hidePopper: boolean;
  popperComponent: JSX.Element;
  targetComponent: JSX.Element;
}

const modifiers = {
  preventOverflow: {
    enabled: true,
    escapeWithReference: true,
    boundariesElement: 'viewport',
  },
} as any;

export function PopperComponent(props: Props) {
  const { hidePopper, popperComponent, targetComponent } = props;

  const popper = hidePopper ? (
    <></>
  ) : (
    <Popper modifiers={modifiers} placement="top-start">
      {({ ref, style, placement, arrowProps }) => (
        <div {...{ ref, style }} className="comboFilter__popper" data-placement={placement}>
          {React.cloneElement(popperComponent, { arrowProps })}
        </div>
      )}
    </Popper>
  );

  return (
    <Manager>
      <Reference>{({ ref }) => <div ref={ref}>{targetComponent}</div>}</Reference>
      {popper}
    </Manager>
  );
}

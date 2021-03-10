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
        <div {...{ ref, style }} className="react-datepicker-popper" data-placement={placement}>
          {React.cloneElement(popperComponent, { arrowProps })}
        </div>
      )}
    </Popper>
  );

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div ref={ref} className="react-datepicker-wrapper">
            {targetComponent}
          </div>
        )}
      </Reference>
      {popper}
    </Manager>
  );
}

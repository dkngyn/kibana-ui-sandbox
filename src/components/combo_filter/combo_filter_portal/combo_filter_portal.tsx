import React, { PureComponent, MouseEvent } from 'react';
import { ComboFilterPanel } from '../combo_filter_panel';

interface Props {
  name: string;
  onSubmit: (filters: Record<string, string[]>) => void;
  onClickOutside: (e: MouseEvent<HTMLElement>) => void;
}

export class ComboFilterPortal extends PureComponent<Props> {
  public render() {
    return (
      <div key="comboFilter__portal">
        <ComboFilterPanel {...this.props} />
      </div>
    );
  }

  // @ts-ignore needed for react-popper handler
  private handleClickOutside = (e: MouseEvent<HTMLElement>) => {
    this.props.onClickOutside(e);
  };
}

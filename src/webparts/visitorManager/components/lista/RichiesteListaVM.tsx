import * as React from 'react';
import styles from './RichiesteListaVM.module.scss';
import { IRichiesteListaVMProps } from './IRichiesteListaVMProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class RichiesteListaVM extends React.Component<IRichiesteListaVMProps, {}> {
  public render(): React.ReactElement<IRichiesteListaVMProps> {
    return (
      <div className={ styles.RichiesteListaVM }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }> </p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

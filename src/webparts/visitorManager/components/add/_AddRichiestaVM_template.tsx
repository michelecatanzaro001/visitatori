import * as React from 'react';
import styles from './AddRichiestaVM.module.scss';
import { IAddRichiestaVMProps } from './IAddRichiestaVMProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Stack, IStackStyles, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';

const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 10 },
  styles: { root: { width: 300 } },
};
const iconProps = { iconName: 'Calendar' };

const stackTokens = { childrenGap: 10 , padding: "10x 0px 0px 0px"  };

const stackStyles: Partial<IStackStyles> = { root: { width: '100%' } };

export default class AddRichiestaVM extends React.Component<IAddRichiestaVMProps, {}> {
  public render(): React.ReactElement<IAddRichiestaVMProps> {
    return (
      // <div className={ styles.AddRichiestaVM }>
      //   <div className={ styles.container }>
      //     <div className={ styles.row }>
      //       <div className={ styles.column }>
      //         <span className={ styles.title }>Welcome to SharePoint!</span>
      //         <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
      //         <p className={ styles.description }> </p>
      //         <a href="https://aka.ms/spfx" className={ styles.button }>
      //           <span className={ styles.label }>Learn more</span>
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className={styles.AddRichiestaVM}>
        <div className={styles.container}>
          <Stack horizontal wrap tokens={stackTokens} styles={stackStyles} horizontalAlign="center" >
            <Stack {...columnProps}>
              <TextField label="Standard" />
              <TextField label="Disabled" disabled defaultValue="I am disabled" />
            </Stack>

            <Stack {...columnProps}>
              <TextField label="Read-only" readOnly defaultValue="I am read-only" />
              <TextField label="Required " required />
            </Stack>

            <Stack {...columnProps}>
              <TextField  label="Required without visible label" ariaLabel="Required without visible label" required />
              <TextField label="With error message" errorMessage="Error message" />
            </Stack>

            <Stack {...columnProps}>
              <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />
              <TextField label="With an icon" iconProps={iconProps} />
            </Stack>

            <Stack {...columnProps}>
              <TextField label="With placeholder" placeholder="Please enter text here" />
              <TextField label="Disabled with placeholder" disabled placeholder="I am disabled" />

            </Stack>
          </Stack>
        </div>
      </div>
    );
  }
}

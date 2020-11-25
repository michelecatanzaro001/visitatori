import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'VisitorManagerWebPartStrings';
import VisitorManager from './components/VisitorManager';
import { IVisitorManagerProps } from './components/IVisitorManagerProps';
import Home from './components/Home';

export interface IVisitorManagerWebPartProps {
  description: string;
}

export default class VisitorManagerWebPart extends BaseClientSideWebPart<IVisitorManagerWebPartProps> {


  

  public render(): void {

    const element: React.ReactElement<IVisitorManagerProps> = React.createElement(
      VisitorManager,
      {
        description: this.properties.description
      }
    );
    console.log ( 'VisitorManagerWebPart -> render');
    let el :  React.ReactElement =  React.createElement( Home );

    ReactDom.render(el , this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

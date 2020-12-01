import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField ,
  PropertyPaneButton,
  PropertyPaneButtonType
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'VisitorManagerWebPartStrings';
import VisitorManager from './components/template/VisitorManager';
import { IVisitorManagerProps } from './components/template/IVisitorManagerProps';
import Home from './components/home/Home';
import { ComponentServices } from './services/ComponentServices';
import { ListService } from './services/ListService';
import { Logger, LogLevel, ConsoleListener } from "@pnp/logging";
import { initializeIcons } from '@uifabric/icons';

export interface IVisitorManagerWebPartProps {
  // il valore di default sta dentro il manifest
  absoluteurl: string; 
  description: string;
}



export default class VisitorManagerWebPart extends BaseClientSideWebPart<IVisitorManagerWebPartProps> {
  
  
  protected onAfterPropertyPaneChangesApplied(): void {
    this.onInit();
  }  
 
  
  protected async onInit(): Promise<void> {
    initializeIcons();
    try {
      const serviceScope = await ComponentServices.init(this.context, this.properties, (startup, ctx, props) => {
        
        console.log ("  this.properties.absoluteUrlFieldLabel ->" +  this.properties.absoluteurl );

        // Register a new scoped instance of the service
        startup.registerScopedService(ListService.serviceKey, ListService);
        // Configure the service instance with the component specific properties
        startup.configureService(ListService.serviceKey, service => {
          service.configure(ctx.pageContext.web.absoluteUrl,  this.properties.absoluteurl );
        });
        // Must return a resolved promise 
        // (useless here but needed in case on async needs in the config process)
        return Promise.resolve();
      });
    }
    catch (error) {
      console.log('Error on init: ', error);
    }

     // optional, we are setting up the @pnp/logging for debugging
      Logger.activeLogLevel = LogLevel.Info;
      Logger.subscribe(new ConsoleListener());

    return super.onInit();
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  public render(): void {
     
    // const element: React.ReactElement<IVisitorManagerProps> = React.createElement(
    //   VisitorManager,
    //   {
    //     description: this.properties.description
    //   }
    // );
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
                PropertyPaneTextField('absoluteurl', {
                  label: strings.AbsoluteurlFieldLabel
                } ), 
                // PropertyPaneButton('savebutton',{
                //   text: 'Salva',
                //   buttonType: PropertyPaneButtonType.Primary,
                //   icon: 'Save',
                //   onClick: this.buttonSave.bind(this)
                // })  
              ]
            }
          ]
        }
      ]
    };
  }
}

import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { AadTokenProviderFactory } from "@microsoft/sp-http";
 

import { sp  } from "@pnp/sp";
import { List, IListEnsureResult, IList } from "@pnp/sp/lists";
// import "@pnp/sp/webs";
// import "@pnp/sp/lists/web";
 

export interface IRichiesteVMServices {
    configure(webUrl: string, listId: string);
    getLists(): Promise<any[]>;
}

export class RichiesteVMService {

    public static readonly serviceKey: ServiceKey<IRichiesteVMServices> = ServiceKey.create<IRichiesteVMServices>('SPFx:IRichiesteVMServices', RichiesteVMService);

    private _listId: string;
    private _webUrl: string;
    
    constructor(serviceScope: ServiceScope) {

        serviceScope.whenFinished(() => {

            const pageContext = serviceScope.consume(PageContext.serviceKey);
            const tokenProviderFactory = serviceScope.consume(AadTokenProviderFactory.serviceKey);

            // we need to "spoof" the context object with the parts we need for PnPjs
            sp.setup({
                spfxContext: {
                    aadTokenProviderFactory: tokenProviderFactory,
                    pageContext: pageContext,
                }
            });

            // This approach also works if you do not require AAD tokens
            // you don't need to do both
            // sp.setup({
            //   sp : {
            //     baseUrl : pageContext.web.absoluteUrl
            //   }
            // });
        });
    }

     /**
     * Set the configuration of the service
     * @param webUrl The URL of the SharePoint web
     * @param listId THe ID of the list to work on
     */
    public configure(webUrl: string, listId: string) {
        this._webUrl = webUrl;
        this._listId = listId;
    }    

    public getLists(): Promise<any[]> {
        return sp.web.lists();
    }

 
  
}
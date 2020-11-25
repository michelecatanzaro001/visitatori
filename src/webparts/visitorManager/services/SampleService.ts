import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { AadTokenProviderFactory } from "@microsoft/sp-http";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";

export interface ISampleService {
    getLists(): Promise<any[]>;
}

export class SampleService {

    public static readonly serviceKey: ServiceKey<ISampleService> = ServiceKey.create<ISampleService>('SPFx:SampleService', SampleService);

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
    public getLists(): Promise<any[]> {
        return sp.web.lists();
    }
}
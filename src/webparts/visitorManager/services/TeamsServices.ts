import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { MSGraphClientFactory, MSGraphClient } from '@microsoft/sp-http';

interface ITeamsServices {
    getMyDetails(): Promise<JSON>;
}

export class TeamsServices  implements ITeamsServices {
 
    //Create a ServiceKey which will be used to consume the service.
    public static readonly serviceKey: ServiceKey<ITeamsServices> =  ServiceKey.create<ITeamsServices>('my-custom-app:ICustomGraphService', TeamsServices);

    private _msGraphClientFactory: MSGraphClientFactory;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
        });
    }

    public getMyDetails(): Promise<JSON> {
        return new Promise<JSON>((resolve, reject) => {
            this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient) => {
                _msGraphClient.api('/me').get((error, user: JSON, rawResponse?: any) => {
                    resolve(user);
                });
            });
        });
    }
}
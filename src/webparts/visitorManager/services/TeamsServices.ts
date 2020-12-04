import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { MSGraphClientFactory, MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

interface ITeamsServices {
    getMyDetails(): Promise< MicrosoftGraph.User>;
    getAllUserOrg(): Promise< MicrosoftGraph.User[]>
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

    public getMyDetails(): Promise< MicrosoftGraph.User> {
        return new Promise< MicrosoftGraph.User >((resolve, reject) => {
            this._msGraphClientFactory.getClient()
            .then((_msGraphClient: MSGraphClient) => {
                _msGraphClient.api('/me')
                .get((error, user:  MicrosoftGraph.User , rawResponse?: any) => {
                    resolve(user);
                });
            });
        });
    }

    public getAllUserOrg(): Promise< MicrosoftGraph.User[]> {
        return new Promise< MicrosoftGraph.User[] >((resolve, reject) => {
            this._msGraphClientFactory.getClient()
            .then((_msGraphClient: MSGraphClient) => {
                _msGraphClient.api('/users')
                .get((error, res , rawResponse?: any) => {
                    let user:[MicrosoftGraph.User] = res.value;
                    resolve(user);
                });
            });
        });
    }


}
import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { UIRouter, UIView, useSrefActive, pushStateLocationPlugin, memoryLocationPlugin  } from "@uirouter/react";
import "office-ui-fabric-core/dist/css/fabric.css"


const overflowProps: IButtonProps = { ariaLabel: 'More commands' };

 
const _farItems: ICommandBarItemProps[] = [

    {
        key: 'info',
        text: 'Info',
        // This needs an ariaLabel since it's icon-only
        ariaLabel: 'Info',
        iconOnly: true,
        iconProps: { iconName: 'Info' },
        onClick: () => console.log('Info'),
    },
];


export const CommandBarBasicExample: React.FunctionComponent = () => {
    const activeClass = "active";
    const helloSref = useSrefActive("hello", null, activeClass);
    const aboutSref = useSrefActive("about", null, activeClass);

    
    return (
        <div>
            <CommandBar
                items={[{
                    key: 'home',
                    text: 'Home',
                    iconProps: { iconName: 'Home' },
                    onClick:  helloSref.onClick
                },{
                    key: 'about',
                    text: 'about',
                    iconProps: { iconName: 'Game' },
                    onClick:  aboutSref.onClick
                },{
                    key: 'inserisci',
                    text: 'inserisci',
                    iconProps: { iconName: 'Add' },
                    href: '/inserisci'
                },{
                    key: 'apri',
                    text: 'apri',
                    iconProps: { iconName: 'OpenFile' },
                    href: '/apri'
                }]}

                farItems={_farItems}
                ariaLabel="Use left and right arrow keys to navigate between commands"
            />
        </div>
    );
};




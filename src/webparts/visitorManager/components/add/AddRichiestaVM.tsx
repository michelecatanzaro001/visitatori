import * as React from "react";
import styles from "./AddRichiestaVM.module.scss";
import { IAddRichiestaVMProps } from "./IAddRichiestaVMProps";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  Stack,
  IStackStyles,
  IStackProps,
} from "office-ui-fabric-react/lib/Stack";
import {
  TextField,
  MaskedTextField,
} from "office-ui-fabric-react/lib/TextField";

import { ComboBox, IComboBoxOption, IComboBox, SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/index';

import { IAddRichiestaVMState } from "./IAddRichiestaVMState";
import {
  PrimaryButton,
  DefaultButton,
} from "office-ui-fabric-react/lib/Button";
import { useFormik, useFormikContext } from "formik";

import { ComponentServices } from '../../services/ComponentServices';
import { ServiceScope } from "@microsoft/sp-core-library";
import { TeamsServices } from "../../services/TeamsServices";
 

const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 10 },
  styles: { root: { width: 300 } },
};
const iconProps = { iconName: "Calendar" };

const stackTokens = { childrenGap: 20, padding: "10x 10px 10px 10px" };

const stackStyles: Partial<IStackStyles> = {
  root: { width: "100%", padding: "15x 0px 15px 0px" },
};



/**** IComboBoxOption BOX ****/ 
 

async function fetchNewTextC(a, b) {
  await new Promise((r) => setTimeout(r, 500));
  return `textA: ${a}, textB: ${b}`;
}

const items: IComboBoxOption[] = [
  { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'E', text: 'Option E' },
  { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' },
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' },
];

const comboBoxStyle = { maxWidth: 300 };
/**** IComboBoxOption END BOX ****/ 

export const AddRichiestaVM: React.FunctionComponent = (
  propCost: IAddRichiestaVMProps
) => {

/************
 *  VALIDATE  *
 *************/
 

  const validate = (values) => {
    const errors = {};
    if (!values.nome || (""+values.nome).trim() .length == 0 ) {
      values.nome ='';
      errors["nome"] = "obbligatorio";
    }  
  
    if (!values.cognome || (""+values.cognome).trim() .length == 0 ) {
      values.cognome ='';
      errors["cognome"] = "obbligatorio";
    }  

    if (!values.ditta || (""+values.ditta).trim() .length == 0 ) {
      values.ditta ='';
      errors["ditta"] = "obbligatorio";
    } 

    // if (!values.lastName) {
    //   errors.cognome = "Required";
    // } else if (values.lastName.length > 20) {
    //   errors.cognome = "Must be 20 characters or less";
    // }

    // if (!values.email) {
    //   errors.email = "Required";
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = "Invalid email address";
    // }

    return errors;
  };

  const formik = useFormik({ 
    initialValues: {
      nome: "",
      cognome: '',
      ditta: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(" onSubmit ");
      alert(JSON.stringify(values, null, 2));
    },
  });

// Similar to componentDidMount and componentDidUpdate:
 
const [selectedKey, setSelectedKey] = React.useState<string | number | undefined>(undefined);
/***
 * 
 * 
 */
const [count, setCount] = React.useState(0);  

const ts  = ComponentServices.serviceScope.consume( TeamsServices.serviceKey );  

async function fetchNewTextC(a, b) {
  
  await new Promise((r) => setTimeout(r, 500));
  return `textA: ${a}, textB: ${b}`;
}

/**
 *   INIZIALIZZA LISTE 
 */
 React.useEffect(() => {
  console.log ( "calll  useEffect ")
   // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
   if ( count==0 )  {
      console.log ( "valori presenti ")
    //  formik.setFieldValue( "name" , "textC"); 
      setCount(1); 
      ts.getMyDetails().then((res) => {
        formik.setFieldValue( "nome" ,  res["displayName"] );     
      })
  };
    
 },[ count ] );

  const onChange = React.useCallback(
    (ev: React.FormEvent<IComboBox>, option?: IComboBoxOption): void => {
      console.log( "onChange"  );
      if( option  ) {
        console.log( option.key  );
        setSelectedKey(option.key);
      } else {
        setSelectedKey( undefined );
      }
    },
    [setSelectedKey],
  );
   


  return (
    <div className={styles.AddRichiestaVM}>
      <div className={styles.container}>
        <Stack
          horizontal
          wrap
          tokens={stackTokens}
          styles={stackStyles}
          horizontalAlign="center"
        >
          <Stack {...columnProps}>
            <TextField
              label="Nome"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nome}
              required
              placeholder="Inserisci"
              errorMessage={
                formik.touched.nome && formik.errors.nome
                  ? "" + formik.errors.nome
                  : ""
              }
              name="nome"
              id="nome"
            />

            <TextField
              label="Dipentente da incontrare"
              required
              placeholder="Inserisci"
              name="dipententeDaIncontrare"
              id="dipententeDaIncontrare"
            />

          <ComboBox
                style={comboBoxStyle}
                selectedKey={selectedKey}
                label="Controlled single-select ComboBox (allowFreeform: T)"
                allowFreeform
                autoComplete="on"
                options={items}
                onChange={onChange}
              />

          </Stack>

          <Stack {...columnProps}>
            <TextField
              label="Cognome"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cognome}
              placeholder="Inserisci"
              errorMessage={
                formik.touched.cognome && formik.errors.cognome
                  ? "" + formik.errors.cognome
                  : ""
              }
              name="cognome"
              id="cognome"
            />

            <TextField
              label="Ditta"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ditta}
              placeholder="Inserisci"
              errorMessage={
                formik.touched.ditta && formik.errors.ditta
                  ? "" + formik.errors.ditta
                  : ""
              }
              name="ditta"
              id="ditta"
            />
          </Stack>
        </Stack>

        <Stack
          horizontal
          tokens={stackTokens}
          styles={stackStyles}
          horizontalAlign="center"
        >
          <DefaultButton text="Annulla" allowDisabledFocus />
          <PrimaryButton
            text="Invia"
            allowDisabledFocus
            onClick={formik.submitForm}
          />
        </Stack>
      </div>
    </div>
  );
};

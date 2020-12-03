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
import { IAddRichiestaVMState } from "./IAddRichiestaVMState";
import {
  PrimaryButton,
  DefaultButton,
} from "office-ui-fabric-react/lib/Button";
import { useFormik, useFormikContext } from "formik";
 
 
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 10 },
  styles: { root: { width: 300 } },
};
const iconProps = { iconName: "Calendar" };

const stackTokens = { childrenGap: 20, padding: "10x 10px 10px 10px" };

const stackStyles: Partial<IStackStyles> = { root: { width: "100%" , padding: "15x 0px 15px 0px" }  };

 

export const AddRichiestaVM: React.FunctionComponent = (
  propCost: IAddRichiestaVMProps
) => {
  const validate = (values) => {
    const errors = {};
    if (!values.nome) {
      errors["nome"] = "Required";
    } else if (values.nome.length > 15) {
      errors["nome"] = "Must be 15 characters or less";
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
      cognome: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(" onSubmit ");
      alert(JSON.stringify(values, null, 2));
    },
  });

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
                label="Cognome"
                required
                placeholder="Inserisci"
                errorMessage={
                  formik.touched.cognome && formik.errors.cognome
                    ? "" + formik.errors.cognome
                    : ""
                }
                name="cognome"
                id="cognome"
              />
            </Stack>

            <Stack {...columnProps}>
              <TextField label="Nome ditta" required placeholder="Inserisci" />
              <TextField
                label="Dipentente da incontrare"
                required
                placeholder="Inserisci"
                value={"" + formik.isValidating}
              />
            </Stack>


          </Stack>

          <Stack horizontal  
            tokens={stackTokens}
            styles={stackStyles}
            horizontalAlign="center"  >
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

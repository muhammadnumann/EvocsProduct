import type {
  EditRequiredOAuthById,
  UpdateRequiredOAuthInput,
} from 'types/graphql';

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

type FormRequiredOAuth = NonNullable<EditRequiredOAuthById['requiredOAuth']>;

interface RequiredOAuthFormProps {
  requiredOAuth?: EditRequiredOAuthById['requiredOAuth'];
  onSave: (
    data: UpdateRequiredOAuthInput,
    id?: FormRequiredOAuth['id']
  ) => void;
  error: RWGqlError;
  loading: boolean;
}

const RequiredOAuthForm = (props: RequiredOAuthFormProps) => {
  const onSubmit = (data: FormRequiredOAuth) => {
    props.onSave(data, props?.requiredOAuth?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormRequiredOAuth> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="customerProductID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Customer product id
        </Label>

        <NumberField
          name="customerProductID"
          defaultValue={props.requiredOAuth?.customerProductID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="customerProductID" className="rw-field-error" />

        <Label
          name="google"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Google
        </Label>

        <CheckboxField
          name="google"
          defaultChecked={props.requiredOAuth?.google}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="google" className="rw-field-error" />

        <Label
          name="azureAD"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Azure ad
        </Label>

        <CheckboxField
          name="azureAD"
          defaultChecked={props.requiredOAuth?.azureAD}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="azureAD" className="rw-field-error" />

        <Label
          name="adFS"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ad fs
        </Label>

        <CheckboxField
          name="adFS"
          defaultChecked={props.requiredOAuth?.adFS}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="adFS" className="rw-field-error" />

        <Label
          name="ping"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ping
        </Label>

        <CheckboxField
          name="ping"
          defaultChecked={props.requiredOAuth?.ping}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="ping" className="rw-field-error" />

        <Label
          name="adLDAP"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ad ldap
        </Label>

        <CheckboxField
          name="adLDAP"
          defaultChecked={props.requiredOAuth?.adLDAP}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="adLDAP" className="rw-field-error" />

        <Label
          name="adLDAP"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Zoom
        </Label>

        <CheckboxField
          name="zoom"
          defaultChecked={props.requiredOAuth?.zoom}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="zoom" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default RequiredOAuthForm;

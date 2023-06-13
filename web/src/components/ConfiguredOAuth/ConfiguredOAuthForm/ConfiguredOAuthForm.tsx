import type {
  EditConfiguredOAuthById,
  UpdateConfiguredOAuthInput,
} from 'types/graphql';

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  DatetimeLocalField,
  RadioField,
  Submit,
} from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '');
  }
};

type FormConfiguredOAuth = NonNullable<
  EditConfiguredOAuthById['configuredOAuth']
>;

interface ConfiguredOAuthFormProps {
  configuredOAuth?: EditConfiguredOAuthById['configuredOAuth'];
  onSave: (
    data: UpdateConfiguredOAuthInput,
    id?: FormConfiguredOAuth['id']
  ) => void;
  error: RWGqlError;
  loading: boolean;
}

const ConfiguredOAuthForm = (props: ConfiguredOAuthFormProps) => {
  const onSubmit = (data: FormConfiguredOAuth) => {
    props.onSave(data, props?.configuredOAuth?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormConfiguredOAuth> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="userID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userID"
          defaultValue={props.configuredOAuth?.userID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userID" className="rw-field-error" />

        <Label
          name="customerProductID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Customer product id
        </Label>

        <NumberField
          name="customerProductID"
          defaultValue={props.configuredOAuth?.customerProductID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="customerProductID" className="rw-field-error" />

        <Label
          name="accessToken"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Access token
        </Label>

        <TextField
          name="accessToken"
          defaultValue={props.configuredOAuth?.accessToken}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="accessToken" className="rw-field-error" />

        <Label
          name="refreshToken"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Refresh token
        </Label>

        <TextField
          name="refreshToken"
          defaultValue={props.configuredOAuth?.refreshToken}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="refreshToken" className="rw-field-error" />

        <Label
          name="expiryDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Expiry date
        </Label>

        <DatetimeLocalField
          name="expiryDate"
          defaultValue={formatDatetime(props.configuredOAuth?.expiryDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="expiryDate" className="rw-field-error" />

        <Label
          name="provider"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Provider
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="configuredOAuth-provider-0"
            name="provider"
            defaultValue="GOOGLE_WORKSPACE"
            defaultChecked={props.configuredOAuth?.provider?.includes(
              'GOOGLE_WORKSPACE'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Google Workspace</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="configuredOAuth-provider-1"
            name="provider"
            defaultValue="AZURE_AD"
            defaultChecked={props.configuredOAuth?.provider?.includes(
              'AZURE_AD'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Azure Ad</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="configuredOAuth-provider-2"
            name="provider"
            defaultValue="ZOOM"
            defaultChecked={props.configuredOAuth?.provider?.includes('ZOOM')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Zoom</div>
        </div>

        <FieldError name="provider" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default ConfiguredOAuthForm;

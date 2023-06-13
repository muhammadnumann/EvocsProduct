import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  Submit,
} from '@redwoodjs/forms';

const CustomerForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.customer?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="auth0ID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Auth0 id
        </Label>

        <TextField
          name="auth0ID"
          defaultValue={props.customer?.auth0ID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="auth0ID" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.customer?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="displayName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Display name
        </Label>

        <TextField
          name="displayName"
          defaultValue={props.customer?.displayName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="displayName" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="customer-status-0"
            name="status"
            defaultValue="PENDING"
            defaultChecked={props.customer?.status?.includes('PENDING')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Pending</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="customer-status-1"
            name="status"
            defaultValue="ACTIVE"
            defaultChecked={props.customer?.status?.includes('ACTIVE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Active</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="customer-status-2"
            name="status"
            defaultValue="DISABLED"
            defaultChecked={props.customer?.status?.includes('DISABLED')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Disabled</div>
        </div>

        <FieldError name="status" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default CustomerForm;

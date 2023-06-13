import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  RadioField,
  Submit,
} from '@redwoodjs/forms';

const UserForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.user?.id);
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
          defaultValue={props.user?.auth0ID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="auth0ID" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="customerID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Customer id
        </Label>

        <NumberField
          name="customerID"
          defaultValue={props.user?.customerID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="customerID" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="user-status-0"
            name="status"
            defaultValue="PENDING"
            defaultChecked={props.user?.status?.includes('PENDING')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Pending</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="user-status-1"
            name="status"
            defaultValue="ACTIVE"
            defaultChecked={props.user?.status?.includes('ACTIVE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Active</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="user-status-2"
            name="status"
            defaultValue="DISABLED"
            defaultChecked={props.user?.status?.includes('DISABLED')}
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

export default UserForm;

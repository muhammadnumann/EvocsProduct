import {
  Form,
  FormError,
  FieldError,
  Label,
  RadioField,
  NumberField,
  TextAreaField,
  TextField,
  Submit,
} from '@redwoodjs/forms';

const JobForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.job?.id);
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
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="job-status-0"
            name="status"
            defaultValue="PENDING"
            defaultChecked={props.job?.status?.includes('PENDING')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Pending</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="job-status-1"
            name="status"
            defaultValue="ACTIVE"
            defaultChecked={props.job?.status?.includes('ACTIVE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Active</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="job-status-2"
            name="status"
            defaultValue="DONE"
            defaultChecked={props.job?.status?.includes('DONE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Done</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="job-status-3"
            name="status"
            defaultValue="FAILED"
            defaultChecked={props.job?.status?.includes('FAILED')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Failed</div>
        </div>

        <FieldError name="status" className="rw-field-error" />

        <Label
          name="initiatingUserID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Initiating user id
        </Label>

        <NumberField
          name="initiatingUserID"
          defaultValue={props.job?.initiatingUserID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="initiatingUserID" className="rw-field-error" />

        <Label
          name="productID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Product id
        </Label>

        <NumberField
          name="productID"
          defaultValue={props.job?.productID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="productID" className="rw-field-error" />

        <Label
          name="resultBlob"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Result blob
        </Label>

        <TextAreaField
          name="resultBlob"
          defaultValue={JSON.stringify(props.job?.resultBlob)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="resultBlob" className="rw-field-error" />

        <Label
          name="resultURL"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Result url
        </Label>

        <TextField
          name="resultURL"
          defaultValue={props.job?.resultURL}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="resultURL" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default JobForm;

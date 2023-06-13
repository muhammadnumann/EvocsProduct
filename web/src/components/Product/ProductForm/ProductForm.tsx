import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
  TextAreaField,
} from '@redwoodjs/forms';

const ProductForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.product?.id);
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
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.product?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.product?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="config"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Config
        </Label>

        <TextAreaField
          name="config"
          defaultValue={JSON.stringify(props.product?.config)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true, valueAsJSON: true }}
          style={{ resize: 'vertical' }}
        />

        <FieldError name="config" className="rw-field-error" />

        <Label
          name="published"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Published
        </Label>

        <CheckboxField
          name="published"
          defaultChecked={props.product?.published}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="published" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;

import type {
  EditRequisitionById,
  UpdateRequisitionInput,
} from 'types/graphql';

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

type FormRequisition = NonNullable<EditRequisitionById['requisition']>;

interface RequisitionFormProps {
  requisition?: EditRequisitionById['requisition'];
  onSave: (data: UpdateRequisitionInput, id?: FormRequisition['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const RequisitionForm = (props: RequisitionFormProps) => {
  const onSubmit = (data: FormRequisition) => {
    props.onSave(data, props?.requisition?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormRequisition> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="owningCustomerID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Owning customer id
        </Label>

        <NumberField
          name="owningCustomerID"
          defaultValue={props.requisition?.owningCustomerID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="owningCustomerID" className="rw-field-error" />

        <Label
          name="owningUserID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Owning user id
        </Label>

        <NumberField
          name="owningUserID"
          defaultValue={props.requisition?.owningUserID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="owningUserID" className="rw-field-error" />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.requisition?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="summary"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Summary
        </Label>

        <TextField
          name="summary"
          defaultValue={props.requisition?.summary}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="summary" className="rw-field-error" />

        <Label
          name="requisitionID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Wd requisition id
        </Label>

        <NumberField
          name="requisitionID"
          defaultValue={props.requisition?.wdRequisitionID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="requisitionID" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <TextField
          name="status"
          defaultValue={props.requisition?.status}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

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

export default RequisitionForm;

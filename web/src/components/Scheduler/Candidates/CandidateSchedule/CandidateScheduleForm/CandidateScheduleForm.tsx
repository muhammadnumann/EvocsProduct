import type { UpdateCandidateScheduleInput } from 'types/graphql';

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

type FormCandidateSchedule = NonNullable<UpdateCandidateScheduleInput>;

interface CandidateScheduleFormProps {
  onSave: (data: UpdateCandidateScheduleInput) => void;
  error: RWGqlError;
  loading: boolean;
}

const CandidateScheduleForm = (props: CandidateScheduleFormProps) => {
  const onSubmit = (data: FormCandidateSchedule) => {
    props.onSave(data);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormCandidateSchedule> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="candidateID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Candidate id
        </Label>

        <NumberField
          name="candidateID"
          defaultValue=""
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="candidateID" className="rw-field-error" />

        <Label
          name="requisitionID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Requisition id
        </Label>

        <NumberField
          name="requisitionID"
          defaultValue=""
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="requisitionID" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default CandidateScheduleForm;

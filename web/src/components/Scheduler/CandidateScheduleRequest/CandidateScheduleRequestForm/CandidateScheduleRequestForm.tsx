import type { NewCandidateScheduleRequestQuery } from 'types/graphql';

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  DatetimeLocalField,
  Submit,
  CheckboxField,
} from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

import { NewCandidateScheduleRequestOnSave } from '../NewCandidateScheduleRequest';

type FormCandidateScheduleRequest =
  NonNullable<NewCandidateScheduleRequestOnSave>;
interface CandidateScheduleRequestFormProps {
  candidate: NewCandidateScheduleRequestQuery['candidateRequisition']['Candidate'];
  candidateSchedule: NewCandidateScheduleRequestQuery['candidateSchedule'];
  onSave: (data: NewCandidateScheduleRequestOnSave) => void;
  error: RWGqlError;
  loading: boolean;
}

const CandidateScheduleRequestForm = (
  props: CandidateScheduleRequestFormProps
) => {
  const onSubmit = (data: FormCandidateScheduleRequest) => {
    props.onSave(data);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormCandidateScheduleRequest>
        onSubmit={onSubmit}
        error={props.error}
      >
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
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="candidateID" className="rw-field-error" />

        <Label
          name="initiatingUserID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Initiating user id
        </Label>

        <NumberField
          name="initiatingUserID"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="initiatingUserID" className="rw-field-error" />

        <Label
          name="candidateScheduleID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Candidate schedule id
        </Label>

        <NumberField
          name="candidateScheduleID"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="candidateScheduleID" className="rw-field-error" />

        <Label
          name="emailSentFromName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email sent from name
        </Label>

        <TextField
          name="emailSentFromName"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="emailSentFromName" className="rw-field-error" />

        <Label
          name="emailSentFromAddressAlias"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email sent from address alias
        </Label>

        <TextField
          name="emailSentFromAddressAlias"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError
          name="emailSentFromAddressAlias"
          className="rw-field-error"
        />

        <Label
          name="emailSubject"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email subject
        </Label>

        <TextField
          name="emailSubject"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="emailSubject" className="rw-field-error" />

        <Label
          name="emailBody"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email body
        </Label>

        <TextField
          name="emailBody"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="emailBody" className="rw-field-error" />

        <Label
          name="emailServiceMessageID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email service message id
        </Label>

        <TextField
          name="emailServiceMessageID"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="emailServiceMessageID" className="rw-field-error" />

        <Label
          name="linkClickedAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Link clicked at
        </Label>

        <DatetimeLocalField
          name="linkClickedAt"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="linkClickedAt" className="rw-field-error" />

        <Label
          name="requestCandidateAvailability"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Send Availability Request to Candidate?
        </Label>

        <CheckboxField
          name="requestCandidateAvailability"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError
          name="requestCandidateAvailability"
          className="rw-field-error"
        />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default CandidateScheduleRequestForm;

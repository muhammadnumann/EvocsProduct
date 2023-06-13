import type { EditCandidateById, UpdateCandidateInput } from 'types/graphql';

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

type FormCandidate = NonNullable<EditCandidateById['candidate']>;

interface CandidateFormProps {
  candidate?: EditCandidateById['candidate'];
  onSave: (data: UpdateCandidateInput, id?: FormCandidate['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const CandidateForm = (props: CandidateFormProps) => {
  const onSubmit = (data: FormCandidate) => {
    props.onSave(data, props?.candidate?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormCandidate> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="firstName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          First name
        </Label>

        <TextField
          name="firstName"
          defaultValue={props.candidate?.firstName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="firstName" className="rw-field-error" />

        <Label
          name="lastName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Last name
        </Label>

        <TextField
          name="lastName"
          defaultValue={props.candidate?.lastName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="lastName" className="rw-field-error" />

        <Label
          name="preferredName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Preferred name
        </Label>

        <TextField
          name="preferredName"
          defaultValue={props.candidate?.preferredName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="preferredName" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.candidate?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="homePhone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Home phone
        </Label>

        <TextField
          name="homePhone"
          defaultValue={props.candidate?.homePhone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="homePhone" className="rw-field-error" />

        <Label
          name="mobilePhone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Mobile phone
        </Label>

        <TextField
          name="mobilePhone"
          defaultValue={props.candidate?.mobilePhone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="mobilePhone" className="rw-field-error" />

        <Label
          name="about"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          About
        </Label>

        <TextField
          name="about"
          defaultValue={props.candidate?.about}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="about" className="rw-field-error" />

        <Label
          name="wdCandidateID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Wd candidate id
        </Label>

        <TextField
          name="wdCandidateID"
          defaultValue={props.candidate?.wdCandidateID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="wdCandidateID" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default CandidateForm;

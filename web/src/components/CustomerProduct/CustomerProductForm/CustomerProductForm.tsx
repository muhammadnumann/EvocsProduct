import { FC, useEffect, useState } from 'react';

import { EditCustomerProductById } from 'types/graphql';

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
  TextAreaField,
  SelectField,
  useForm,
} from '@redwoodjs/forms';
import { CellSuccessProps } from '@redwoodjs/web';

type CustomerProductFormProps = Partial<
  Pick<
    CellSuccessProps<EditCustomerProductById>,
    'products' | 'customerProduct'
  >
> & {
  onSave: any;
  error: any;
  loading: any;
};
const CustomerProductForm: FC<CustomerProductFormProps> = ({
  products,
  ...props
}) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.customerProduct?.id);
  };

  const formMethods = useForm();
  const { setValue } = formMethods;

  const [selectedProduct, setSelectedProduct] = useState(
    props.customerProduct?.productID || 0
  );
  const [configEnabled, setConfigEnabled] = useState(false);
  const [displayConfig, setDisplayConfig] = useState(null);

  useEffect(() => {
    if (selectedProduct !== 0) {
      setConfigEnabled(true);

      const { config } = products.find((p) => p.id === selectedProduct);
      setDisplayConfig(JSON.stringify(config));
      setValue('config', displayConfig);
      return;
    }

    setConfigEnabled(false);
    setDisplayConfig(null);
    setValue('config', 'Select a product');
  }, [selectedProduct, displayConfig, products, setValue]);

  return (
    <div className="rw-form-wrapper">
      <Form formMethods={formMethods} onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="productID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Product id
        </Label>

        <SelectField
          name="productID"
          defaultValue={props.customerProduct?.productID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          onChange={(event) => setSelectedProduct(Number(event.target.value))}
          validation={{
            required: true,
            valueAsNumber: true,
            validate: {
              matchesInitialValue: (value) => {
                return value !== 0;
              },
            },
          }}
        >
          <option value={0}>Select product</option>
          {products.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </SelectField>

        <FieldError name="productID" className="rw-field-error" />

        <Label
          name="customerID"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Customer id
        </Label>

        <NumberField
          name="customerID"
          defaultValue={props.customerProduct?.customerID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="customerID" className="rw-field-error" />

        <Label
          name="config"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Config
        </Label>

        <TextAreaField
          name="config"
          defaultValue="Please select a product"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true, valueAsJSON: true }}
          disabled={!configEnabled}
          style={{ resize: 'vertical' }}
        />

        <FieldError name="config" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default CustomerProductForm;

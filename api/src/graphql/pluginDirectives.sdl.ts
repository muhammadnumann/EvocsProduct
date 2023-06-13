export const schema = gql`
  """
  @oneOf provides validation for input types and implements the concept of union inputs
  https://the-guild.dev/graphql/envelop/plugins/use-extended-validation#union-inputs-oneof
  """
  directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
`;

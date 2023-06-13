import EditConfiguredOAuthCell from 'src/components/ConfiguredOAuth/EditConfiguredOAuthCell';

type ConfiguredOAuthPageProps = {
  id: number;
};

const EditConfiguredOAuthPage = ({ id }: ConfiguredOAuthPageProps) => {
  return <EditConfiguredOAuthCell id={id} />;
};

export default EditConfiguredOAuthPage;

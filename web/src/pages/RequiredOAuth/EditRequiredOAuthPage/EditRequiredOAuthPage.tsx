import EditRequiredOAuthCell from 'src/components/RequiredOAuth/EditRequiredOAuthCell';

type RequiredOAuthPageProps = {
  id: number;
};

const EditRequiredOAuthPage = ({ id }: RequiredOAuthPageProps) => {
  return <EditRequiredOAuthCell id={id} />;
};

export default EditRequiredOAuthPage;

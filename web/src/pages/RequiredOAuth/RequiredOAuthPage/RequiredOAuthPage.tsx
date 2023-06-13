import RequiredOAuthCell from 'src/components/RequiredOAuth/RequiredOAuthCell';

type RequiredOAuthPageProps = {
  id: number;
};

const RequiredOAuthPage = ({ id }: RequiredOAuthPageProps) => {
  return <RequiredOAuthCell id={id} />;
};

export default RequiredOAuthPage;
